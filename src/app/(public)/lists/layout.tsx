import {ReactNode} from 'react'
import ListLayout from '@/ui/lists/ListLayout'

interface Props {
  children: ReactNode
  toolbar: ReactNode
}

export default function Layout(props: Props) {
  return (
    <ListLayout>
      {props.toolbar}
      {props.children}
    </ListLayout>
  )
}
