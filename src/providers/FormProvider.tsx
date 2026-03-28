'use client'

import {createContext, ReactNode, useContext, useState} from 'react'
import {useMutation, useQueryClient} from '@tanstack/react-query'
import getEntityById from '@/queries/getEntityById'

interface Props<Form, Response> {
  entity: string
  defaultForm: Form
  onSave: (data: Form) => Promise<Response>
  onSuccess?: (response?: Response) => void
  children: ReactNode
}

interface FormContextType<Form> {
  form: Partial<Form>
  error: Error | null
  isPending: boolean
  isError: boolean
  onSubmit: (data: Form) => void
  onChangeForm: (data: Partial<Form>) => void
}

const FormContext = createContext<FormContextType<any> | null>(null)

export function FormProvider<Form, Response>({
  entity,
  defaultForm,
  onSave,
  onSuccess,
  children
}: Props<Form, Response>) {
  const queryClient = useQueryClient()

  const [state, setState] = useState<Partial<Form>>(defaultForm)

  const fetchMutation = useMutation({
    mutationFn: (id: string) => getEntityById<Form>(entity, id),
    onSuccess: (data) => handleChangeForm(data)
  })

  const saveMutation = useMutation<Response, unknown, Form>({
    mutationFn: async (dto) => {
      return await onSave(dto)
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: [entity]})
      if (onSuccess) {
        onSuccess()
      }
    }
  })

  function handleChangeForm(newState: Partial<Form>) {
    setState((prev) => (prev ? {...prev, ...newState} : newState))
  }

  return (
    <FormContext.Provider
      value={{
        form: state,
        error: (saveMutation.error || fetchMutation.error) as Error,
        isPending: saveMutation.isPending || fetchMutation.isPending,
        isError: saveMutation.isError,
        onSubmit: saveMutation.mutate,
        onChangeForm: handleChangeForm
      }}
    >
      {children}
    </FormContext.Provider>
  )
}

export function useFormContext<Form>() {
  const context = useContext(FormContext)

  if (!context) {
    throw new Error('useFormContext must be used inside FormProvider')
  }

  return context as FormContextType<Form>
}
