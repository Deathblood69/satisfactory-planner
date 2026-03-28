import {fetchEntity} from '@/utils/fetchEntity'

export default function postList(id: string) {
  return fetchEntity({
    entity: 'lists',
    method: 'POST',
    body: {instance: id}
  })
}
