import { createFileRoute, Link, Navigate, redirect, useNavigate } from '@tanstack/react-router'
import FormField from '../../../components/ui/forms/FormField'
import Label from '../../../components/ui/forms/Label'
import Input from '../../../components/ui/forms/Input'
import Button from '../../../components/ui/forms/Button'
import MainPoints from '../../../components/ui/auth/MainPoints'
import { motion } from 'framer-motion'
import handleSignUp, { authResponse } from '../../../utils/auth/handleSignUp'
import { useState } from 'react'

export const Route = createFileRoute('/auth/signup/')({
  component: SignUp,
})

function SignUp() {

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      // Show a loading spinner
      setLoading(true);

      event.preventDefault()

      // Create a formData object
      const formData = new FormData(event.currentTarget);
      
      // Make a request to the backend
      const authResponse: authResponse = await handleSignUp(formData);

      console.log(authResponse.status);

      if (authResponse.status === "success") {
        // Redirect to the check email page (a page where the user is told to check their email)
        return navigate({ to: "/auth/check-email" });
      }

      // Show a failure toast
      setError(authResponse.data.message);
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false);
    }
  }

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
            Sign up
          </h2>
          <p className="text-sm text-gray-500 font-roboto font-light">
            Create an account to start chatting
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
          onSubmit={handleSubmit}
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
          <FormField>
            <Label htmlFor="username">Username</Label>
            <Input
              name="username"
              id="username"
              type="text"
              placeholder="Enter your username"
            />
          </FormField>
          <article className={` ${error ? "block bg-red-600 px-2 py-1" : "hidden"} mt-2 rounded-md text-white`}>
            <p>{error}</p>
          </article>
          <Button loading={loading} loadingText="Signing you up..">Sign up</Button>
          <article className="flex items-center gap-1 my-2 text-md text-gray-400 text-regular">
            Already have an account ? <Link className='text-purple-500 font-semibold' to="/auth/signin">Sign in</Link>
          </article>
        </motion.form>
      </article>

      <article className="bg-purple-600 px-20 text-center rounded-xl h-full md:w-1/2 flex flex-col justify-center items-center py-20">
        <MainPoints />
      </article>
    </section>
  )
}

