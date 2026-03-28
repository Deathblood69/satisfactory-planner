import * as React from 'react'
import {ListCreateDTO} from '@/dto/lists/ListCreateDTO'
import {ListDTO} from '@/dto/lists/ListDTO'
import {ListService} from '@/services/ListService'
import {FormProvider} from '@/providers/FormProvider'
import {Stack} from '@mui/material'
import ListFields from '@/ui/lists/ListFields'
import {API_CONFIG} from '@/config/api.config'
import AppButton from '@/components/AppButton'
import {Add, Clear, Save} from '@mui/icons-material'

const defaultForm: ListCreateDTO = {
  name: '',
  private: false
}

interface Props {
  id?: string
}

export default function ListForm({id}: Props) {
  async function handleSave(dto: ListCreateDTO) {
    let entity: ListDTO
    if (id && !Array.isArray(id) && id !== 'new') {
      entity = await ListService.updateList(id, dto)
    } else {
      entity = await ListService.createList(dto)
    }
    return entity
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
        sx={{width: '100%'}}
      >
        <ListFields />
        <Stack
          direction={'row'}
          spacing={2}
        >
          <AppButton
            type={'submit'}
            fullWidth={true}
          >
            {Boolean(id) ? <Save /> : <Add />}
          </AppButton>
          <AppButton
            type={'reset'}
            fullWidth={true}
          >
            <Clear />
          </AppButton>
        </Stack>
      </Stack>
    </FormProvider>
  )
}
