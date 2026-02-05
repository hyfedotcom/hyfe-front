import { MemberType } from "@/features/team/schema/team.schema";
import Image from "next/image";

export function MemberCard({ member }: { member: MemberType }) {
  return (
    <div className="w-full py-10 px-5 bg-card flex flex-col items-center justify-center rounded-[20px] border-border border-1 hover:border-primary cursor-pointer space-y-5">
      <Image
        src={member.image.url}
        alt={member.name}
        width={160}
        height={160}
        className="rounded-full w-[160px] h-[160px]"
      />
      <div className="space-y-1 text-center">
        <h4>{member.name}</h4>
        <p className="body-medium">{member.job}</p>
      </div>
    </div>
  );
}
