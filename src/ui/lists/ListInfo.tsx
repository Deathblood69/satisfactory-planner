import {Card, Stack, TextField} from '@mui/material'
import getEntityByProperty from '@/queries/getEntityByProperty'
import {ListDTO} from '@/dto/ListDTO'
import {useQuery} from '@tanstack/react-query'
import AsyncStatus from '@/components/AsyncStatus'
import Typography from '@mui/material/Typography'

interface Props {
  id: string
}

export default function ListInfo({id}: Props) {
  const {
    data,
    isLoading: isPending,
    error
  } = useQuery({
    queryKey: ['lists', id],
    queryFn: () => getEntityByProperty<ListDTO>('lists', 'instance', id)
  })

  console.log(data)

  return (
    <AsyncStatus
      error={error ?? null}
      isPending={isPending}
    >
      <Stack
        elevation={2}
        sx={{p: 2}}
        spacing={2}
        component={Card}
      >
        <Typography variant="h5">{id}</Typography>
        <TextField label={'Name'} />
      </Stack>
    </AsyncStatus>
  )
}
