"use client";

import { SettingsProps } from "@/types";
import SectionHeader from "@/components/ui/SectionHeader";
import Image from "next/image";

export default function About({ settings }: SettingsProps) {
    if (!settings) return null;
    return (
        <section id="about" className="bg-[var(--bg-secondary)] px-[8%] py-20">
            <SectionHeader label="À propos" title="Qui" titleAccent="suis-je ?" />

            <div className="mx-auto grid max-w-[1100px] grid-cols-1 items-center gap-10 md:gap-16 md:grid-cols-2">
                {/* Colonne gauche — Photo */}
                <div className="relative">
                    <div className="relative overflow-hidden h-[350px] sm:h-[450px] md:h-[500px] lg:h-[600px] bg-[var(--bg-secondary)]">
                        <Image
                            src={settings.aboutImageUrl ?? ""}
                            alt="Aude — Beauty by Aude"
                            className="object-contain lg:object-cover"
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />

                        {/* Overlay dark mode — dégradé subtil pour fondre le fond clair
                            de l'infographie dans le thème sombre.
                            💡 opacity-0 en light mode, dark:opacity-100 en dark.
                            pointer-events-none empêche de bloquer les interactions. */}
                        <div className="
                            pointer-events-none absolute inset-0
                            bg-gradient-to-b from-[var(--bg-secondary)]/30 via-transparent to-[var(--bg-secondary)]/30
                            opacity-0 transition-opacity duration-300
                            dark:opacity-100
                        " />
                    </div>
                    {/* Élément décoratif — cadre décalé (masqué sur mobile pour éviter overflow) */}
                    <div
                        className="
                              absolute -bottom-4 -right-4 -z-10 h-full w-full
                              border border-[var(--border-medium)]
                              hidden md:block
                          "
                    />
                </div>

                {/* Colonne droite — Texte */}
                <div>
                    {/* Ligne décorative */}
                    <div className="mb-6 flex items-center gap-4">
                        <span className="h-px w-10 bg-[var(--text-accent)]" />
                        <span className="text-[0.7rem] font-normal uppercase tracking-[0.35em] text-[var(--text-accent)]">
                            Aude, prothésiste ongulaire à Villecresnes
                        </span>
                    </div>

                    <p className="whitespace-pre-line text-[1.05rem] leading-[1.9] text-[var(--text-body-color)]">
                        {settings.aboutText}
                    </p>

                    {/* Signature */}
                    <div className="mt-8">
                        <span className="font-heading text-2xl italic text-[var(--text-accent)]">Aude</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
