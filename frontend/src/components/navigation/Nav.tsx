import AppLogo from "/syllabusy-logo.png";

function Nav() {
    return (
        <div className="flex justify-around items-center p-2 w-screen text-md bg-[#090909] border-b-1 border-b-[#121212]">
            <div className="flex gap-2 items-center">
                <img className="w-5" src={AppLogo} />
                <h2 className="font-semibold cursor-default">Syllabusy</h2>
            </div>
            <div className="flex gap-4">
                <a className="hover:bg-[#151515] rounded-md p-1 px-2 cursor-pointer">
                    option1
                </a>
                <a className="hover:bg-[#151515] rounded-md p-1 px-2 cursor-pointer">
                    option2
                </a>
                <a className="hover:bg-[#151515] rounded-md p-1 px-2 cursor-pointer">
                    option3
                </a>
            </div>
        </div>
    );
}

export default Nav;
