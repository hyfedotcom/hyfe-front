import CareersPage from "./components/CareersPage";

export const dynamic = "force-static";
export const revalidate = false;

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CareersPage />
      {children}
    </>
  );
}
