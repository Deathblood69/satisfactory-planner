type AbstractType = {
  id: string
}

type Category = AbstractType & {
  name: string
  parentId: string | null
  order: number
}

type Task = AbstractType & {
  title: string
  completed: boolean
  categoryId: string | null
}

type CategoryTree = Category & {
  children: CategoryTree[]
}

export type {Task, Category, CategoryTree}
