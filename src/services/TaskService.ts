import {fetchEntity} from '@/utils/fetchEntity'
import {API_CONFIG} from '@/config/api.config'
import {TaskDTO} from '@/dto/tasks/TaskDTO'
import {TaskCreateDTO} from '@/dto/tasks/TaskCreateDTO'

export class TaskService {
  static async createList(dto: TaskCreateDTO) {
    return fetchEntity<TaskDTO>(API_CONFIG.tasks, {
      method: 'POST',
      body: JSON.stringify(dto)
    })
  }

  static async updateList(id: string, dto: TaskCreateDTO) {
    return fetchEntity<TaskDTO>(`${API_CONFIG.tasks}/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(dto)
    })
  }

  static async deleteByIds(ids?: readonly string[]) {
    if (ids?.length === 1) {
      return fetchEntity<readonly string[]>(`${API_CONFIG.tasks}/${ids[0]}`, {
        method: 'DELETE'
      })
    }
  }
}
