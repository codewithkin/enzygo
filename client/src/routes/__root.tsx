import * as React from 'react'
import "../index.css";
import { Link, Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { AuthProvider } from '../context/AuthContext';

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <AuthProvider>
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
    </AuthProvider>
  )
}
