export function SectionContainer({
  children,
  className,
}: {
  children: React.ReactElement;
  className?: string;
}) {
  return (
    <section
      className={`${className} px-4 md:px-10 xl:px-20 py-25 md:py-35  bg-white relative`}
    >
      {children}
    </section>
  );
}
