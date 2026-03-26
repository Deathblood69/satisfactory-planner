"use client";

import { useState } from "react";
import { TextField, Button, Stack } from "@mui/material";
import { Task, CategoryTree } from "@/types";
import {CategorySelector} from "@/ui/category/CategorySelector";

type Props = {
    task: Task;
    categories: CategoryTree[];
    onSave: (updatedTask: Partial<Task> & { id: string }) => void;
    onCancel?: () => void;
};

export function EditTaskForm({ task, categories, onSave, onCancel }: Props) {
    const [title, setTitle] = useState(task.title);
    const [categoryId, setCategoryId] = useState<string | null>(task.categoryId);

    const handleSubmit = () => {
        if (!title.trim()) return;
        onSave({ id: task.id, title, categoryId });
    };

    return (
        <Stack spacing={2}>
            <TextField
                label="Titre de la tâche"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
            />
            <CategorySelector
                categories={categories}
                selected={categoryId}
                onSelect={setCategoryId}
            />
            <Stack direction="row" spacing={2}>
                <Button variant="contained" onClick={handleSubmit}>
                    Sauvegarder
                </Button>
                {onCancel && <Button onClick={onCancel}>Annuler</Button>}
            </Stack>
        </Stack>
    );
}