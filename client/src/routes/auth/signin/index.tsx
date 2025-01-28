import { createFileRoute, Link } from '@tanstack/react-router'
import FormField from '../../../components/ui/forms/FormField'
import Label from '../../../components/ui/forms/Label'
import Input from '../../../components/ui/forms/Input'
import Button from '../../../components/ui/forms/Button'
import MainPoints from '../../../components/ui/auth/MainPoints'
import { motion } from 'framer-motion'

export const Route = createFileRoute('/auth/signin/')({
  component: SignIn,
})

function SignIn() {
  return (
    <section className="md:h-screen md:px-10 py-4 flex flex-col md:flex-row gap-4 items-center">
      <article className="flex flex-col gap-8 justify-center md:h-full md:w-1/2 md:px-20 h-screen font-inter">
        {/* App icon and name */}
        <motion.article
          initial={{
            x: -100,
          }}
          animate={{
            x: 1,
          }}
          transition={{
            duration: 1,
          }}
          className="flex items-center"
        >
          <img src="/Icon.png" alt="Anzygo icon" className="w-8 h-8" />
          <h4 className="font-poppins font-semibold text-purple-600">Anzygo</h4>
        </motion.article>

        {/* Auth headings */}
        <motion.article
          initial={{
            y: 100,
          }}
          animate={{
            y: 1,
          }}
          transition={{
            duration: 1,
          }}
          className="flex flex-col"
        >
          <h2 className="font-bold text-purple-600 text-3xl font-inter">
            Sign in
          </h2>
          <p className="text-sm text-gray-500 font-roboto font-light">
            Sign in to continue chatting
          </p>
        </motion.article>

        {/* Auth form */}
        <motion.form
          initial={{
            y: 100,
          }}
          animate={{
            y: 1,
          }}
          transition={{
            duration: 1,
          }}
          className="flex flex-col gap-2"
          action=""
        >
          <FormField>
            <Label htmlFor="email">Email</Label>
            <Input
              name="email"
              id="email"
              type="email"
              placeholder="Enter your email"
            />
          </FormField>
          <Button loadingText="Signing you in..">Sign in</Button>
          <article className="flex items-center gap-1 my-2 text-md text-gray-400 text-regular">
            Don't have an account ? <Link className='text-purple-500 font-semibold' to="/auth/signup">Sign up</Link>
          </article>
        </motion.form>
      </article>

      <article className="bg-purple-600 px-20 text-center rounded-xl h-full md:w-1/2 flex flex-col justify-center items-center py-20">
        <MainPoints />
      </article>
    </section>
  )
}
