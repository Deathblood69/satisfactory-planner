import {Task} from '@/types'

export default function sortTaskById(array: Task[]) {
  return array.sort((a, b) => a.id.localeCompare(b.id))
}
