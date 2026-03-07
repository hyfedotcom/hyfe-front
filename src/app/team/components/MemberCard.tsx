import { MemberType } from "@/features/team/schema/team.schema";
import Image from "next/image";

export function MemberCard({ member }: { member: MemberType }) {
  return (
    <div className="w-[60vw] h-full md:h-full py-4 md:py-10 px-5 bg-card flex flex-col items-center justify-center rounded-[20px] border-border border-1 hover:border-primary hover:shadow-hover hover:bg-activ duration-300 cursor-pointer space-y-5">
      <Image
        src={member.image.url}
        alt={member.name}
        width={160}
        height={160}
        quality={70}
        className="rounded-full w-[160px] h-[160px] mx-auto object-cover"
      />
      <div className="space-y-1 text-center">
        <h4 className="max-md:text-[16px]!">{member.name}</h4>
        <p className="max-md:text-[14px]! body-medium text-balance">
          {member.job}
        </p>
      </div>
    </div>
  );
}
