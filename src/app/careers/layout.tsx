import CareersPage from "./components/CareersPage";

export default function Layout({ children }: { children: React.ReactElement }) {
  return (
    <>
      <CareersPage />
      {children}
    </>
  );
}
