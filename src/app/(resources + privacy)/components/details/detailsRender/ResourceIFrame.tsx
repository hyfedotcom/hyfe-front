"use client";

import Iframe from "@/components/ui/video/Iframe";

type PageProps = {
  url?: string | undefined;
  title: string | undefined;
  description: string | undefined;
};

export function ResourceIFrame({ block }: { block: PageProps }) {
  const { url, title, description } = block;
  return (
    <div className="space-y-10 mb-15">
      <div className="space-y-5">
        {title && <h2>{title}</h2>}
        {description && <p className="body-small">{description}</p>}
      </div>
      {url ? <Iframe url={url} /> : null}
    </div>
  );
}
