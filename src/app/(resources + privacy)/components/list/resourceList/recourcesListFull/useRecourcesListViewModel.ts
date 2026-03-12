"use client";

import type { ResourceCardType } from "@/features/resources/data/resources.types";
import {
  getResourceListStateFromSearchParams,
  hasResourceListStateInSearchParams,
  readResourceListUrlState,
  saveResourceListUrlState,
  subscribeResourceListUrlState,
} from "@/features/resources/utils/resourceListUrlState";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

import type { ResourceListRenderMode } from "./types";

// Сколько карточек показываем на страницу
const PAGE_SIZE = 20;

// Нормализация page:
// - undefined -> undefined
// - мусор / меньше 1 -> 1
// - дробное -> округляем вниз
function parsePageParam(value: number | undefined): number | undefined {
  if (value === undefined) return undefined;

  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < 1) return 1;

  return Math.floor(parsed);
}

// Нормализация текста для поиска:
// - lowerCase
// - множественные пробелы -> один
// - дефисы тоже считаем пробелами
// - обрезаем края
function normalizeText(value: string): string {
  return value
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/-/g, " ")
    .trim();
}

type UseRecourcesListViewModelArgs = {
  data: ResourceCardType[];
  tags: string[];
  type: string;
  initialPage: number;
  renderMode: ResourceListRenderMode;
};

export function useRecourcesListViewModel({
  data,
  tags,
  type,
  initialPage,
  renderMode,
}: UseRecourcesListViewModelArgs) {
  
  const searchParams = useSearchParams();
  const router = useRouter();
  const paramsString = searchParams.toString();

  // Локальный триггер для перечитывания storage-состояния
  // когда прилетает событие из subscribeResourceListUrlState
  const [storageVersion, setStorageVersion] = useState(0);

  // Есть ли вообще в URL состояние списка:
  // search / tags / page и т.д.
  const hasListStateInUrl = useMemo(
    () => hasResourceListStateInSearchParams(searchParams),
    [searchParams],
  );

  // Читаем состояние списка из URL
  const listStateFromUrl = useMemo(
    () => getResourceListStateFromSearchParams(searchParams),
    [searchParams],
  );

  // Читаем состояние списка из storage,
  // но только в режиме detail-sheet
  // и только если в URL нет явного состояния
  const listStateFromStorage = useMemo(() => {
    void storageVersion; // зависимость нужна для повторного вычисления

    if (renderMode !== "detail-sheet") return null;
    if (hasListStateInUrl) return null;

    return readResourceListUrlState(type);
  }, [hasListStateInUrl, renderMode, storageVersion, type]);

  // Приоритет:
  // 1. storage (если сработал detail-sheet сценарий)
  // 2. иначе URL
  const listState = listStateFromStorage ?? listStateFromUrl;

  // Убираем дубли, trim, пустые теги
  const uniqueTags = useMemo(
    () => Array.from(new Set(tags.map((tag) => tag.trim()).filter(Boolean))),
    [tags],
  );

  // Set для быстрой проверки allowed tag
  const allowedTags = useMemo(() => new Set(uniqueTags), [uniqueTags]);

  // Поисковая строка из состояния списка
  const search = listState.search;

  // Оставляем только те activeTags, которые реально существуют в allowedTags
  // защита от мусора в URL / storage
  const activeTags = useMemo(
    () => listState.tags.filter((tag) => allowedTags.has(tag)),
    [allowedTags, listState.tags],
  );

  // Нормализованное состояние, которое дальше можно сохранять
  const normalizedListState = useMemo(
    () => ({
      search,
      tags: activeTags,
      page: listState.page,
    }),
    [activeTags, listState.page, search],
  );

  // В режиме full сохраняем текущее состояние списка в storage
  // чтобы потом detail-sheet мог его восстановить
  useEffect(() => {
    if (renderMode !== "full") return;
    saveResourceListUrlState(type, normalizedListState);
  }, [normalizedListState, renderMode, type]);

  // В режиме detail-sheet подписываемся на изменения storage
  // если обновился state именно для этого type -> форсим reread через storageVersion
  useEffect(() => {
    if (renderMode !== "detail-sheet") return;

    return subscribeResourceListUrlState((detail) => {
      if (detail.type !== type) return;
      setStorageVersion((prev) => prev + 1);
    });
  }, [renderMode, type]);

  // Явно запомнить текущее состояние списка
  // например перед переходом в detail
  const rememberCurrentListState = useCallback(() => {
    saveResourceListUrlState(type, normalizedListState);
  }, [normalizedListState, type]);

  // Есть ли текстовый поиск
  const hasSearch = search.length > 0;

  // Есть ли вообще фильтры:
  // либо теги, либо search
  const hasFilters = activeTags.length > 0 || hasSearch;

  // Set для быстрых includes по тегам
  const activeTagsSet = useMemo(() => new Set(activeTags), [activeTags]);

  // Разбиваем search на токены:
  // "design system" -> ["design", "system"]
  const searchTokens = useMemo(() => {
    if (!hasSearch) return [];
    return normalizeText(search).split(" ").filter(Boolean);
  }, [hasSearch, search]);

  // Фильтрация списка:
  // 1. сначала по тегам
  // 2. потом по title через searchTokens
  const filteredList = useMemo(() => {
    let nextList = data;

    // Если есть активные теги —
    // оставляем карточки, у которых есть хотя бы один совпадающий тег
    if (activeTagsSet.size > 0) {
      nextList = nextList.filter((card) =>
        (card.tags ?? []).some((cardTag) => activeTagsSet.has(cardTag.tag)),
      );
    }

    // Если поиска нет или список уже пуст —
    // сразу возвращаем текущий результат
    if (searchTokens.length === 0 || nextList.length === 0) {
      return nextList;
    }

    // Поиск только по title:
    // каждая search token должна входить в title
    return nextList.filter((card) => {
      const normalizedTitle = normalizeText(card.title);
      return searchTokens.every((token) => normalizedTitle.includes(token));
    });
  }, [activeTagsSet, data, searchTokens]);

  // Страхуем initialPage:
  // минимум 1, целое число
  const safeInitialPage = Number.isFinite(initialPage)
    ? Math.max(1, Math.floor(initialPage))
    : 1;

  // page из состояния URL/storage
  const pageFromState = parsePageParam(listState.page);

  // Берём page из состояния, если он есть, иначе initialPage
  const currentPage = pageFromState ?? safeInitialPage;

  // Общее количество карточек после фильтрации
  const total = filteredList.length;

  // Максимальная страница
  const maxPage = Math.max(1, Math.ceil(total / PAGE_SIZE));

  // Если есть фильтры — всегда показываем с первой страницы
  // пагинация по сути отключается
  const activePage = hasFilters ? 1 : Math.min(currentPage, maxPage);

  // Сколько карточек реально показать:
  // - с фильтрами показываем все найденные
  // - без фильтров до activePage * PAGE_SIZE
  const shown = hasFilters ? total : Math.min(activePage * PAGE_SIZE, total);

  // Видимый список — просто срез от начала
  const visibleList = filteredList.slice(0, shown);

  // Наличие следующей страницы только без фильтров
  const hasNextPage = !hasFilters && activePage < maxPage;

  // Номер следующей страницы
  const nextPage = activePage + 1;

  // Генерация href для пагинации
  const pageHref = useCallback(
    (page: number) => {
      const params = new URLSearchParams(paramsString);

      // page сначала чистим, потом ставим заново
      params.delete("page");

      // page=1 не пишем в URL, чтобы адрес был чище
      if (page > 1) {
        params.set("page", String(page));
      }

      const query = params.toString();
      return query ? `/${type}?${query}` : `/${type}`;
    },
    [paramsString, type],
  );

  // Ссылка на detail страницу карточки
  const detailHref = useCallback(
    (slug: string) => {
      return `/${type}/${slug}`;
    },
    [type],
  );

  // Полная очистка фильтров:
  // 1. чистим storage
  // 2. чистим search/tag/page из URL
  // 3. если state реально был в URL — делаем router.replace без скролла
  const clearAllFiltersInUrl = useCallback(() => {
    saveResourceListUrlState(type, {
      search: "",
      tags: [],
      page: undefined,
    });

    const params = new URLSearchParams(paramsString);

    params.delete("search");
    params.delete("tag");
    params.delete("page");

    const query = params.toString();
    const nextUrl = query ? `/${type}?${query}` : `/${type}`;
    const currentUrl = paramsString ? `/${type}?${paramsString}` : `/${type}`;

    if (hasListStateInUrl && nextUrl !== currentUrl) {
      router.replace(nextUrl, { scroll: false });
    }
  }, [hasListStateInUrl, paramsString, router, type]);

  // Наружу отдаём уже готовую "view model"
  // UI-компонент просто берёт и рендерит
  return {
    activePage,
    activeTags,
    clearAllFiltersInUrl,
    detailHref,
    hasFilters,
    hasNextPage,
    nextPage,
    pageHref,
    pageSize: PAGE_SIZE,
    rememberCurrentListState,
    shown,
    total,
    uniqueTags,
    visibleList,
  };
}