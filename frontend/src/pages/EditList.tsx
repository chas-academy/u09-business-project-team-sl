import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import BackButton from "../components/BackButton";
import InputField from "../components/InputField";
import Button from "../components/Button";

const EditList = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/lists";

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${import.meta.env.VITE_API_URL}/lists/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch list");
        }

        const data = await res.json();
        setTitle(data.title);
        setDescription(data.description);
      } catch (err: any) {
        setError(err.message);
      }
    })();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${import.meta.env.VITE_API_URL}/lists/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to update list");
      }

      navigate(from);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto max-w-4xl flex flex-col gap-6 pt-12">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <BackButton text="Previous page" />
          <h2 className="text-shade-50 text-2xl font-semibold">Edit list</h2>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 bg-shade-900 p-9 rounded-lg"
        >
          <InputField
            title="Title"
            placeholder=""
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <InputField
            variant="textarea"
            title="Description"
            placeholder=""
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          {error && <p className="text-sm text-red-500">{error}</p>}

          <div className="flex gap-4">
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save changes"}
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={() => navigate(from)}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditList;
