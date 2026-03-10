import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getSiteSettings } from "@/lib/sanity.queries";
import ThemeToggle from "@/components/ui/ThemeToggle";

/**
 * Layout du site (hors Studio Sanity).
 *
 * Ce layout est un Server Component async : il fetch les settings Sanity
 * pour passer logoUrl et planityUrl à la Navbar (Client Component).
 *
 * Parallèle Java : comme un @ControllerAdvice qui injecte des données
 * communes à toutes les vues (logo, liens globaux).
 */
export default async function SiteLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    const settings = await getSiteSettings();

    return (
        <>
            <Navbar logoUrl={settings?.logoUrl} planityUrl={settings?.planityUrl} />
            {children}
            <Footer />
            <ThemeToggle />
        </>
    );
}
