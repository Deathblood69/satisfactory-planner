'use client'

import {QueryClient, useMutation} from '@tanstack/react-query'

interface Props<Input, Output> {
  onCreate: (data: Input) => Promise<Output>
  onSuccess?: (data: Output) => void
}

export default function useForm<Input, Output>(
  entity: string,
  {onCreate, onSuccess}: Props<Input, Output>
) {
  const queryClient = new QueryClient()

  const mutation = useMutation<Output, unknown, Input>({
    mutationFn: async (dto) => {
      try {
        const data = await onCreate(dto)
        if (onSuccess) {
          onSuccess(data)
        }
        return data
      } catch (err) {
        throw err
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [entity]})
    }
  })

  return {
    error: mutation.error as Error,
    isPending: mutation.isPending,
    isError: mutation.isError,
    onSubmit: mutation.mutate
  }
}
