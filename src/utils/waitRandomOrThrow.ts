export default async function waitRandomOrThrow(
  min: number = 1,
  max: number = 5,
  errorChance: number = 0.3
): Promise<void> {
  const seconds = getRandomSeconds(min, max)
  await new Promise((resolve) => setTimeout(resolve, seconds * 1000))

  if (Math.random() < errorChance) {
    throw new Error(`Erreur aléatoire après ${seconds} secondes !`)
  }

  console.log(`Réussi après ${seconds} secondes`)
}

function getRandomSeconds(min: number = 0, max: number = 60): number {
  if (min > max) {
    throw new Error('Le minimum ne peut pas être supérieur au maximum.')
  }
  return Math.floor(Math.random() * (max - min + 1)) + min
}
