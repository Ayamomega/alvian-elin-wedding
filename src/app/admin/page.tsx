
"use client";

import { useEffect, useState, type FormEvent } from "react";
import { supabase } from "../../lib/supabase";

type RSVPRecord = {
  id: string;
  guest_name: string;
  attendance: "attending" | "not_attending";
  guest_count: number;
  invited_guest_id: string | null;
  created_at: string;
};

type GuestbookRecord = {
  id: string;
  guest_name: string;
  message: string;
  created_at: string;
};
type InvitedGuest = {
  id: string;
  guest_name: string;
  phone_number: string | null;
  max_guests: number;
  invitation_code: string;
  created_at: string;
};

export default function AdminDashboard() {
  const [session, setSession] = useState<any>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [activeTab, setActiveTab] = useState("Overview");
  const [guestStatusFilter, setGuestStatusFilter] = useState("All");
  const [rsvps, setRsvps] = useState<RSVPRecord[]>([]);
  const [wishes, setWishes] = useState<GuestbookRecord[]>([]);
  const [invitedGuests, setInvitedGuests] = useState<InvitedGuest[]>([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [guestName, setGuestName] = useState("");
const [guestPhone, setGuestPhone] = useState("");
const [maxGuests, setMaxGuests] = useState("1");
const [savingGuest, setSavingGuest] = useState(false);
const [searchGuest, setSearchGuest] = useState("");
const [editingGuestId, setEditingGuestId] = useState<string | null>(null);
const [updatingGuest, setUpdatingGuest] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setCheckingAuth(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setCheckingAuth(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session?.user) return;

    const fetchData = async () => {
      setDataLoading(true);
      setErrorMessage("");

      const [rsvpResult, guestbookResult, invitedResult] = await Promise.all([
  supabase
    .from("rsvps")
    .select("id, guest_name, attendance, guest_count, invited_guest_id, created_at")
    .order("created_at", { ascending: false }),

  supabase
    .from("guestbook")
    .select("id, guest_name, message, created_at")
    .order("created_at", { ascending: false }),

  supabase
   .from("invited_guests")
.select("id, guest_name, phone_number, max_guests, invitation_code, created_at")
    .order("created_at", { ascending: false }),
]);

if (rsvpResult.error) {
  console.error(rsvpResult.error);
  setErrorMessage("Unable to load RSVP data.");
} else {
  setRsvps(rsvpResult.data || []);
}

if (guestbookResult.error) {
  console.error(guestbookResult.error);
  setErrorMessage("Unable to load guestbook data.");
} else {
  setWishes(guestbookResult.data || []);
  
}

if (invitedResult.error) {
  console.error(invitedResult.error);
  setErrorMessage("Unable to load invitation list.");
} else {
  setInvitedGuests(invitedResult.data || []);
}

setDataLoading(false);
    };

    fetchData();
  }, [session]);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoginLoading(true);
    setErrorMessage("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoginLoading(false);

    if (error) {
      setErrorMessage("Invalid email or password. Please try again.");
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setRsvps([]);
    setWishes([]);
    setInvitedGuests([]);
  };
  const handleAddGuest = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (!guestName.trim()) return;

  setSavingGuest(true);
  setErrorMessage("");

  const { data, error } = await supabase
    .from("invited_guests")
    .insert({
      guest_name: guestName.trim(),
      phone_number: guestPhone.trim() || null,
      max_guests: Number(maxGuests),
    })
    .select("id, guest_name, phone_number, max_guests, invitation_code, created_at")
    .single();

  setSavingGuest(false);

  if (error) {
    console.error(error);
    setErrorMessage("Unable to add guest. Please try again.");
    return;
  }

   setInvitedGuests((current) => [data, ...current]);
  setGuestName("");
  setGuestPhone("");
  setMaxGuests("1");
};

const handleUpdateGuest = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (!editingGuestId || !guestName.trim()) return;

  setUpdatingGuest(true);
  setErrorMessage("");

  const { error } = await supabase
    .from("invited_guests")
    .update({
      guest_name: guestName.trim(),
      phone_number: guestPhone.trim() || null,
      max_guests: Number(maxGuests),
    })
    .eq("id", editingGuestId);

  setUpdatingGuest(false);

  if (error) {
    console.error(error);
    setErrorMessage("Unable to update guest. Please try again.");
    return;
  }

  setInvitedGuests((current) =>
    current.map((guest) =>
      guest.id === editingGuestId
        ? {
            ...guest,
            guest_name: guestName.trim(),
            phone_number: guestPhone.trim() || null,
            max_guests: Number(maxGuests),
          }
        : guest
    )
  );

  setEditingGuestId(null);
  setGuestName("");
  setGuestPhone("");
  setMaxGuests("1");
};

const handleDeleteGuest = async (guestId: string) => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this invited guest?"
  );

  if (!confirmed) return;

  setErrorMessage("");

  const { error } = await supabase
    .from("invited_guests")
    .delete()
    .eq("id", guestId);

  if (error) {
    console.error(error);
    setErrorMessage("Unable to delete guest. Please try again.");
    return;
  }

  setInvitedGuests((current) =>
    current.filter((guest) => guest.id !== guestId)
  );

  if (editingGuestId === guestId) {
    setEditingGuestId(null);
    setGuestName("");
    setGuestPhone("");
    setMaxGuests("1");
  }
};
const handleCopyInvitationLink = async (invitationCode: string) => {
  const invitationLink = `${window.location.origin}/?to=${invitationCode}`;

  try {
    await navigator.clipboard.writeText(invitationLink);
    alert("Invitation link copied successfully!");
  } catch (error) {
    console.error("Failed to copy invitation link:", error);
    alert("Unable to copy invitation link.");
  }
};

  const attending = rsvps.filter(
    (guest) => guest.attendance === "attending"
  );

  const notAttending = rsvps.filter(
    (guest) => guest.attendance === "not_attending"
  );
const filteredInvitedGuests = invitedGuests.filter((guest) => {
  const search = searchGuest.toLowerCase();

  return (
    guest.guest_name.toLowerCase().includes(search) ||
    (guest.phone_number || "").toLowerCase().includes(search)
  );
});
const getInvitationStatus = (guestId: string) => {
  const response = rsvps.find(
    (rsvp) => rsvp.invited_guest_id === guestId
  );

  if (!response) {
    return {
      label: "Pending",
      className: "bg-amber-100 text-amber-700",
    };
  }

  if (response.attendance === "attending") {
    return {
      label: "Confirmed",
      className: "bg-green-100 text-green-700",
    };
  }

  return {
    label: "Declined",
    className: "bg-red-100 text-red-700",
  };
};
const filteredGuestList = invitedGuests.filter((guest) => {
  if (guestStatusFilter === "All") return true;

  return getInvitationStatus(guest.id).label === guestStatusFilter;
});
  const totalPax = attending.reduce(
    (total, guest) => total + guest.guest_count,
    0
  );

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  const statusLabel = (status: string) =>
    status === "attending" ? "Attending" : "Not Attending";

  if (checkingAuth) {
    return (
      <main className="min-h-screen bg-[#F5F0E8] flex items-center justify-center text-[#806B4D]">
        Checking admin access...
      </main>
    );
  }
const handleWhatsAppInvitation = (guest: InvitedGuest) => {
  if (!guest.phone_number) {
    alert("This guest does not have a phone number.");
    return;
  }

  const phone = guest.phone_number
    .replace(/\D/g, "")
    .replace(/^0/, "62");

  const invitationLink = `${window.location.origin}/?to=${guest.invitation_code}`;

  const message = `Halo ${guest.guest_name},

Dengan penuh sukacita, kami ingin mengundang Anda untuk hadir di hari bahagia kami.

Kami telah menyiapkan undangan personal khusus untuk Anda. Silakan buka link berikut untuk melihat detail undangan:

${invitationLink}

Merupakan kebahagiaan bagi kami apabila Anda dapat hadir.

Warm regards,
Alviyan & Elin`;

  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  window.open(whatsappUrl, "_blank");
};
  if (!session) {
    return (
      <main className="min-h-screen bg-[#F5F0E8] flex items-center justify-center p-5">
        <div className="bg-white/80 border border-[#E3D7C3] p-8 w-full max-w-md">
          <p className="text-xs tracking-[0.3em] uppercase text-[#9B8058]">
            Vielin Wedding Platform
          </p>

          <h1 className="font-serif text-4xl text-[#756044] mt-3 mb-2">
            Admin Login
          </h1>

          <p className="text-sm text-[#9B8058] mb-8">
            Alviyan & Elin Wedding
          </p>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm text-[#806B4D] mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
               className="w-full border border-[#D8C8AD] bg-white px-4 py-3 text-[#756044] placeholder:text-[#B19B78] outline-none focus:border-[#9B8058]"
                placeholder="Admin email"
              />
            </div>

            <div>
              <label className="block text-sm text-[#806B4D] mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border border-[#D8C8AD] bg-white px-4 py-3 text-[#756044] placeholder:text-[#B19B78] outline-none focus:border-[#9B8058]"
                placeholder="Admin password"
              />
            </div>

            {errorMessage && (
              <p className="text-sm text-red-600">{errorMessage}</p>
            )}

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full bg-[#806B4D] text-white py-3 text-sm tracking-widest uppercase hover:bg-[#6D5A40] disabled:opacity-50"
            >
              {loginLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="text-center text-xs text-[#B19B78] mt-8">
            VIELIN DIGITAL WEDDING PLATFORM
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F5F0E8] p-5 md:p-10">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-[#9B8058]">
              Vielin Wedding Platform
            </p>

            <h1 className="font-serif text-4xl text-[#756044] mt-2">
              Admin Dashboard
            </h1>

            <p className="text-sm text-[#8C785A] mt-2">
              Alviyan & Elin Wedding
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="border border-[#C5AC83] px-5 py-3 text-sm text-[#806B4D]">
              Wedding Day · 21 October 2028
            </div>

            <button
              onClick={handleLogout}
              className="border border-[#C5AC83] px-4 py-3 text-sm text-[#806B4D] hover:bg-white"
            >
              Logout
            </button>
          </div>
        </header>

        <nav className="flex gap-3 border-b border-[#D8C8AD] mb-8 overflow-x-auto">
          {["Overview", "Invitation List", "Guest List", "Guestbook"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-3 text-sm whitespace-nowrap transition ${
                activeTab === tab
                  ? "border-b-2 border-[#9B8058] text-[#756044]"
                  : "text-[#B19B78]"
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>

        {errorMessage && (
          <p className="text-sm text-red-600 mb-5">{errorMessage}</p>
        )}

        {dataLoading ? (
          <p className="text-sm text-[#806B4D] py-10">
            Loading wedding data...
          </p>
        ) : (
          <>
            {activeTab === "Overview" && (
              <>
                <h2 className="font-serif text-2xl text-[#756044] mb-5">
                  Wedding Overview
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  {[
                    { label: "Total Responses", value: rsvps.length },
                    { label: "Attending", value: attending.length },
                    { label: "Not Attending", value: notAttending.length },
                    { label: "Total Pax", value: totalPax },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="bg-white/70 border border-[#E3D7C3] p-5"
                    >
                      <p className="text-xs text-[#9B8058]">
                        {item.label}
                      </p>
                      <p className="font-serif text-4xl text-[#756044] mt-3">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="bg-[#806B4D] text-white p-7 mb-8">
                  <p className="text-xs tracking-[0.3em] uppercase opacity-70">
                    Confirmed Guests
                  </p>
                  <p className="font-serif text-5xl mt-3">{totalPax}</p>
                  <p className="text-sm opacity-70 mt-2">
                    Total confirmed attendees (Pax)
                  </p>
                </div>

                <div className="bg-white/70 border border-[#E3D7C3] p-6">
                  <h3 className="font-serif text-xl text-[#756044] mb-5">
                    Recent Guest Responses
                  </h3>

                  {rsvps.slice(0, 5).map((guest) => (
                    <div
                      key={guest.id}
                      className="flex justify-between items-center py-4 border-b border-[#EEE5D8] last:border-0 gap-3"
                    >
                      <div>
                        <p className="text-sm text-[#756044]">
                          {guest.guest_name}
                        </p>
                        <p className="text-xs text-[#B19B78] mt-1">
                          {guest.guest_count} Guest(s) · {formatDate(guest.created_at)}
                        </p>
                      </div>

                      <span className="text-xs text-[#806B4D]">
                        {statusLabel(guest.attendance)}
                      </span>
                    </div>
                  ))}

                  {rsvps.length === 0 && (
                    <p className="text-sm text-[#9B8058]">
                      No RSVP responses yet.
                    </p>
                  )}
                </div>
              </>
            )}
{activeTab === "Invitation List" && (
  <div className="space-y-6">
    <div className="bg-white/70 border border-[#E3D7C3] p-6">
      <h2 className="font-serif text-2xl text-[#756044] mb-5">
        {editingGuestId ? "Edit Invited Guest" : "Add Invited Guest"}
      </h2>

      <form
  onSubmit={editingGuestId ? handleUpdateGuest : handleAddGuest}
  className="space-y-4"
>
        <div>
          <label className="block text-sm text-[#806B4D] mb-2">
            Guest Name
          </label>
          <input
            type="text"
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            required
            placeholder="Enter guest name"
            className="w-full border border-[#D8C8AD] bg-white px-4 py-3 text-[#756044] outline-none"
          />
        </div>

        <div>
          <label className="block text-sm text-[#806B4D] mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            value={guestPhone}
            onChange={(e) => setGuestPhone(e.target.value)}
            placeholder="08xxxxxxxxxx"
            className="w-full border border-[#D8C8AD] bg-white px-4 py-3 text-[#756044] outline-none"
          />
        </div>

        <div>
          <label className="block text-sm text-[#806B4D] mb-2">
            Maximum Guests
          </label>
          <select
            value={maxGuests}
            onChange={(e) => setMaxGuests(e.target.value)}
            className="w-full border border-[#D8C8AD] bg-white px-4 py-3 text-[#756044] outline-none"
          >
            {[1, 2, 3, 4].map((number) => (
              <option key={number} value={number}>
                {number} Guest(s)
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={savingGuest || updatingGuest}
          className="bg-[#806B4D] text-white px-6 py-3 text-sm tracking-widest uppercase hover:bg-[#6D5A40] disabled:opacity-50"
        >
          {editingGuestId
  ? updatingGuest
    ? "Updating..."
    : "Update Guest"
  : savingGuest
    ? "Saving..."
    : "Add Guest"}
        </button>
      </form>
    </div>

    <div className="bg-white/70 border border-[#E3D7C3] p-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-5">
  <h2 className="font-serif text-2xl text-[#756044]">
    Invitation Records
  </h2>

  <span className="text-sm text-[#9B8058]">
    {filteredInvitedGuests.length} / {invitedGuests.length} Guests
  </span>
</div>

<input
  type="text"
  value={searchGuest}
  onChange={(e) => setSearchGuest(e.target.value)}
  placeholder="Search guest name or phone number..."
  className="w-full border border-[#D8C8AD] bg-white px-4 py-3 text-[#756044] outline-none mb-5"
/>

      {filteredInvitedGuests.map((guest) => (
        <div
          key={guest.id}
          className="flex justify-between items-center py-4 border-b border-[#EEE5D8] last:border-0 gap-3"
        >
         <div>
  <p className="text-sm text-[#756044] font-medium">
    {guest.guest_name}
  </p>
  <p className="text-xs text-[#B19B78] mt-1">
    {guest.phone_number || "No phone number"} · Max {guest.max_guests} Guest(s)
  </p>
  <span
  className={`inline-block mt-2 px-3 py-1 text-xs rounded-full ${
    getInvitationStatus(guest.id).className
  }`}
>
  {getInvitationStatus(guest.id).label}
</span>
</div>

<div className="flex gap-2">
  <button
    type="button"
    onClick={() => {
      setEditingGuestId(guest.id);
      setGuestName(guest.guest_name);
      setGuestPhone(guest.phone_number || "");
      setMaxGuests(String(guest.max_guests));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }}
    className="border border-[#C5AC83] px-4 py-2 text-xs text-[#806B4D] hover:bg-[#F5F0E8]"
  >
    Edit
  </button>
  <button
    type="button"
    onClick={() => handleCopyInvitationLink(guest.invitation_code)}
    className="border border-[#C5AC83] px-4 py-2 text-xs text-[#806B4D] hover:bg-[#F5F0E8]"
  >
    COPY LINK
  </button>
  <button
  type="button"
  onClick={() => handleWhatsAppInvitation(guest)}
  disabled={!guest.phone_number}
  className="border border-green-300 px-4 py-2 text-xs text-green-700 hover:bg-green-50 disabled:opacity-40"
>
  WHATSAPP
</button>
  <button
    type="button"
    onClick={() => handleDeleteGuest(guest.id)}
    className="border border-red-300 px-4 py-2 text-xs text-red-600 hover:bg-red-50"
  >
    DELETE
  </button>
</div>
        </div>
      ))}

      {invitedGuests.length === 0 && (
        <p className="text-sm text-[#9B8058]">
          No invited guests added yet.
        </p>
      )}
    </div>
  </div>
)}
           {activeTab === "Guest List" && (
  <div className="bg-white/70 border border-[#E3D7C3] p-6">
    <div className="flex justify-between items-center mb-5">
      <h2 className="font-serif text-2xl text-[#756044]">
        Guest List
      </h2>

      <span className="text-sm text-[#9B8058]">
        {invitedGuests.length} Invited Guests
      </span>
    </div>

    <div className="grid grid-cols-3 gap-3 mb-6">
      <div className="bg-amber-50 p-4">
        <p className="text-xs text-amber-700">Pending</p>
        <p className="text-2xl text-amber-800">
          {invitedGuests.filter(
            (guest) => getInvitationStatus(guest.id).label === "Pending"
          ).length}
        </p>
      </div>

      <div className="bg-green-50 p-4">
        <p className="text-xs text-green-700">Confirmed</p>
        <p className="text-2xl text-green-800">
          {invitedGuests.filter(
            (guest) => getInvitationStatus(guest.id).label === "Confirmed"
          ).length}
        </p>
      </div>

      <div className="bg-red-50 p-4">
        <p className="text-xs text-red-700">Declined</p>
        <p className="text-2xl text-red-800">
          {invitedGuests.filter(
            (guest) => getInvitationStatus(guest.id).label === "Declined"
          ).length}
        </p>
      </div>
    </div>
    <div className="flex flex-wrap gap-2 mb-6">
      {["All", "Pending", "Confirmed", "Declined"].map((status) => (
        <button
          key={status}
          type="button"
          onClick={() => setGuestStatusFilter(status)}
          className={`px-4 py-2 text-xs border transition ${
            guestStatusFilter === status
              ? "bg-[#806B4D] text-white border-[#806B4D]"
              : "bg-white text-[#806B4D] border-[#C5AC83] hover:bg-[#F5F0E8]"
          }`}
        >
          {status}
        </button>
      ))}
    </div>
    {filteredGuestList.map((guest) => {
      const status = getInvitationStatus(guest.id);

      const response = rsvps.find(
        (rsvp) => rsvp.invited_guest_id === guest.id
      );

      const confirmedPax =
        response?.attendance === "attending"
          ? response.guest_count
          : 0;

      return (
        <div
          key={guest.id}
          className="flex justify-between items-center py-4 border-b border-[#EEE5D8] last:border-0 gap-3"
        >
          <div>
            <p className="text-sm font-medium text-[#756044]">
              {guest.guest_name}
            </p>

            <p className="text-xs text-[#B19B78] mt-1">
              {guest.phone_number || "No phone number"}
            </p>

            <p className="text-xs text-[#806B4D] mt-1">
              {confirmedPax} / {guest.max_guests} Pax Confirmed
            </p>
          </div>

          <span
            className={`text-xs px-3 py-1 rounded-full ${status.className}`}
          >
            {status.label}
          </span>
        </div>
      );
    })}

   {filteredGuestList.length === 0 && (
  <p className="text-sm text-[#9B8058]">
    {invitedGuests.length === 0
      ? "No invited guests added yet."
      : "No guests match this filter."}
  </p>
)}
  </div>
)}

            {activeTab === "Guestbook" && (
              <div className="bg-white/70 border border-[#E3D7C3] p-6">
                <h2 className="font-serif text-2xl text-[#756044] mb-5">
                  Digital Guestbook
                </h2>

                {wishes.map((wish) => (
                  <div
                    key={wish.id}
                    className="py-4 border-b border-[#EEE5D8] last:border-0"
                  >
                    <p className="text-sm text-[#756044] font-medium">
                      {wish.guest_name}
                    </p>
                    <p className="text-sm text-[#806B4D] mt-2">
                      {wish.message}
                    </p>
                    <p className="text-xs text-[#B19B78] mt-2">
                      {formatDate(wish.created_at)}
                    </p>
                  </div>
                ))}

                {wishes.length === 0 && (
                  <p className="text-sm text-[#9B8058]">
                    No wishes yet.
                  </p>
                )}
              </div>
            )}
          </>
        )}

        <footer className="text-center text-xs text-[#B19B78] mt-12">
          VIELIN DIGITAL WEDDING PLATFORM
        </footer>
      </div>
    </main>
  );
}
