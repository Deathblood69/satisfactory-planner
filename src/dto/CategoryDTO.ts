export interface CategoryDTO {
  id: string
  name: string
  parentId: string | null
  order: number
}
