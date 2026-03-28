import Button from '@mui/material/Button'

interface Props {
  edited: boolean
}

export default function SaveButton({edited}: Props) {
  return (
    <Button
      type={'submit'}
      variant={'contained'}
    >
      {edited ? 'Save' : 'Create'}
    </Button>
  )
}
