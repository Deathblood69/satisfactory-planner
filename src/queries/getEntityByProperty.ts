import {fetchEntity} from '@/utils/fetchEntity'

export default async function getEntityByProperty<E>(
  entity: string,
  property: string,
  value: string
) {
  const res = await fetchEntity<E[]>(`${entity}?${property}:eq=${value}`)
  return res[0]
}
