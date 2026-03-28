import * as React from 'react'
import {ReactNode, SyntheticEvent, useState} from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'

export interface TabItem {
  id: number
  label: string
  children?: ReactNode
}

interface Props {
  items: TabItem[]
}

export default function AppTabs({items}: Props) {
  const [value, setValue] = useState(0)

  const handleChange = (_event: SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Box sx={{width: '100%'}}>
      <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
        <Tabs
          value={value}
          onChange={handleChange}
        >
          {items.map((item) => (
            <Tab
              key={item.id}
              label={item.label}
              {...a11yProps(item.id)}
            />
          ))}
        </Tabs>
      </Box>
      {items.map((item) => (
        <CustomTabPanel
          key={item.id}
          value={value}
          index={item.id}
        >
          {item.children ?? item.label}
        </CustomTabPanel>
      ))}
    </Box>
  )
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function CustomTabPanel(props: TabPanelProps) {
  const {children, value, index, ...other} = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{p: 3}}>{children}</Box>}
    </div>
  )
}
