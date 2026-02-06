import Image from "next/image";

export function Card({
  testimonial,
}: {
  testimonial: { paragraph: string; name: string; role: string };
}) {
  const { name, paragraph, role } = testimonial;
  return (
    <div className=" p-4 md:p-6 h-full w-full bg-card rounded-[20px] flex flex-col-reverse items-start justify-between gap-6">
      <div className="flex  gap-3">
        <div>
          {name && (
            <p className="body-large text-body font-medium! line-clamp-1">
              {name}
            </p>
          )}
          {role && (
            <p className="body-small text-body-secondary line-clamp-1">{role}</p>
          )}
        </div>
        {/* {rating && (
          <div className="ml-auto">
            <RatingCircle value={rating} />
          </div>
        )} */}
      </div>
      <p className="text-[16px] md:text-[18px] italic text-black">
        &ldquo;{paragraph}&rdquo;
      </p>
    </div>
  );
}
