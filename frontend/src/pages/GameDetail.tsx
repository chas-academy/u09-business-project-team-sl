import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiFetch } from "../utils/api";
import AddGameButton from "../components/AddGameButton";
import AddToListModal from "../components/AddToListModal";
import BackButton from "../components/BackButton";

type GameDetailType = {
  rawgId: number;
  title: string;
  description: string;
  releaseDate: string;
  platforms: string[];
  image: string;
};

const GameDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [game, setGame] = useState<GameDetailType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [lists, setLists] = useState<
    { id: string; title: string; description?: string }[]
  >([]);

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const res = await apiFetch(`/games/${id}`);
        if (!res.ok) throw new Error("Failed to fetch game details");
        const data = await res.json();
        setGame(data);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchGame();
  }, [id]);

  const fetchLists = async () => {
    try {
      const res = await apiFetch("/lists", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!res.ok) throw new Error("Failed to fetch lists");
      const data = await res.json();
      const mappedLists = data
        .filter((list: any) => list?._id && list?.title)
        .map((list: any) => ({
          id: list._id,
          title: list.title,
          description: list.description,
        }));
      setLists(mappedLists);
    } catch (error) {
      console.error("Error fetching lists:", error);
    }
  };

  const openModal = () => {
    fetchLists();
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const handleSelectList = async (listId: string) => {
    if (!game) return;

    try {
      const res = await apiFetch(`/lists/${listId}/add-game`, {
        method: "POST",
        body: JSON.stringify({ rawgId: game.rawgId }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!res.ok) throw new Error("Failed to add game to list");

      setIsAdded(true);
    } catch (error) {
      console.error(error);
    } finally {
      closeModal();
    }
  };

  if (loading)
    return <p className="text-center mt-10 text-shade-50">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!game)
    return <p className="text-center mt-10 text-shade-50">Game not found</p>;

  return (
    <section className="max-w-4xl mx-auto pt-4 md:pt-10">
      <BackButton text={"Games"} />
      <div className=" bg-shade-900 rounded-lg p-6 text-shade-50">
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold">{game.title}</h2>
          <img
            src={game.image}
            alt={game.title}
            className="w-full object-cover outline-1 outline-shade-500"
          />
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <p className="text-sm">
                <span className="font-bold text-shade-50">Released:</span>{" "}
                <span className="text-shade-200">{game.releaseDate}</span>
              </p>
              <p className="text-sm">
                <span className="font-bold text-shade-50">Platforms:</span>{" "}
                <span className="text-shade-200">
                  {game.platforms.join(", ")}
                </span>
              </p>
            </div>
            <div className="flex flex-col gap-3 text-base text-shade-50">
              {game.description.split(". ").map((sentence, idx) => (
                <p key={idx}>
                  {sentence.trim() + (sentence.endsWith(".") ? "" : ".")}
                </p>
              ))}
            </div>
            <div>
              <AddGameButton
                isAdded={isAdded}
                onClick={() => {
                  if (!isAdded) openModal();
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <AddToListModal
        isOpen={modalOpen}
        onClose={closeModal}
        lists={lists}
        onSelectList={handleSelectList}
      />
    </section>
  );
};

export default GameDetail;
