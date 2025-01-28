import { AnimatePresence, motion } from "framer-motion";

export default function MainPoint ({point}: {point: { title: string, description: string, image: string }}) {
    const {title, description, image} = point;

    return (
        <AnimatePresence 
            initial={false}
        >
            <motion.article 
            initial={{ x: -50 }}
            animate={{ x: 1 }}
            className="w-full h-full flex flex-col justify-center items-center">
                <img src={image} />
                <h3 className="text-xl font-semibold text-white font-inter">{title}</h3>
                <p className="font-roboto text-gray-300 font-light">{description}</p>
            </motion.article>
        </AnimatePresence>
    )
}