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
      <iframe
        src={url!}
        title="Video"
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        className="w-full aspect-video rounded-2xl"
      />
    </div>
  );
}
