import * as React from 'react'
import "../index.css";
import { Link, Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { AuthProvider } from '../context/AuthContext';
import { Query } from '@tanstack/react-query';
import QueryProvider from '../context/QueryClientProvider';
import { Toaster } from 'sonner';

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <QueryProvider>
      <AuthProvider>
        <Outlet />
        <Toaster richColors expand />
        <TanStackRouterDevtools position="bottom-right" />
      </AuthProvider>
    </QueryProvider>
  )
}
