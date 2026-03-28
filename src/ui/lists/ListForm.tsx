import * as React from 'react'
import {ListCreateDTO} from '@/dto/lists/ListCreateDTO'
import {ListDTO} from '@/dto/lists/ListDTO'
import {ListService} from '@/services/ListService'
import {FormProvider} from '@/providers/FormProvider'
import {ROUTES_CONFIG} from '@/config/routes.config'
import {useRouter} from 'next/navigation'
import {Stack} from '@mui/material'
import ListFields from '@/ui/lists/ListFields'
import SaveButton from '@/components/buttons/SaveButton'
import Button from '@mui/material/Button'
import {API_CONFIG} from '@/config/api.config'

const defaultForm: ListCreateDTO = {
  name: '',
  private: false
}

interface Props {
  id?: string
}

export default function ListForm({id}: Props) {
  const router = useRouter()

  async function handleSave(dto: ListCreateDTO) {
    let entity: ListDTO
    if (id && !Array.isArray(id) && id !== 'new') {
      entity = await ListService.updateList(id, dto)
    } else {
      entity = await ListService.createList(dto)
    }
    return entity
  }

  function handleCancel() {
    router.push(`${ROUTES_CONFIG.lists}`)
  }

  return (
    <FormProvider<ListCreateDTO, ListDTO>
      id={id}
      entity={API_CONFIG.lists}
      defaultForm={defaultForm}
      onSave={handleSave}
    >
      <Stack
        direction="column"
        spacing={2}
      >
        <ListFields />
        <SaveButton edited={Boolean(id)} />
        <Button
          variant={'outlined'}
          onClick={handleCancel}
        >
          Cancel
        </Button>
      </Stack>
    </FormProvider>
  )
}
