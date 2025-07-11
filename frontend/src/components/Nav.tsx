import Image from "next/image";
import Link from "next/link";

function Nav() {
    return (
        <nav className="relative text-white">
            <div className="flex justify-around items-center p-2 text-md bg-[#090909] border-b-1 border-b-[#121212]">
                <div className="flex gap-2 items-center">
                    <Image
                        width={20}
                        height={20}
                        src="/logo-icon.png"
                        alt="Syllabusy logo"
                    />
                    <h2 className="font-semibold cursor-default">Syllabusy</h2>
                </div>
                <div className="flex gap-4">
                    <Link
                        href={"/"}
                        className="hover:bg-[#151515] transition-colors duration-300 ease-in-out rounded-md p-1 px-2 cursor-pointer"
                    >
                        Home
                    </Link>
                    <Link
                        href={"/upload"}
                        className="hover:bg-[#151515] transition-colors duration-300 ease-in-out rounded-md p-1 px-2 cursor-pointer"
                    >
                        Upload
                    </Link>
                    <Link
                        href={"/dashboard"}
                        className="hover:bg-[#151515] transition-colors duration-300 ease-in-out rounded-md p-1 px-2 cursor-pointer"
                    >
                        Dashboard
                    </Link>
                </div>
            </div>
            <button className="absolute top-2 right-10 cursor-pointer text-md bg-[#101010] hover:bg-[#191919] transition-colors duration-500 ease-in-out shadow-md font-semibold rounded-lg text-white p-1 px-2 border-1 border-[#191919]">
                Log In
            </button>
        </nav>
    );
}

export default Nav;
