import CareersPage from "./components/CareersPage";

export const dynamic = "force-static";
export const revalidate = 86400;

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CareersPage />
      {children}
    </>
  );
}
