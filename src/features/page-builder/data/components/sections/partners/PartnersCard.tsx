import Image from "next/image";

export function PartnersCard({
  partner,
}: {
  partner: { url: string; width: number; height: number; alt?: string };
}) {
  return (
    <div>
      <Image
        width={partner.width}
        height={partner.height}
        alt={partner.alt ?? "logo of partner"}
        src={partner.url}
      ></Image>
    </div>
  );
}
