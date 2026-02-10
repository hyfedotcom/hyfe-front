import { Poppins } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layouts/Header/Header";
import { Footer } from "@/components/layouts/footer/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildOrganizationJsonLd } from "@/components/seo/jsonLdBuilders";
import { ScrollToTop } from "@/components/navigation/ScrollToTop";
import { getNewsletterForm } from "@/features/newsletter";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  preload: true,
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const newsletter = await getNewsletterForm();

  return (
    <html lang="en">
      <body className={`${poppins.variable}  antialiased`}>
        <JsonLd data={buildOrganizationJsonLd()} id="organization-jsonld" />
        <ScrollToTop />
        <div data-site-header>
          <Header />
        </div>
        {children}
        <div data-site-footer>
          <Footer newsletter={newsletter} />
        </div>
      </body>
    </html>
  );
}
