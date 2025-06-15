import { useEffect, useState } from "react";
import { GameCard } from "../components/GameCard";
import { apiFetch } from "../utils/api";
import Searchbar from "../components/Searchbar";
import { Icon } from "@iconify/react";

type Game = {
  rawgId: number;
  title: string;
  platforms: string[];
  image: string;
};

const PAGE_SIZE = 21;

const Home = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    setLoading(true);
    setError(null);

    apiFetch(`/games?page_size=${PAGE_SIZE}&page=${page}`)
      .then((res) => {
        if (!res.ok)
          throw new Error("Something went wrong when fetching games");
        return res.json();
      })
      .then((data) => {
        setGames(data.games);
        setTotalCount(data.totalCount);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [page]);

  const handleSearch = async (query: string) => {
    if (!query.trim()) return;
    setLoading(true);
    setError(null);

     try {
      const res = await apiFetch(`/games/search?search=${encodeURIComponent(query)}`);
      if (!res.ok) throw new Error("Search failed");
      const data = await res.json();
      setGames(data);
    } catch (err: any) {
      setError(err.message || "Search error");
    } finally {
      setLoading(false);
    }
  };

  const handleSuggest = async (query: string) => {
    if (!query.trim()) return;

    try {
      const res = await apiFetch(`/games/search?search=${encodeURIComponent(query)}`);
      if (!res.ok) return;
      const data: Game[] = await res.json();

      setSuggestions(data.map((g) => g.title));
      
    } catch (err) {
      setSuggestions([]);
    }
  };
  
    const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  return (
    <section className="pt-4 md:pt-10">
      <h2 className="text-2xl text-shade-50 font-bold">Games</h2>

      <div className="mb-6">
        <Searchbar 
        onSearch={handleSearch} 
        onSuggest={handleSuggest}
        suggestions={suggestions}
        />
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

      <div className="flex justify-center items-center gap-4 text-base text-shade-50">
        <Icon
          icon="ci:chevron-left"
          className={`size-5 ${
            page === 1
              ? "text-shade-200 cursor-default"
              : "hover:text-primary cursor-pointer active:text-primary"
          }`}
          onClick={page === 1 ? undefined : () => setPage(page - 1)}
        />
        <span>
          {page} of {totalPages}
        </span>
        <Icon
          icon="ci:chevron-right"
          className={`size-5 ${
            page === totalPages
              ? "text-shade-200 cursor-default"
              : "hover:text-primary cursor-pointer active:text-primary"
          }`}
          onClick={page === totalPages ? undefined : () => setPage(page + 1)}
        />
      </div>
     </>
    )}
    </section>
  );
};

export default Home;
