import Chip from '@mui/material/Chip'

interface Props {
  id: string
  label: string
  onClick?: (id: string) => void
}

export default function ClickableLinkChips({id, label, onClick}: Props) {
  return (
    <Chip
      id={id}
      label={label}
      variant="outlined"
      clickable
      onClick={() => onClick && onClick(id)}
    />
  )
}
