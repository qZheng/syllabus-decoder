import Image from "next/image";
import SpecialButton from "../../components/SpecialButton";
import InfoTile from "../../components/InfoTile";
import AccordionElement from "@/src/components/AccordionElement";

export default function HomePage() {
    return (
        <div className="flex flex-col items-center text-white min-h-screen">
            <div className="mt-20 bg-[#060606] shadow-md rounded-xl w-220 flex justify-center flex-col p-4">
                <h1 className="font-bold text-7xl">
                    The internet's easiest modern syllabus tool.
                </h1>
                <p className="text-2xl text-gray-500 mt-4">
                    Syllabusy is designed to be lazy. Using AI, we extract the
                    details from your syllabi so that{" "}
                    <span className="font-semibold">you don't have to.</span>
                </p>
                <div className="flex justify-center mt-10">
                    <SpecialButton text="Get started" />
                </div>
            </div>
            <p className="mt-15 text-xl text-gray-600">
                /this is a placeholder image for a preview gif or graphic/
            </p>
            <Image
                className="mt-15 rounded-ee-full"
                width={600}
                height={600}
                src="/main-graphic-white.png"
                alt="placeholder graphic"
            />
            <div className="flex gap-4 mt-20">
                <InfoTile
                    header="Upload"
                    image={
                        <Image
                            width={20}
                            height={20}
                            src="/green-upload.svg"
                            alt="upload icon"
                        />
                    }
                    description="Upload your syllabus to Syllabusy."
                />
                <div className="flex justify-center">
                    <Image
                        width={24}
                        height={24}
                        src="/arrow-right-white.svg"
                        alt="arrow pointing right"
                    />
                </div>
                <InfoTile
                    header="AI Extraction"
                    image={
                        <Image
                            width={20}
                            height={20}
                            src="/yellow-lightning.svg"
                            alt="lighting icon"
                        />
                    }
                    description="Let AI parse your document for you."
                />
                <div className="flex justify-center">
                    <Image
                        width={24}
                        height={24}
                        src="/arrow-right-white.svg"
                        alt="arrow pointing right"
                    />
                </div>
                <InfoTile
                    header="View Results"
                    image={
                        <Image
                            width={24}
                            height={24}
                            src="/purple-analytics.svg"
                            alt="analytics and data processing icon"
                        />
                    }
                    description="Collect your information. It's that simple."
                />
            </div>
            <div className="flex flex-col items-center gap-6 justify-center my-20">
                <h3 className="text-2xl font-semibold">
                    Frequently Asked Questions
                </h3>
                <AccordionElement />
            </div>
        </div>
    );
}
