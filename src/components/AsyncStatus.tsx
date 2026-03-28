'use client'

import {CSSProperties, ReactNode} from 'react'

interface AsyncStatusProps {
  children?: ReactNode
  isPending: boolean
  error: string | null
  pendingMessage?: string
  errorStyle?: CSSProperties
}

export default function AsyncStatus({
  isPending,
  error,
  pendingMessage = 'Loading...',
  errorStyle = {color: 'red'}
}: AsyncStatusProps) {
  if (!isPending && !error) return null

  if (isPending) {
    return <div>{pendingMessage}</div>
  }

  if (error) {
    return <div style={errorStyle}>{error}</div>
  }

  return null
}
