export type PaginationProps = {
  currentPage: number
  size: number
  count: number
  displayCount: number
  setPage: (page: number) => void
  setPageSize: (size: number) => void
  showPageSize: boolean
  delta: number
}
export function Pagination({
  currentPage,
  size,
  count,
  displayCount,
  setPage,
  setPageSize,
  showPageSize,
  delta,
}: PaginationProps) {
  const pageSizeDropdownItems = [
    { name: '15 / page', value: 15 },
    { name: '50 / page', value: 50 },
    { name: '100 / page', value: 100 },
  ]

  const lastPage = Math.ceil(count / size)
  const range = Array(lastPage)
    .fill(0)
    .map((_, i) => i + 1)
}
