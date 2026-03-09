import { ResourceTag } from "@/features/resources/client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function Tags({ tags }: { tags: string[] }) {
    const router = useRouter()
    const path = usePathname()
    const searchParams = useSearchParams()
    const tagsParams = searchParams.getAll("tag") ?? []


    const onChangeTag = (tag: string) => {
        const params = new URLSearchParams(searchParams.toString())
        const currentTags = params.getAll("tag")

        const nextTags = currentTags.includes(tag) ? currentTags.filter(t => t !== tag) : [...currentTags, tag]

        params.delete("tag")

        nextTags.forEach(t => { params.append("tag", t) })

        const query = params.toString()
        const nextUrl = query ? `${path}?${query}` : path

        router.replace(nextUrl, { scroll: true })
    }

    return <div className="flex gap-3">
        {tags.map((t, i) => <ResourceTag key={`${t}-${i}`} active={tagsParams.includes(t)} glass tag={t} onClick={() => onChangeTag(t)} />)}
    </div>
}
