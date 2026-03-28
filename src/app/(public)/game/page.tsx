import {ListService} from '@/services/ListService'

export default async function Page() {
  const game = new ListService()
  await game.initGame()

  return game.instance
}
