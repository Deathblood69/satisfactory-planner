'use client'

import {ListService} from '@/services/ListService'
import {ListCreateDTO} from '@/dto/ListCreateDTO'
import {IdService} from '@/services/IdService'
import {Fragment} from 'react'
import Button from '@mui/material/Button'
import {useRouter} from 'next/navigation'
import useForm from '@/hooks/useForm'
import {ListDTO} from '@/dto/ListDTO'
import {ROUTES_CONFIG} from '@/config/routes.config'
import AsyncStatus from '@/components/AsyncStatus'

export default function NewListPage() {
  const router = useRouter()

  const {error, isPending, onSubmit} = useForm<ListCreateDTO, ListDTO>({
    onCreate: ListService.createList,
    onSuccess: (data) => {
      router.push(`${ROUTES_CONFIG.lists}/${data.instance}`)
    }
  })

  function handleSubmit() {
    onSubmit({instance: IdService.generateId('v4')})
  }

  return (
    <Fragment>
      <AsyncStatus
        isPending={isPending}
        error={error}
        pendingMessage="Adding list..."
      />
      <Button
        variant="contained"
        onClick={handleSubmit}
        disabled={isPending}
      >
        Create new list
      </Button>
    </Fragment>
  )
}
