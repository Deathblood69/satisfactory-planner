import {CategoryTree} from "@/types";

export function sortCategoriesByOrder(categories: CategoryTree[]): CategoryTree[] {
    return categories
        .sort((a, b) => a.order - b.order)
        .map((cat) => ({
            ...cat,
            children: sortCategoriesByOrder(cat.children || [])
        }));
}