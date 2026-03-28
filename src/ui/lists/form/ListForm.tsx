import {Fragment, ReactNode} from 'react'
import SaveButton from '@/components/SaveButton'
import Button from '@mui/material/Button'
import {useRouter} from 'next/navigation'
import {ROUTES_CONFIG} from '@/config/routes.config'

interface Props {
  id: string
  children?: ReactNode
}

export default function ListForm({id, children}: Props) {
  const router = useRouter()

  return (
    <Fragment>
      {children}
      <SaveButton edited={Boolean(id)} />
      <Button
        variant={'outlined'}
        onClick={() => router.push(`${ROUTES_CONFIG.lists}`)}
      >
        Cancel
      </Button>
    </Fragment>
  )
}
