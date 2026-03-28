import {CategoryDTO} from '@/dto/categories/CategoryDTO'

type CategoryTree = CategoryDTO & {
  children: CategoryTree[]
}

export function buildCategoryTree(categories: CategoryDTO[]): CategoryTree[] {
  const map = new Map<string, CategoryTree>()
  const roots: CategoryTree[] = []

  categories.forEach((cat) => map.set(cat.id, {...cat, children: []}))

  map.forEach((cat) => {
    if (cat.parentId === null) {
      roots.push(cat)
    } else {
      const parent = map.get(cat.parentId)
      if (parent) parent.children.push(cat)
    }
  })

  // Tri récursif par order
  function sortTree(nodes: CategoryTree[]): CategoryTree[] {
    return nodes
      .sort((a, b) => a.order - b.order)
      .map((n) => ({...n, children: sortTree(n.children)}))
  }

  return sortTree(roots)
}
