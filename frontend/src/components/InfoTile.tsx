interface InfoProps {
    header: string;
    description: string;
    image: React.ReactNode;
}

function InfoTile({ header, description, image }: InfoProps) {
    return (
        <div className="rounded-xl border-1 border-gray-500 p-4">
            <div className="flex gap-2">
                <h3 className="font-semibold text-lg">{header}</h3>
                {image}
            </div>
            <p className="text-md text-gray-500">{description}</p>
        </div>
    );
}

export default InfoTile;
