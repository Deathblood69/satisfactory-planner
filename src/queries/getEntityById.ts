import {fetchEntity} from '@/utils/fetchEntity'

export default async function getEntityById<E>(entity: string, id?: string) {
  if (!id) {
    throw new Error("Missing param 'id'")
  }

  return fetchEntity<E>(`${entity}/${id}`)
}
