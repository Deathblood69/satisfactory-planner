import * as React from 'react'
import {ReactNode} from 'react'
import {ListCreateDTO} from '@/dto/ListCreateDTO'
import {ListDTO} from '@/dto/ListDTO'
import {ListService} from '@/services/ListService'
import {FormProvider} from '@/providers/FormProvider'
import {ROUTES_CONFIG} from '@/config/routes.config'
import {usePathname, useRouter} from 'next/navigation'
import {Card, Stack} from '@mui/material'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import {Edit} from '@mui/icons-material'
import {useQuery} from '@tanstack/react-query'
import getEntityById from '@/queries/getEntityById'

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
  const pathname = usePathname()

  const {data: list} = useQuery({
    queryKey: ['lists', id],
    queryFn: () => getEntityById<ListDTO>('lists', id),
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

  function handleSuccess() {
    router.push(`${ROUTES_CONFIG.lists}`)
  }

  function handleEdit() {
    router.push(`${ROUTES_CONFIG.lists}/${id}`)
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
            {pathname !== `${ROUTES_CONFIG.lists}/${id}` && (
              <Tooltip title={'Edit'}>
                <IconButton>
                  <Edit onClick={handleEdit} />
                </IconButton>
              </Tooltip>
            )}
          </Stack>
          {children}
        </Stack>
      </FormProvider>
    </Card>
  )
}
