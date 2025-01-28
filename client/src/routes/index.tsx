import { createFileRoute, Navigate } from '@tanstack/react-router'
import useAuth from '../hooks/useAuth'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  // Get the session data
  const session = useAuth();

  if(!session.token) {
    // Redirect to the auth page
    return <Navigate to="/auth/signin" />
  }

  // Redirect to the home page
  return <Navigate to="/home" />
}
