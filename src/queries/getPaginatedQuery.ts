import {fetchEntity} from '@/utils/fetchEntity'

interface PaginatedResponse<E> {
  first: number
  prev: number
  next: number
  last: number
  pages: number
  items: number
  data: E[]
}

interface Props {
  page: number
  perPage: number
}

export default function getPaginatedQuery<E>(entity: string, options?: Props) {
  return fetchEntity<PaginatedResponse<E>>(
    `${entity}?_page=${options?.page ?? 1}&_per_page=${options?.perPage ?? 10}`
  )
}
