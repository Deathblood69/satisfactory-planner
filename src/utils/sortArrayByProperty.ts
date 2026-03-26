export default function sortArrayByProperty<T, K extends keyof T>(
  array: T[],
  key: K
): T[] {
  return array.sort((a, b) => {
    const aVal = a[key]
    const bVal = b[key]

    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return aVal - bVal
    }

    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return aVal.localeCompare(bVal)
    }

    if (typeof aVal === 'boolean' && typeof bVal === 'boolean') {
      return Number(aVal) - Number(bVal)
    }

    return 0
  })
}
