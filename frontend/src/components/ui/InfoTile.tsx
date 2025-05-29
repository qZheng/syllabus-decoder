import react from "react";

interface InfoProps {
    header: string;
    description: string;
}

function InfoTile({ header, description }: InfoProps) {
    return (
        <div className="rounded-xl border-1 border-gray-500 p-4">
            <h3 className="font-semibold text-lg">{header}</h3>
            <p className="text-md text-gray-500">{description}</p>
        </div>
    );
}

export default InfoTile;
