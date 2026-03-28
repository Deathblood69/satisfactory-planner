import {fetchEntity} from '@/utils/fetchEntity'

export default function getAllEntities<E>(entity: string) {
  return fetchEntity<E>(`${entity}`)
}
