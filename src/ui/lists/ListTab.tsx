import * as React from 'react'
import {ListCreateDTO} from '@/dto/lists/ListCreateDTO'
import {ListDTO} from '@/dto/lists/ListDTO'
import {ListService} from '@/services/ListService'
import {FormProvider} from '@/providers/FormProvider'
import {ROUTES_CONFIG} from '@/config/routes.config'
import {useRouter} from 'next/navigation'
import {Card, Stack} from '@mui/material'
import Typography from '@mui/material/Typography'
import {useQuery} from '@tanstack/react-query'
import getEntityById from '@/queries/getEntityById'
import ListFields from '@/ui/lists/form/ListFields'
import SaveButton from '@/components/SaveButton'
import Button from '@mui/material/Button'
import {API_CONFIG} from '@/config/api.config'

const defaultForm: ListCreateDTO = {
  name: '',
  private: false
}

interface Props {
  id?: string
}

export default function ListTab({id}: Props) {
  const router = useRouter()

  const {data: list} = useQuery({
    queryKey: [API_CONFIG.lists, id],
    queryFn: () => getEntityById<ListDTO>(API_CONFIG.lists, id),
    enabled: !!id
  })

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
    <Card>
      <FormProvider<ListCreateDTO, ListDTO>
        id={id}
        entity={API_CONFIG.lists}
        defaultForm={defaultForm}
        onSave={handleSave}
      >
        <Stack
          direction="column"
          elevation={2}
          sx={{p: 2}}
          spacing={2}
          component={Card}
        >
          <Stack
            direction={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}
          >
            <Typography
              variant="h5"
              gutterBottom
            >
              {list?.name}
            </Typography>
          </Stack>

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
    </Card>
  )
}
