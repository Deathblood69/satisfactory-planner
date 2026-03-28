import {ReactNode} from 'react'
import ListPageLayout from '@/ui/lists/ListPageLayout'

interface Props {
  children: ReactNode
  new: ReactNode
}

export default function Layout(props: Props) {
  return (
    <ListPageLayout>
      {props.new}
      {props.children}
    </ListPageLayout>
  )
}
