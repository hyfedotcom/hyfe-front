import { Poppins } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layouts/Header/Header";
import { Footer } from "@/components/layouts/footer/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildOrganizationJsonLd } from "@/components/seo/jsonLdBuilders";
import { ScrollToTop } from "@/components/navigation/ScrollToTop";
import { getNewsletterForm } from "@/features/newsletter";
import getGeneral from "@/features/general/api/getGeneral";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { TrackingScripts } from "@/components/analytics/TrackingScripts";
import { CookieBanner } from "@/components/cookie/CookieBanner";
import { cookies } from "next/headers";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
  style: ["normal"],
});

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const newsletter = await getNewsletterForm();
  const general = await getGeneral();
  const cookieStore = await cookies();
  const hasAnalyticsConsent = cookieStore.has("analytics_consent");
  const topBannerHeight = general.header.header_banner.label.trim() ? 40 : 0;

  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <TrackingScripts />
        <JsonLd data={buildOrganizationJsonLd()} id="organization-jsonld" />
        <ScrollToTop />
        <div data-site-header>
          <Header header={general.header} topBannerHeight={topBannerHeight} />
        </div>
        {children}
        <div data-site-footer>
          <Footer newsletter={newsletter} footer={general.footer} />
        </div>
        <CookieBanner initialAccepted={hasAnalyticsConsent} />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
