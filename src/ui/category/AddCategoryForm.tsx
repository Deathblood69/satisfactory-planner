"use client";

import { useState } from "react";
import { TextField, Button, Stack, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { CategoryTree } from "@/types";

type Props = {
    categories: CategoryTree[];
    onAdd: (name: string, parentId: string | null) => void;
};

export function AddCategoryForm({ categories, onAdd }: Props) {
    const [name, setName] = useState("");
    const [parentId, setParentId] = useState<string | null>(null);

    const handleSubmit = () => {
        if (!name.trim()) return;
        onAdd(name, parentId);
        setName("");
        setParentId(null);
    };

    return (
        <Stack spacing={2} sx={{ mb: 4 }}>
            <TextField
                label="Nom de la catégorie"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
            />

            <FormControl fullWidth>
                <InputLabel id="parent-category-label">Catégorie parente</InputLabel>
                <Select
                    labelId="parent-category-label"
                    value={parentId ?? ""}
                    label="Catégorie parente"
                    onChange={(e) => setParentId(e.target.value === "" ? null : e.target.value)}
                >
                    <MenuItem value="">Aucune catégorie</MenuItem>
                    {categories.map((cat) => (
                        <MenuItem key={cat.id} value={cat.id}>
                            {cat.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <Button variant="contained" onClick={handleSubmit}>
                Ajouter la catégorie
            </Button>
        </Stack>
    );
}