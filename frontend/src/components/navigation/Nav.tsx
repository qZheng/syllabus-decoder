import AppLogo from "/syllabusy-logo.png";

function Nav() {
    return (
        <div className="relative">
            <div className="flex justify-around items-center p-2 w-screen text-md bg-[#090909] border-b-1 border-b-[#121212]">
                <div className="flex gap-2 items-center">
                    <img className="w-5" src={AppLogo} />
                    <h2 className="font-semibold cursor-default">Syllabusy</h2>
                </div>
                <div className="flex gap-4">
                    <a className="hover:bg-[#151515] transition-colors duration-300 ease-in-out rounded-md p-1 px-2 cursor-pointer">
                        Home
                    </a>
                    <a className="hover:bg-[#151515] transition-colors duration-300 ease-in-out rounded-md p-1 px-2 cursor-pointer">
                        Upload
                    </a>
                    <a className="hover:bg-[#151515] transition-colors duration-300 ease-in-out rounded-md p-1 px-2 cursor-pointer">
                        Dashboard
                    </a>
                </div>
            </div>
            <button className="absolute top-2 right-10 cursor-pointer text-md bg-[#101010] hover:bg-[#131313] transition-colors duration-500 ease-in-out shadow-md font-semibold rounded-lg text-white p-1 px-2 border-1 border-[#191919]">
                Log In
            </button>
        </div>
    );
}

export default Nav;
