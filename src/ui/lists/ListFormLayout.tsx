import {ReactNode} from 'react'
import {ListCreateDTO} from '@/dto/ListCreateDTO'
import {ListDTO} from '@/dto/ListDTO'
import {ListService} from '@/services/ListService'
import {FormProvider} from '@/providers/FormProvider'
import {ROUTES_CONFIG} from '@/config/routes.config'
import {useRouter} from 'next/navigation'
import Button from '@mui/material/Button'
import {Card, Stack} from '@mui/material'
import SaveButton from '@/components/SaveButton'

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
    if (id && !Array.isArray(id) && id !== 'new') {
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
    <Card>
      <FormProvider<ListCreateDTO, ListDTO>
        id={id}
        entity={'lists'}
        defaultForm={defaultForm}
        onSave={handleSave}
        onSuccess={handleSuccess}
      >
        <Stack
          direction="column"
          elevation={2}
          sx={{p: 2}}
          spacing={2}
          component={Card}
        >
          {children}
          <Stack
            direction="row"
            spacing={2}
            justifyContent={'center'}
          >
            <SaveButton edited={Boolean(id)} />
            <Button variant={'outlined'}>Cancel</Button>
          </Stack>
        </Stack>
      </FormProvider>
    </Card>
  )
}
