import { useState } from "react";
import type { FC } from "react";
import { Icon } from "@iconify/react";
import AddGameButton from "./addGameButton";
import AddToListModal from "./AddToListModal";
import { Link } from "react-router-dom";
import { apiFetch } from "../utils/api";

type GameCardProps = {
  variant: "game" | "list";
  rawgId: number;
  title: string;
  platforms: string[];
  image: string;
  onDelete?: () => void;
};

export const GameCard: FC<GameCardProps> = ({
  variant,
  rawgId,
  title,
  platforms,
  image,
  onDelete,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [lists, setLists] = useState<
    { id: string; title: string; description?: string }[]
  >([]);

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

  const token = localStorage.getItem("token");

  const handleSelectList = async (listId: string) => {
    try {
      const res = await apiFetch(`/lists/${listId}/add-game`, {
        method: "POST",
        body: JSON.stringify({ rawgId }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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

  const cardContent = (
    <div
      className="h-[300px] max-w-sm rounded-md overflow-hidden border border-transparent 
                 transition duration-200 flex flex-col w-full outline-1 outline-shade-500
                 hover:outline-2 hover:outline-shade-200"
    >
      <div
        className="w-full h-[150px] bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className="flex flex-col justify-between gap-6 bg-shade-900 p-3 flex-grow">
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-1 max-w-[85%]">
            <h2 className="text-base font-bold text-white line-clamp-2">
              {title}
            </h2>
            <p className="text-xs text-shade-200">{platforms.join(", ")}</p>
          </div>
          {variant === "list" && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete?.();
              }}
              className="text-white hover:text-red-400 transition self-start pt-1"
              aria-label="Delete game"
            >
              <Icon
                icon="akar-icons:cross"
                width="16"
                height="16"
                className="cursor-pointer"
              />
            </button>
          )}
        </div>
        {variant === "game" && (
          <div className="flex justify-between items-center">
            <div
              onClick={(e) => e.stopPropagation()}
              className="cursor-pointer"
            >
              <AddGameButton
                isAdded={isAdded}
                onClick={() => {
                  if (!isAdded) openModal();
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {variant === "game" || variant === "list" ? (
        <Link to={`/games/${rawgId}`} className="block w-full cursor-pointer">
          {cardContent}
        </Link>
      ) : (
        cardContent
      )}

      <AddToListModal
        isOpen={modalOpen}
        onClose={closeModal}
        lists={lists}
        onSelectList={handleSelectList}
      />
    </>
  );
};
