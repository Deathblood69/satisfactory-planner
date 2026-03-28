import getPaginatedQuery from '@/queries/getPaginatedQuery'
import {useState} from 'react'
import {useQuery} from '@tanstack/react-query'

interface Props<T> {
  order?: 'asc' | 'desc'
  orderBy?: keyof T
  page?: number
  rowsPerPage?: number
}

interface Sorting<T> {
  order: 'asc' | 'desc'
  orderBy: keyof T
  onOrderChange?: (order: 'asc' | 'desc', orderBy: keyof T) => void
}

interface Paginating {
  count?: number
  page: number
  rowsPerPage: number
  onPageChange?: (page: number) => void
  onRowsPerPageChange?: (rowsPerPage: number) => void
}

interface Selecting {
  selected: readonly string[]
  onSelectedChange?: (selected: readonly string[]) => void
}

interface PaginationResult<T> {
  isPending: boolean
  error: Error | null
  data?: T[]
  rows?: T[]
  sorting?: Sorting<T>
  paginating: Paginating
  selecting: Selecting
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

  function handleOrderChange(newOrder: 'asc' | 'desc', newOrderBy: keyof T) {
    setCurrentOrder(newOrder)
    setCurrentOrderBy(newOrderBy)
  }

  function handlePageChange(newPage: number) {
    setCurrentPage(newPage)
  }

  function handleRowsPerPageChange(newRowsPerPage: number) {
    setCurrentRowsPerPage(newRowsPerPage)
    setCurrentPage(0)
  }

  function handleSelected(selected: readonly string[]) {
    setSelected(selected)
  }

  return {
    error: error,
    isPending,
    rows: data?.data,
    sorting: {
      order: currentOrder,
      orderBy: currentOrderBy,
      onOrderChange: handleOrderChange
    },
    paginating: {
      count: data?.items,
      page: currentPage,
      rowsPerPage: currentRowsPerPage,
      onPageChange: handlePageChange,
      onRowsPerPageChange: handleRowsPerPageChange
    },
    selecting: {
      selected,
      onSelectedChange: handleSelected
    }
  }
}
