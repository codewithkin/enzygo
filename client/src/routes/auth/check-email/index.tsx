import {
  createFileRoute,
  Link,
  Navigate,
  redirect,
  useNavigate,
} from '@tanstack/react-router'
import FormField from '../../../components/ui/forms/FormField'
import Label from '../../../components/ui/forms/Label'
import Input from '../../../components/ui/forms/Input'
import Button from '../../../components/ui/forms/Button'
import MainPoints from '../../../components/ui/auth/MainPoints'
import { motion } from 'framer-motion'

export const Route = createFileRoute('/auth/check-email/')({
  component: SignUp,
})

function SignUp() {

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

        <article>
          {/* Heading */}
          <h2 className="text-2xl font-semibold text-purple-600">Success !</h2>
          <p className='font-inter font-light text-md text-gray-400'>Please check your email for a verification link. <span>Remember to open the spam folder</span></p>
        </article>
      </article>

      <article className="bg-purple-600 px-20 text-center rounded-xl h-full md:w-1/2 flex flex-col justify-center items-center py-20">
        <MainPoints />
      </article>
    </section>
  )
}
