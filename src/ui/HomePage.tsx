import {Box, Stack} from '@mui/material'
import {Fragment} from 'react'
import ThemeSwitch from '@/components/ThemeSwitch'
import {AppLinkInterface} from '@/types'
import AppLink from '@/components/AppLink'
import {Add} from '@mui/icons-material'
import {ROUTES_CONFIG} from '@/config/routes.config'

const links: AppLinkInterface[] = [
  {label: 'New Game', url: `${ROUTES_CONFIG.lists}`, icon: <Add />}
]

export default function HomePage() {
  return (
    <Fragment>
      <Stack spacing={2}>
        <ThemeSwitch />
        <Box>
          {links.map((link) => (
            <AppLink
              key={link.url}
              label={link.label}
              url={link.url}
            />
          ))}
        </Box>
      </Stack>
    </Fragment>
  )
}
