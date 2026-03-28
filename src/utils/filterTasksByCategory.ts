import {CategoryDTO} from '@/dto/CategoryDTO'
import {TaskDTO} from '@/dto/TaskDTO'

export function filterTasksByCategory(array: TaskDTO[], category: CategoryDTO) {
  return array.filter((t) => t.categoryId === category.id)
}
