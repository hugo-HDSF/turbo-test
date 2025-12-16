import Link from "next/link";

type character = {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    image: string;
}

type charactersResponse = {
    info: {
        count: number;
        pages: number;
        next: string | null;
        prev: string | null;
    }
    results: character[];

}

export default async function charactersPage() {
    const characters = async () => {
        const res = await fetch("https://rickandmortyapi.com/api/character");
        return await res.json();
    }

    const charactersResponse: charactersResponse = await characters();
    console.log("data", charactersResponse);

    return (
        // use images and make a baisic grid layout
        <div
            className="flex gap-4 p-4 justify-center flex-wrap"
        >
            {charactersResponse.results.map((character) => {
                const isRickSanchez = character.name === "Rick Sanchez"
                return (

                    <Link
                        href={`/characters/${character.id}`}
                        key={character.id}
                        className={`${isRickSanchez ? "bg-red-500" : "bg-white"}  rounded-lg shadow-md p-4 w-1/4`}>
                        <img src={character.image} alt={character.name}
                             className="w-full h-48 object-cover rounded-md mb-4"/>
                        <h2 className="text-xl font-bold mb-2">{character.name}</h2>
                        <p className="text-gray-700">Status: {character.status}</p>
                        <p className="text-gray-700">Species: {character.species}</p>
                        <p className="text-gray-700">Type: {character.type || "N/A"}</p>
                    </Link>
                );
            })}
        </div>
    );
}