import TeamListPage from "./components/TeamListPage";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TeamListPage />
      {children}
    </>
  );
}
