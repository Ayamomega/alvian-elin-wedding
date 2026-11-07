
"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

type Wish = {
  id: string;
  name: string;
  message: string;
};

type GuestbookProps = {
  guestName: string;
};

const Guestbook = ({ guestName }: GuestbookProps) => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  useEffect(() => {
  if (guestName) {
    setName(guestName);
  }
}, [guestName]);

  // Mengambil ucapan dari Supabase saat halaman dibuka
  useEffect(() => {
    const fetchWishes = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("guestbook")
        .select("id, guest_name, message")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Failed to load guestbook:", error);
        setErrorMessage("Unable to load wishes. Please refresh the page.");
      } else {
        setWishes(
          (data || []).map((wish) => ({
            id: wish.id,
            name: wish.guest_name,
            message: wish.message,
          }))
        );
      }

      setLoading(false);
    };

    fetchWishes();
  }, []);

  // Mengirim ucapan ke Supabase
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name.trim() || !message.trim()) return;

    setSending(true);
    setErrorMessage("");
    setSuccessMessage("");

    const { error } = await supabase.from("guestbook").insert({
      guest_name: name.trim(),
      message: message.trim(),
    });

    setSending(false);

    if (error) {
  console.log("Guestbook error message:", error.message);
  console.log("Guestbook error details:", error.details);
  console.log("Guestbook error code:", error.code);

  setErrorMessage(
    error.message || "Unknown error. Please check Supabase."
  );
  return;
}

    const newWish: Wish = {
      id: crypto.randomUUID(),
      name: name.trim(),
      message: message.trim(),
    };

    setWishes((current) => [newWish, ...current]);
    setName("");
    setMessage("");
    setSuccessMessage("Thank you for your beautiful wishes!");
  };

  return (
    <section className="w-full max-w-2xl mx-auto py-20 px-5 text-center">
      
      <p className="text-sm tracking-[0.35em] uppercase text-amber-800 mb-3">
        Words of Love
      </p>

      <h2 className="text-3xl md:text-4xl font-serif text-gray-900 mb-4">
        Digital Guestbook
      </h2>

      <p className="text-gray-700 mb-10">
        Leave your warm wishes and blessings for our new journey.
      </p>

      <form
        onSubmit={handleSubmit}
        className="text-left border border-amber-200 rounded-2xl p-6 md:p-8 space-y-5"
      >
        <div>
          <label className="block text-sm font-medium text-gray-800 mb-2">
            Your Name
          </label>

         <input
  type="text"
  value={guestName || name}
  onChange={(e) => setName(e.target.value)}
  placeholder="Enter your name"
  readOnly={!!guestName}
  required
  className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 bg-transparent outline-none focus:border-amber-600"
/>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-800 mb-2">
            Your Wishes
          </label>

          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your wishes for the couple..."
            rows={4}
            required
            className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 bg-transparent outline-none focus:border-amber-600"
          />
        </div>

        {errorMessage && (
          <p className="text-red-600 text-sm">{errorMessage}</p>
        )}

        {successMessage && (
          <p className="text-green-700 text-sm text-center">
            {successMessage}
          </p>
        )}

        <button
          type="submit"
          disabled={sending}
          className="w-full bg-amber-800 hover:bg-amber-900 disabled:opacity-50 text-white py-3 rounded-lg tracking-widest uppercase text-sm transition"
        >
          {sending ? "Sending..." : "Send Wishes"}
        </button>
      </form>

      <div className="mt-14">
        <h3 className="text-2xl font-serif text-gray-900 mb-8">
          Wishes From Our Loved Ones
        </h3>

        {loading ? (
          <p className="text-gray-500 italic">Loading wishes...</p>
        ) : wishes.length === 0 ? (
          <p className="text-gray-500 italic">
            Be the first to leave a wish.
          </p>
        ) : (
          <div className="space-y-4 text-left">
            {wishes.map((wish) => (
              <div
                key={wish.id}
                className="border border-amber-200 rounded-xl p-5"
              >
                <p className="text-gray-800 leading-relaxed">
                  "{wish.message}"
                </p>

                <p className="text-amber-800 font-semibold mt-4 text-sm">
                  — {wish.name}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Guestbook;
