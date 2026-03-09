import { type SchemaTypeDefinition } from "sanity";
import service from "@/sanity/schemaTypes/service";
import portfolio from "@/sanity/schemaTypes/portfolio";
import review from "@/sanity/schemaTypes/review";
import siteSettings from "@/sanity/schemaTypes/siteSettings";
import salon from "@/sanity/schemaTypes/salon";
import portfolioCategory from "@/sanity/schemaTypes/portfolioCategory";

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [service, portfolio, portfolioCategory, review, salon, siteSettings],
};
