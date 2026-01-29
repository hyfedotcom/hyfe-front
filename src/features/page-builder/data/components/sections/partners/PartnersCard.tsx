import Image from "next/image";

export function PartnersCard({
  partner,
}: {
  partner: { url: string; width: number; height: number; alt?: string };
}) {
  return (
    <div className="w-full  flex items-center justify-center rounded-[20px] bg-card h-[200px] md:h-[250px]">
      <Image
        width={partner.width}
        height={partner.height}
        alt={partner.alt ?? "logo of partner"}
        src={partner.url}
      ></Image>
    </div>
  );
}
