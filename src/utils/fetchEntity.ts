import {APP_CONFIG} from '@/config/app.config'
import waitRandomOrThrow from '@/utils/waitRandomOrThrow'

type ReturnType = 'json'

type FetchBody = BodyInit | Record<string, unknown> | null | undefined

interface FetchParams {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | string
  body?: FetchBody
  returnType?: ReturnType
}

export async function fetchEntity<E>(
  entity: string,
  options?: FetchParams
): Promise<E> {
  const method = options?.method ?? 'GET'
  const body = options?.body

  // Déterminer si le body est un objet JS à transformer en JSON
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

  const res = await fetch(`${APP_CONFIG.backendUrl}/${entity}`, fetchOptions)

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Fetch failed: ${res.status} ${res.statusText} - ${text}`)
  }

  await waitRandomOrThrow(2, 5, 0.4)

  switch (options?.returnType ?? 'json') {
    case 'json':
      return res.json()
    default:
      throw new Error(`Unsupported returnType ${options?.returnType}`)
  }
}
