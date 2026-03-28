import {fetchEntity} from '@/utils/fetchEntity'
import {ListDTO} from '@/dto/ListDTO'
import {ListCreateDTO} from '@/dto/ListCreateDTO'

export class ListService {
  static async createList(dto: ListCreateDTO) {
    return fetchEntity<ListDTO>('lists', {
      method: 'POST',
      body: JSON.stringify(dto)
    })
  }

  static async getAllLists() {
    return fetchEntity<ListDTO[]>('lists')
  }
}
