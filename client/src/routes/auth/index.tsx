import { createFileRoute } from '@tanstack/react-router'
import FormField from '../../components/ui/forms/FormField'
import Label from '../../components/ui/forms/Label'
import Input from '../../components/ui/forms/Input'
import Button from '../../components/ui/forms/Button'
import MainPoints from '../../components/ui/auth/MainPoints'

export const Route = createFileRoute('/auth/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <section className="md:h-screen md:px-10 py-4 flex flex-col md:flex-row gap-4 items-center">
      <article className="flex flex-col gap-8 justify-center h-full md:w-1/2 md:px-20">
        {/* App icon and name */}
        <article className="flex gap-2 items-center">
          <h4 className='font-poppins font-semibold text-purple-600'>Anzygo</h4>
        </article>

        {/* Auth headings */}
        <article className="flex flex-col">
          <h2 className='font-bold text-purple-600 text-3xl font-inter'>Sign in</h2>
          <p className="text-sm text-gray-500 font-roboto font-light">Sign in to continue chatting</p>
        </article>

        {/* Auth form */}
        <form className='flex flex-col gap-2' action="">
          <FormField>
            <Label htmlFor="email">Email</Label>
            <Input name="email" id="email" type="email" placeholder="Enter your email" />
          </FormField>
          <Button loadingText="Signing you in..">Sign in</Button>
        </form>
      </article>
      <article className="bg-purple-600 px-20 text-center rounded-xl h-full md:w-1/2 flex flex-col justify-center items-center">
        <MainPoints />
      </article>
    </section>
  )
}
