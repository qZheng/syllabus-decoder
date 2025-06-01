import Image from "next/image";
import FileInputButton from "@/src/components/FileInputButton";

export default function UploadPage() {
    // upload dropbox sizes
    const uploadBoxWidth = 512;
    const uploadBoxHeight = 256;
    const uploadIconWidth = uploadBoxWidth / 8;
    const uploadIconHeight = uploadBoxHeight / 4;

    return (
        <div className="flex flex-col gap-10 items-center mt-20 text-white min-h-screen">
            {/* some kinda title here or something */}
            <div className="flex flex-col justify-center items-center gap-2">
                <h1 className="text-4xl font-bold">Upload your Syllabus</h1>
                <h3 className="text-2xl font-semibold text-gray-500">
                    Optionally, you can drag or drop files here
                </h3>
            </div>
            {/* here we put the upload dropbox */}
            <div className="relative hover:bg-[#111111] transition-colors duration-500 rounded-3xl">
                <Image
                    className="rounded-3xl"
                    width={uploadBoxWidth}
                    height={uploadBoxHeight}
                    src="/upload-box.svg"
                    alt="drag and drop file here to upload"
                />
                <div className="absolute top-24 left-56">
                    <Image
                        width={uploadIconWidth}
                        height={uploadIconHeight}
                        src="/upload-white.svg"
                        alt="upload icon"
                    />
                </div>
            </div>
            <div className="flex gap-4">
                <FileInputButton />
            </div>
        </div>
    );
}
