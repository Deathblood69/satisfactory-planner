import {fetchEntity} from '@/utils/fetchEntity'
import {ListDTO} from '@/dto/lists/ListDTO'
import {ListCreateDTO} from '@/dto/lists/ListCreateDTO'
import {API_CONFIG} from '@/config/api.config'

export class ListService {
  static async createList(dto: ListCreateDTO) {
    return fetchEntity<ListDTO>(API_CONFIG.lists, {
      method: 'POST',
      body: JSON.stringify(dto)
    })
  }

  static async updateList(id: string, dto: ListCreateDTO) {
    return fetchEntity<ListDTO>(`lists/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(dto)
    })
  }

  static async deleteByIds(ids?: readonly string[]) {
    if (ids?.length === 1) {
      return fetchEntity<readonly string[]>(`lists/${ids[0]}`, {
        method: 'DELETE'
      })
    }
  }
}
