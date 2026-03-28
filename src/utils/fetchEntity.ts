import {APP_CONFIG} from '@/config/app.config'

type ReturnType = 'json'

type FetchBody = BodyInit | Record<string, unknown> | null | undefined

interface FetchParams {
  entity: string
  method?: string
  body?: FetchBody
  returnType?: ReturnType
}

export async function fetchEntity({
  entity,
  method,
  body,
  returnType = 'json'
}: FetchParams) {
  const isObjectBody =
    body && typeof body === 'object' && !(body instanceof FormData)

  return fetch(`${APP_CONFIG.backendUrl}/${entity}`, {
    method,
    body: isObjectBody ? JSON.stringify(body) : body,
    headers: isObjectBody ? {'Content-Type': 'application/json'} : undefined
  }).then((res) => {
    switch (returnType) {
      case 'json':
        return res.json()
      default:
        throw new Error(`Unsupported returnType ${returnType}`)
    }
  })
}
