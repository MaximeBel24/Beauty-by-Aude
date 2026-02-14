import { client } from "@/lib/sanity.client";

export default async function Home() {
    // Test de connexion — à retirer après
    const sanityTest = await client.fetch(`*[_type == "service"][0..2]`);
    console.log("Sanity connecté ✅ Résultat :", sanityTest);

    return (
        <main className="flex min-h-screen flex-col items-center justify-center">
            <h1 className="font-heading text-6xl font-light italic text-burgundy">
                Beauty by Aude
            </h1>
            <p className="mt-4 font-body text-lg text-rosewood">
                Site en construction ✨
            </p>
            <p className="mt-2 text-sm text-taupe">
                Sanity : {sanityTest ? "✅ Connecté" : "⏳ Pas encore de contenu"}
            </p>
        </main>
    );
}