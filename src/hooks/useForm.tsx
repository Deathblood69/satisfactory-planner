'use client'

import {useMutation, useQueryClient} from '@tanstack/react-query'
import {useEffect, useState} from 'react'
import getEntityById from '@/queries/getEntityById'

interface Props<Input, Output> {
  id?: string
  defaultForm?: Input
  onTrigger: (data: Input) => Promise<Output>
  onSuccess?: (data: Output) => void
}

export default function useForm<Form, Response>(
  entity: string,
  {id, defaultForm, onTrigger, onSuccess}: Props<Form, Response>
) {
  const [state, setState] = useState<Partial<Form> | null>(defaultForm ?? null)

  const queryClient = useQueryClient()

  const mutation = useMutation<Response, unknown, Form>({
    mutationFn: async (dto) => {
      try {
        const data = await onTrigger(dto)
        if (onSuccess) {
          onSuccess(data)
        }
        return data
      } catch (err) {
        throw err
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: [entity]})
    }
  })

  const {error, isPending, mutate} = useMutation({
    mutationFn: (id: string) => getEntityById<Form>(entity, id),
    onSuccess: (data) => handleChangeForm(data)
  })

  useEffect(() => {
    if (id && id !== 'new') {
      mutate(id)
    }
  }, [mutate, id])

  function handleChangeForm(newState: Partial<Form>) {
    setState((prevState) => {
      return prevState !== null ? {...prevState, ...newState} : newState
    })
  }

  return {
    form: state,
    error: (mutation.error || error) as Error,
    isPending: mutation.isPending || isPending,
    isError: mutation.isError,
    onSubmit: mutation.mutate,
    onChangeForm: handleChangeForm
  }
}
