import {fetchEntity} from '@/utils/fetchEntity'
import {API_CONFIG} from '@/config/api.config'
import {CategoryDTO} from '@/dto/categories/CategoryDTO'
import {CategoryCreateDTO} from '@/dto/categories/CategoryCreateDTO'

export class CategoryService {
  static async createList(dto: CategoryCreateDTO) {
    return fetchEntity<CategoryDTO>(API_CONFIG.categories, {
      method: 'POST',
      body: JSON.stringify(dto)
    })
  }

  static async updateList(id: string, dto: CategoryCreateDTO) {
    return fetchEntity<CategoryDTO>(`${API_CONFIG.categories}/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(dto)
    })
  }

  static async deleteByIds(ids?: readonly string[]) {
    if (ids?.length === 1) {
      return fetchEntity<readonly string[]>(
        `${API_CONFIG.categories}/${ids[0]}`,
        {
          method: 'DELETE'
        }
      )
    }
  }
}
