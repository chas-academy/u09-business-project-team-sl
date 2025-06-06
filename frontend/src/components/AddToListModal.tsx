import { useState, useEffect } from "react";
import type { FC } from "react";
import Button from "./Button";
import ListCard from "./ListCard";

type AddToListModalProps = {
  isOpen: boolean;
  onClose: () => void;
  lists: { id: string; title: string; description?: string }[];
  onSelectList?: (listId: string) => void;
  initialSelectedListId?: string;
};

const AddToListModal: FC<AddToListModalProps> = ({
  isOpen,
  onClose,
  lists,
  onSelectList,
  initialSelectedListId,
}) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setSelectedId(initialSelectedListId ?? null);
    }
  }, [isOpen, initialSelectedListId]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center px-4"
      aria-modal="true"
      role="dialog"
      aria-labelledby="modal-title"
    >
      <div className="bg-shade-700 p-6 sm:p-12 rounded-lg w-full max-w-[816px] mx-4 sm:mx-0 flex flex-col gap-4">
        <h2 id="modal-title" className="text-2xl text-shade-50 font-bold">
          Pick a list
        </h2>

        <div
          className="flex flex-col gap-2"
          role="listbox"
          aria-activedescendant={selectedId ?? undefined}
        >
          {lists.map((list) => (
            <ListCard
              key={list.id}
              id={list.id}
              title={list.title}
              description={list.description}
              selectable={true}
              selected={selectedId === list.id}
              onSelect={() => {
                setSelectedId(list.id);
                onSelectList?.(list.id);
              }}
            />
          ))}
        </div>

        <div className="flex gap-2 mt-4">
          <Button
            variant="primary"
            disabled={!selectedId}
            onClick={() => {
              if (selectedId) {
                onSelectList?.(selectedId);
                onClose();
              }
            }}
          >
            Add game to list
          </Button>
          <Button variant="destructive" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddToListModal;
