import UploadSection from "@/src/components/UploadSection";

export default function UploadPage() {
    return (
        <div className="flex flex-col gap-10 items-center mt-20 text-white min-h-screen">
            <div className="flex flex-col justify-center items-center gap-2">
                <h1 className="text-4xl font-bold">Upload your Syllabus</h1>
                <h3 className="text-2xl font-semibold text-gray-500">
                    Optionally, you can drag or drop files here
                </h3>
            </div>
            <UploadSection />
        </div>
    );
}
