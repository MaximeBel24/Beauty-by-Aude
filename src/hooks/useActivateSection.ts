import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";

/**
 * useActiveSection — Détecte la section visible à l'écran.
 *
 * Parallèle Spring : c'est un @Service qui encapsule
 * la logique de détection, extraite du @Controller (Navbar).
 *
 * @param sectionIds — les IDs des sections à observer (ex: ["about", "services", ...])
 * @returns isActive — fonction qui dit si un lien donné est actif
 */
export function useActiveSection(sectionIds: string[]) {
    const pathname = usePathname();
    const [activeSection, setActiveSection] = useState<string>("");

    // IntersectionObserver — uniquement sur la homepage
    useEffect(() => {
        if (pathname !== "/") {
            setActiveSection("");
            return;
        }

        const sections = sectionIds
            .map(id => document.getElementById(id))
            .filter(Boolean) as HTMLElement[];

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries.find(e => e.isIntersecting);
                if (visible) {
                    setActiveSection(visible.target.id);
                }
            },
            { rootMargin: "-40% 0px -55% 0px" }
        );

        sections.forEach(section => observer.observe(section));
        return () => observer.disconnect();
    }, [pathname, sectionIds]);

    // isActive — le résultat principal du hook
    const isActive = useCallback((href: string): boolean => {
        const sectionId = href.replace("/#", "");
        if (pathname.startsWith("/services") && sectionId === "services") return true;
        if (pathname.startsWith("/portfolio") && sectionId === "portfolio") return true;
        if (pathname === "/" && activeSection === sectionId) return true;
        return false;
    }, [pathname, activeSection]);

    // On retourne la fonction — c'est tout ce dont Navbar a besoin
    return { isActive };
}
