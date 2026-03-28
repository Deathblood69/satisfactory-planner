import getPaginatedQuery from '@/queries/getPaginatedQuery'
import {useState} from 'react'
import {useQuery} from '@tanstack/react-query'

interface Props<T> {
  order?: 'asc' | 'desc'
  orderBy?: keyof T
  page?: number
  rowsPerPage?: number
}

interface PaginationResult<T> {
  data?: T[]
  count?: number
  order: 'asc' | 'desc'
  orderBy: keyof T
  page: number
  rowsPerPage: number
  selected: readonly string[]
  error: Error | null
  isPending: boolean
  setOrder: (order: 'asc' | 'desc') => void
  setOrderBy: (orderBy: keyof T) => void
  setPage: (page: number) => void
  setRowsPerPage: (rowsPerPage: number) => void
  setSelected: (selected: readonly string[]) => void
}

export default function usePagination<T extends {id: string}>(
  entity: string,
  options?: Props<T>
): PaginationResult<T> {
  const [currentOrder, setCurrentOrder] = useState<'asc' | 'desc'>(
    options?.order ?? 'asc'
  )
  const [currentOrderBy, setCurrentOrderBy] = useState<keyof T>(
    options?.orderBy ?? ('id' as keyof T)
  )
  const [currentPage, setCurrentPage] = useState(options?.page ?? 0)
  const [currentRowsPerPage, setCurrentRowsPerPage] = useState(
    options?.rowsPerPage ?? 5
  )
  const [selected, setSelected] = useState<readonly string[]>([])

  const {
    data,
    isLoading: isPending,
    error
  } = useQuery({
    queryKey: [entity, currentPage, currentRowsPerPage],
    queryFn: () =>
      getPaginatedQuery<T>(entity, {
        page: currentPage + 1, // API pages start at 1
        perPage: currentRowsPerPage
      })
  })

  return {
    data: data?.data,
    count: data?.items,
    order: currentOrder,
    orderBy: currentOrderBy,
    page: currentPage,
    rowsPerPage: currentRowsPerPage,
    selected,
    error: error,
    isPending,
    setOrder: setCurrentOrder,
    setOrderBy: setCurrentOrderBy,
    setPage: setCurrentPage,
    setRowsPerPage: setCurrentRowsPerPage,
    setSelected
  }
}
