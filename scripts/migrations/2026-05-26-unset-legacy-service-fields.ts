import dotenv from "dotenv";
import {createClient} from "next-sanity";

dotenv.config({ path: ".env.local"})

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: "2026-02-14",
    token: process.env.SANITY_API_TOKEN,
    useCdn: false,
});

async function main() {
    const query = `*[_type == "service" && (defined(icon) || defined(order))]{_id}`
    const services = await client.fetch<{ _id: string }[]>(query);
    console.log(`${services.length} services à nettoyer`);
    console.log(services.map(s => s._id));

    const tx = client.transaction();
    for (const service of services) {
        tx.patch(service._id, (p) => p.unset(['icon', 'order']));
    }
    await tx.commit();
    console.log("Transaction terminée")
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});