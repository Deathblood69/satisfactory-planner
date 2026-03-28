import {APP_CONFIG} from '@/config/app.config'

type ReturnType = 'json'

type FetchBody = BodyInit | Record<string, unknown> | null | undefined

interface FetchParams {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | string
  body?: FetchBody
  returnType?: ReturnType
  randomErrorChance?: number
  randomHttpErrorChance?: number
}

export async function fetchEntity<E>(
  entity: string,
  options?: FetchParams
): Promise<E> {
  const method = options?.method ?? 'GET'
  const body = options?.body
  const isObjectBody =
    body && typeof body === 'object' && !(body instanceof FormData)
  const fetchOptions: RequestInit = {
    method,
    headers: isObjectBody ? {'Content-Type': 'application/json'} : undefined,
    body: body
      ? isObjectBody
        ? JSON.stringify(body)
        : (body as BodyInit)
      : undefined
  }

  // await waitRandomOrThrow(
  //   2,
  //   5,
  //   options?.randomErrorChance ?? 0.2,
  //   options?.randomHttpErrorChance ?? 0.2
  // )

  const res = await fetch(`${APP_CONFIG.backendUrl}/${entity}`, fetchOptions)

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Fetch failed: ${res.status} ${res.statusText} - ${text}`)
  }

  switch (options?.returnType ?? 'json') {
    case 'json':
      return res.json() as Promise<E>
    default:
      throw new Error(`Unsupported returnType ${options?.returnType}`)
  }
}

export async function waitRandomOrThrow(
  min: number = 1,
  max: number = 5,
  errorChance: number = 0.3,
  httpErrorChance: number = 0.2
): Promise<void> {
  const seconds = getRandomSeconds(min, max)
  await new Promise<void>((resolve) => setTimeout(resolve, seconds * 1000))

  const rand = Math.random()
  if (rand < errorChance) {
    throw new Error(`Erreur aléatoire après ${seconds} secondes !`)
  }
  if (rand < errorChance + httpErrorChance) {
    const httpErrors = [400, 401, 403, 404, 500, 502, 503] as const
    const status = httpErrors[Math.floor(Math.random() * httpErrors.length)]
    const statusTextMap: Record<typeof status, string> = {
      400: 'Bad Request',
      401: 'Unauthorized',
      403: 'Forbidden',
      404: 'Not Found',
      500: 'Internal Server Error',
      502: 'Bad Gateway',
      503: 'Service Unavailable'
    }
    const text = `Erreur HTTP simulée après ${seconds} secondes`

    throw new Error(
      `Fetch failed: ${status} ${statusTextMap[status]} - ${text}`
    )
  }

  console.log(`Réussi après ${seconds} secondes`)
}

function getRandomSeconds(min: number = 0, max: number = 60): number {
  if (min > max) {
    throw new Error('Le minimum ne peut pas être supérieur au maximum.')
  }
  return Math.floor(Math.random() * (max - min + 1)) + min
}
