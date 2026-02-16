"use client";

import {SettingsProps} from "@/types";
import SectionHeader from "@/components/ui/SectionHeader";

export default function About({settings}: SettingsProps)  {
    return (
        <section id="about" className="bg-[#FFF7EF] px-[8%] py-28">
            <SectionHeader label="À propos" title="Qui" titleAccent="suis-je ?" />

            <div className="mx-auto grid max-w-[1100px] grid-cols-1 items-center gap-16 md:grid-cols-2">
                {/* Colonne gauche — Photo */}
                <div className="relative">
                    <div className="relative overflow-hidden">
                        <img
                            src={settings.aboutImageUrl ?? ""}
                            alt="Aude — Beauty by Aude"
                            className="h-[600px] w-full object-cover rounded-2xl"
                        />
                    </div>
                    {/* Élément décoratif — cadre décalé */}
                    <div
                        className="
                              absolute -bottom-4 -right-4 -z-10 h-full w-full
                              border border-taupe/20
                          "
                    />
                </div>

                {/* Colonne droite — Texte */}
                <div>
                    {/* Ligne décorative */}
                    <div className="mb-6 flex items-center gap-4">
                        <span className="h-px w-10 bg-taupe" />
                        <span className="text-[0.7rem] font-normal uppercase tracking-[0.35em] text-taupe">
                              Aude, prothésiste ongulaire à Villecresnes
                          </span>
                    </div>

                    <p className="whitespace-pre-line text-[1.05rem] leading-[1.9] text-[#5C3D42]">
                        {settings.aboutText}
                    </p>

                    {/* Signature */}
                    <div className="mt-8">
                        <span className="font-heading text-2xl italic text-taupe">Aude</span>
                    </div>
                </div>
            </div>
        </section>
    );
};
