"use client";

import { useState } from "react";
import { TextField, Button, Stack } from "@mui/material";
import { Category } from "@/types";

type Props = {
    categories: Category[];
    onAdd: (title: string, categoryId: string | null) => void;
};

export function TaskForm({ categories, onAdd }: Props) {
    const [title, setTitle] = useState("");
    const [categoryId, setCategoryId] = useState<string | null>(null);

    const handleSubmit = () => {
        if (!title.trim()) return;
        onAdd(title, categoryId);
        setTitle("");
    };

    return (
        <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
            <TextField
                fullWidth
                label="Nouvelle tâche"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <select
                value={categoryId ?? ""}
                onChange={(e) => setCategoryId(e.target.value || null)}
            >
                <option value="">Aucune catégorie</option>
                {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                        {c.name}
                    </option>
                ))}
            </select>
            <Button variant="contained" onClick={handleSubmit}>
                Ajouter
            </Button>
        </Stack>
    );
}