export default function MainPoint ({point}: {point: { title: string, description: string }}) {
    const {title, description} = point;

    return (
        <article className="w-full h-full flex flex-col justify-center items-center">
            <h3 className="text-xl font-semibold text-white font-inter">{title}</h3>
            <p className="font-roboto text-gray-300 font-light">{description}</p>
        </article>
    )
}