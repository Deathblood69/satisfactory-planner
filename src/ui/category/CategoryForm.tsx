"use client";

import { useState } from "react";
import { TextField, Button, Stack } from "@mui/material";
import { Category } from "@/types";

type Props = {
    categories: Category[];
    onAdd: (name: string, parentId: string | null) => void;
};

export function CategoryForm({ categories, onAdd }: Props) {
    const [name, setName] = useState("");
    const [parentId, setParentId] = useState<string | null>(null);

    const handleSubmit = () => {
        if (!name.trim()) return;
        onAdd(name, parentId);
        setName("");
    };

    return (
        <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
            <TextField
                fullWidth
                label="Nouvelle catégorie"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <select
                value={parentId ?? ""}
                onChange={(e) => setParentId(e.target.value || null)}
            >
                <option value="">Pas de parent</option>
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