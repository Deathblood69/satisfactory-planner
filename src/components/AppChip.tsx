import Chip from '@mui/material/Chip'

interface Props {
  id: string
  label: string
  clickable?: boolean
  onClick?: (id: string) => void
}

export default function AppChip({id, label, clickable, onClick}: Props) {
  return (
    <Chip
      id={id}
      label={label}
      variant="outlined"
      clickable={clickable}
      onClick={() => onClick && onClick(id)}
    />
  )
}
