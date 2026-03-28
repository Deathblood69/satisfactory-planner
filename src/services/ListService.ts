import {fetchEntity} from '@/utils/fetchEntity'
import {ListDTO} from '@/dto/ListDTO'
import {ListCreateDTO} from '@/dto/ListCreateDTO'
import {IdService} from '@/services/IdService'

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

  static dtoToEntity(dto: ListCreateDTO): ListDTO {
    return {
      id: IdService.generateId('v4'),
      name: dto.name ?? 'New list',
      instance: dto.instance,
      private: dto.private ?? false
    }
  }
}
