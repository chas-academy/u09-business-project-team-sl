import { useEffect, useState } from "react";
import { GameCard } from "../components/GameCard";
import { apiFetch } from "../utils/api";
import Searchbar from "../components/Searchbar";

type Game = {
  rawgId: number;
  title: string;
  platforms: string[];
  image: string;
};

const Home = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

useEffect(() => {
  apiFetch("/games?page_size=21")
    .then((res) => {
      if (!res.ok) throw new Error("Something went wrong when fetching games");
      return res.json();
    })
    .then((data: Game[]) => {
      setGames(data);
      setLoading(false);
    })
    .catch((err) => {
      setError(err.message);
      setLoading(false);
    });
}, []);

  const handleSearch = async (query: string) => {
    if (!query.trim()) return;


    setLoading(true);
    setError(null);

     try {
      const res = await apiFetch(`/rawg/search?search=${encodeURIComponent(query)}`);
      if (!res.ok) throw new Error("Search failed");
      const data = await res.json();
      setGames(data);
    } catch (err: any) {
      setError(err.message || "Search error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="pt-4 md:pt-10">
      <h2 className="text-2xl text-shade-50 font-bold">Games</h2>

      <div className="mb-6">
        <Searchbar onSearch={handleSearch} />
      </div>

      {loading && <p className="text-shade-50 pt-12">Loading...</p>}
      {error && <p className="text-red-500 pt-12">Error: {error}</p>}


      {!loading && !error && (
        <>
          {games.length === 0 ? (
            <p className="text-shade-50 pt-8">No results found.</p>
          ) : (

      <div className="grid grid-cols-[repeat(auto-fit,minmax(225px,1fr))] gap-4 p-4">
        {games.map((game) => (
          <GameCard
            key={game.rawgId}
            variant="game"
            rawgId={game.rawgId}
            title={game.title}
            platforms={game.platforms}
            image={game.image}
          />
        ))}
      </div>
    )}
  </>
  )}
    </section>
  );
};

export default Home;
