type characterResponse = {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    image: string;
}
export default async function CharacterPage({
                                                params
                                            }: {
    params: Promise<{ characterId: string }>
}) {
    const { characterId } = await params;
    const character = async () => {
        console.log("params", params);
        const res = await fetch(`https://rickandmortyapi.com/api/character/${characterId}`);
        return await res.json();
    }

    const characterResponse: characterResponse = await character();

    if (!characterResponse.name) {
        return <div className="flex flex-col items-center p-4">
            <h2 className="text-3xl font-bold mb-2">Character Not Found</h2>
        </div>;
    }

    return (
        <div className="flex flex-col items-center p-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={characterResponse.image} alt={characterResponse.name}
                 className="w-64 h-64 object-cover rounded-md mb-4"/>
            <h2 className="text-3xl font-bold mb-2">{characterResponse.name}</h2>
            <p className="text-gray-700 text-lg">Status: {characterResponse.status}</p>
            <p className="text-gray-700 text-lg">Species: {characterResponse.species}</p>
            <p className="text-gray-700 text-lg">Type: {characterResponse.type || "N/A"}</p>
        </div>
    );
}