import {Category, Task} from '@/types'

export function filterTasksByCategory(array: Task[], category: Category) {
  return array.filter((t) => t.categoryId === category.id)
}
