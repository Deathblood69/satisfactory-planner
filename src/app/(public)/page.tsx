'use client'

import {redirect} from 'next/navigation'
import {ROUTES_CONFIG} from '@/config/routes.config'

export default function Page() {
  return redirect(ROUTES_CONFIG.lists)
}
