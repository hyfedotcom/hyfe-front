import AdvisorsListPage from "./components/AdvisorsListPage";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AdvisorsListPage />
      {children}
    </>
  );
}
