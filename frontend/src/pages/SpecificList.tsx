import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GameCard } from "../components/GameCard";
import BackButton from "../components/backButton";
import Button from "../components/Button";

type Game = {
  rawgId: string;
  title: string;
  releaseDate: string;
  platforms: string[];
  image: string;
};

type ListData = {
  title: string;
  description?: string;
  games: Game[];
};

const SpecificList = () => {
  const { id } = useParams<{ id: string }>();
  const [list, setList] = useState<ListData | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchList = async () => {
    try {
      const res = await fetch(`/api/lists/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!res.ok) throw new Error("Kunde inte hämta listan.");

      const data = await res.json();
      setList(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, [id]);

  if (loading) return <p className="text-shade-50">Loading...</p>;

  if (!list) return <p className="text-shade-50">List not found</p>;

  return (
    <section className="mx-auto max-w-5xl flex flex-col gap-6 pt-12">
      <BackButton text={"My lists"} />
      <div className="flex flex-col bg-shade-900 p-4 rounded-lg gap-4">
        <div className="flex flex-col gap-1 break-words">
          <h1 className="text-2xl font-bold text-shade-50">{list.title}</h1>
          {list.description && (
            <p className="text-base text-shade-200">{list.description}</p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="text-lg text-shade-50 font-bold">Games</h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(225px,1fr))] gap-4">
            {list.games.map((game) => (
              <GameCard
                key={game.rawgId}
                variant="list"
                rawgId={parseInt(game.rawgId)}
                title={game.title}
                platforms={game.platforms}
                image={game.image}
                // Delete.tsx here
              />
            ))}
          </div>
        </div>
        <div className=" flex flex-row gap-2">
          <Button
            icon="ep:edit"
            onClick={() => navigate(`/lists/${id}/edit`)}
          >
            Edit list
          </Button>

          <Button
            variant="destructive"
            icon="weui:delete-filled"
            // add onClick
          >
            Delete
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SpecificList;
