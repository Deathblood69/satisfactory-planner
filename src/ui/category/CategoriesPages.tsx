"use client";

import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {Container, Typography} from "@mui/material";
import {Category} from "@/types";
import {CategoryForm} from "@/ui/category/CategoryForm";

const API_CATEGORIES = "http://localhost:3001/categories";

export default function CategoriesPage() {
    const queryClient = useQueryClient();

    const { data: categories = [] } = useQuery<Category[]>({
        queryKey: ["categories"],
        queryFn: async () => (await fetch(API_CATEGORIES)).json(),
    });

    const addCategory = useMutation({
        mutationFn: async ({ name, parentId }: { name: string; parentId: string | null }) => {
            const res = await fetch(API_CATEGORIES, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, parentId, order: categories.length }),
            });
            return res.json();
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["categories"] }),
    });

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Typography variant="h4" sx={{ mb: 2 }}>Catégories</Typography>

            <CategoryForm
                categories={categories}
                onAdd={(name, parentId) => addCategory.mutate({ name, parentId })}
            />
        </Container>
    );
}