import {fetchEntity} from '@/utils/fetchEntity'

export default async function getEntitiesByProperty<E>(
  entity: string,
  property: string,
  value: string
) {
  return await fetchEntity<E[]>(`${entity}?${property}:eq=${value}`)
}
