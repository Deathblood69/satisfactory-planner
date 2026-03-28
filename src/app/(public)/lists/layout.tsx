import {ReactNode} from 'react'
import ListPageLayout from '@/ui/lists/ListPageLayout'

interface Props {
  children: ReactNode
  toolbar: ReactNode
}

export default function Layout(props: Props) {
  return (
    <ListPageLayout>
      {props.toolbar}
      {props.children}
    </ListPageLayout>
  )
}
