"use client";

import {List, ListItem, ListItemText, Switch} from "@mui/material";
import { CategoryTree } from "@/types";
import { CategoryItem } from "./CategoryItem";

type Props = {
    categories: CategoryTree[];
    selected?: string | null;
    onSelect: (categoryId: string | null) => void;
};

export function CategorySelector({ categories, selected, onSelect }: Props) {
    return (
        <List>
            <ListItem
                component="li"
                onClick={() => onSelect(null)}
            >
                <ListItemText>Aucune catégorie</ListItemText>
                <Switch
                    edge="end"
                    checked={selected === null}
                />
            </ListItem>
            {categories.map((cat) => (
                <CategoryItem
                    key={cat.id}
                    category={cat}
                    onSelect={onSelect}
                    level={0}
                />
            ))}
        </List>
    );
}