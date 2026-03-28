'use client'

import {QueryClient, useMutation} from '@tanstack/react-query'
import {useState} from 'react'

interface Props<Input, Output> {
  onCreate: (data: Input) => Promise<Output>
  onSuccess?: (data: Output) => void
}

export default function useForm<Input, Output>(
  entity: string,
  {onCreate, onSuccess}: Props<Input, Output>
) {
  const queryClient = new QueryClient()
  const [customError, setCustomError] = useState<string | null>(null)

  const mutation = useMutation<Output, unknown, Input>({
    mutationFn: async (dto) => {
      try {
        const data = await onCreate(dto)
        if (onSuccess) {
          onSuccess(data)
        }
        setCustomError(null) // Clear previous errors on success
        return data
      } catch (err: unknown) {
        const message =
          err instanceof Error
            ? err.message
            : typeof err === 'string'
              ? err
              : 'An unknown error occurred'
        setCustomError(message)
        throw err // Re-throw pour que react-query connaisse l'erreur
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [entity]})
    }
  })

  return {
    error: customError,
    isPending: mutation.isPending,
    isError: mutation.isError,
    onSubmit: mutation.mutate
  }
}
