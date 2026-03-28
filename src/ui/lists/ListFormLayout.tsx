import {Fragment, ReactNode} from 'react'
import {ListCreateDTO} from '@/dto/ListCreateDTO'
import {ListDTO} from '@/dto/ListDTO'
import {ListService} from '@/services/ListService'
import {FormProvider} from '@/providers/FormProvider'
import {ROUTES_CONFIG} from '@/config/routes.config'
import {useRouter} from 'next/navigation'

const defaultForm: ListCreateDTO = {
  name: '',
  private: false
}

interface Props {
  id?: string
  children: ReactNode
}

export default function ListFormLayout({id, children}: Props) {
  const router = useRouter()

  async function handleSave(dto: ListCreateDTO) {
    let entity: ListDTO
    if (id && !Array.isArray(id)) {
      entity = await ListService.updateList(id, dto)
    } else {
      entity = await ListService.createList(dto)
    }
    return entity
  }

  function handleSuccess() {
    router.push(`${ROUTES_CONFIG.lists}`)
  }

  return (
    <Fragment>
      <FormProvider<ListCreateDTO, ListDTO>
        entity={'lists'}
        defaultForm={defaultForm}
        onSave={handleSave}
        onSuccess={handleSuccess}
      >
        {children}
      </FormProvider>
    </Fragment>
  )
}
