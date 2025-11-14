import { redirect } from 'next/navigation'

export default function AuthorsPage() {
  // Redirect to the dashboard
  redirect('/authors/dashboard')
}
