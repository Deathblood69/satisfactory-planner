'use client'

import {
  createContext,
  ReactNode,
  SyntheticEvent,
  useContext,
  useEffect,
  useState
} from 'react'
import {useMutation, useQueryClient} from '@tanstack/react-query'
import getEntityById from '@/queries/getEntityById'

interface Props<Form, Response> {
  id?: string
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
  onChangeForm: (data: Partial<Form>) => void
}

const FormContext = createContext<FormContextType<any> | null>(null)

export function FormProvider<Form, Response>({
  id,
  entity,
  defaultForm,
  onSave,
  onSuccess,
  children
}: Props<Form, Response>) {
  const queryClient = useQueryClient()

  const [state, setState] = useState<Partial<Form>>(defaultForm)

  const {
    mutate: mutateFetchEdited,
    error: errorFetchEdited,
    isPending: isPendingFetchEdited,
    isError: isErrorFetchEdited
  } = useMutation({
    mutationFn: (id: string) => getEntityById<Form>(entity, id),
    onSuccess: (data) => {
      handleChangeForm(data)
    }
  })

  const {
    mutate: mutateSave,
    error: errorSave,
    isPending: isPendingSave,
    isError: isErrorSave
  } = useMutation<Response, unknown, Form>({
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

  useEffect(() => {
    if (id && id !== 'new') {
      mutateFetchEdited(id)
    }
  }, [mutateFetchEdited, id])

  function handleChangeForm(newState: Partial<Form>) {
    setState((prev) => (prev ? {...prev, ...newState} : newState))
  }

  function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const data = Object.fromEntries(formData.entries()) as Form
    mutateSave(data)
  }

  return (
    <FormContext.Provider
      value={{
        form: state,
        error: (errorFetchEdited || errorSave) as Error,
        isPending: isPendingFetchEdited || isPendingSave,
        isError: isErrorFetchEdited || isErrorSave,
        onChangeForm: handleChangeForm
      }}
    >
      <form onSubmit={handleSubmit}>{children}</form>
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
