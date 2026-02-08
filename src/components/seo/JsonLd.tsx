import type { ReactElement } from "react";

export function JsonLd({
  data,
  id,
}: {
  data: Record<string, unknown> | Array<Record<string, unknown>>;
  id?: string;
}): ReactElement {
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  );
}
