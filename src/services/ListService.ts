import postList from '@/queries/postList'
import {IdService} from '@/services/IdService'

export class ListService {
  instance?: string

  constructor() {
    this.instance = IdService.generateId('v4')
  }

  async initGame() {
    const id = IdService.generateId('v4')
    await postList(id).then((data) => {
      console.log(data)
    })
  }
}
