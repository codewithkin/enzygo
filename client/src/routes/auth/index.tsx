import { createFileRoute } from '@tanstack/react-router'
import FormField from '../../components/ui/forms/FormField'
import Label from '../../components/ui/forms/Label'
import Input from '../../components/ui/forms/Input'

export const Route = createFileRoute('/auth/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <section className="flex flex-col md:flex-row gap-4 items-center">
      <article className="flex flex-col items-between">
        {/* App icon and name */}
        <article className="flex gap-2 items-center">
          <h4>Anzygo</h4>
        </article>

        {/* Auth headings */}
        <article className="flex flex-col">
          <h2 className='font-bold text-purple-700 text-2xl font-display'>Sign in</h2>
          <p className="text-gray-500">Sign in to continue chatting</p>
        </article>

        {/* Auth form */}
      </article>
      <article></article>
    </section>
  )
}
