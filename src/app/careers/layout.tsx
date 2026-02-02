import CareersPage from "./components/CareersPage";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CareersPage />
      {children}
    </>
  );
}
