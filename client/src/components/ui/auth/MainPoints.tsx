import { useState } from "react"
import MainPoint from "./MainPoint"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface mainPoint {
    title: string,
    description: string,
    image: string
}

interface MainPointComponentProps {
    point: mainPoint
    index: number
    image: string
}

const mainPoints: mainPoint[] = [
    {
        title: "Unbreakable Encryption",
        description: "We use the latest encryption technology to ensure your messages are safe from prying eyes.",
        image: "/images/features/encryption.png"
    },
    {
        title: "Fast and Reliable",
        description: "Our servers are fast and reliable, your messages will always be delivered quickly without latency.",
        image: "/images/features/speed.png"
    },
    {
        title: "Local-first",
        description: "Your messages are stored locally on your device, meaning you can always access them even without an internet connection.",
        image: "/images/features/storage.png"
    },
    {
        title: "Community Driven",
        description: "Anzygo focuses on you, the community. We take your feedback seriously and are always looking to improve.",
        image: "/images/features/community.png"
    }
]

export default function MainPoints () {
    const [currentPoint, setCurrentPoint] = useState<number>(0);

    const points: number = mainPoints.length - 1;

    const showPreviousPoint = () => {
        if(currentPoint !== 0) {
            // Update the current point by 1
            setCurrentPoint((prev) => prev -= 1);
        } else return;
    }

    const showNextPoint = () => {
        if(currentPoint !== points) {
            // Update the current point by 1
            setCurrentPoint((prev) => prev += 1);
        }
    }

    console.log(points);

    return (
        <article className="grid gap-2">
            <MainPoint point={mainPoints[currentPoint]} />

            <article className="flex gap-2 justify-center items-center">
                <button onClick={showPreviousPoint}>
                    <ChevronLeft size={18} color="white" />
                </button>
                {
                    mainPoints.map((point: mainPoint, index: number) => {
                        return (
                            <article className={`${index === currentPoint ? "w-2 h-2 bg-white" : "w-1 h-1 bg-gray-200" } micro-interaction rounded-full `}></article>
                        )
                    })
                }
                <button onClick={showNextPoint}>
                    <ChevronRight  size={18} color="white" />
                </button>
            </article>
        </article>
    )
}