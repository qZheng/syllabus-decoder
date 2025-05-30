import "./App.css";
import Nav from "./components/navigation/Nav";
import SpecialButton from "./components/ui/SpecialButton";
import InfoTile from "./components/ui/InfoTile";
import Arrow from "./assets/arrow-right-white.svg";
import Upload from "./assets/green-upload.svg";
import Analytics from "./assets/purple-analytics.svg";
import Lightning from "./assets/yellow-lightning.svg";

function App() {
    return (
        <>
            <div className="flex flex-col items-center text-white h-screen">
                <Nav />
                <div className="mt-20 bg-[#060606] shadow-md rounded-xl w-220 flex justify-center flex-col p-4">
                    <h1 className="font-bold text-5xl">
                        The internet's easiest modern syllabus tool.
                    </h1>
                    <p className="text-2xl text-gray-500 mt-4">
                        Syllabusy is designed to be lazy. Using AI, we extract
                        the details from your syllabi so that{" "}
                        <span className="font-semibold">
                            you don't have to.
                        </span>
                    </p>
                    <div className="flex justify-center">
                        <SpecialButton />
                    </div>
                </div>

                <div className="flex gap-4 mt-20">
                    <InfoTile
                        header="Upload"
                        image={<img className="w-5" src={Upload}></img>}
                        description="Upload your syllabus to Syllabusy."
                    />
                    <div className="flex justify-center">
                        <img className="w-6" src={Arrow}></img>
                    </div>
                    <InfoTile
                        header="AI Extraction"
                        image={<img className="w-5" src={Lightning}></img>}
                        description="Let AI parse your document for you."
                    />
                    <div className="flex justify-center">
                        <img className="w-6" src={Arrow}></img>
                    </div>
                    <InfoTile
                        header="View Results"
                        image={<img className="w-6" src={Analytics}></img>}
                        description="Collect your information. It's that simple."
                    />
                </div>
            </div>
        </>
    );
}

export default App;
