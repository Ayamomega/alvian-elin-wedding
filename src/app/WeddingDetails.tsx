
const WeddingDetails = () => {
  return (
    <section className="relative mx-auto w-full max-w-5xl px-5 py-24 text-center">

      {/* Heading */}
      <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.4em] text-[#A88B60]">
        Save The Date
      </p>

      <h2 className="mb-4 font-editorial text-4xl font-normal text-[#17283B] md:text-5xl">
        Wedding Details
      </h2>

      <div className="mx-auto mb-6 h-px w-16 bg-[#C6A878]" />

      <p className="mx-auto mb-14 max-w-md font-editorial text-lg leading-8 text-[#71685B]">
        The beginning of our forever
      </p>

      {/* Main Event Cards */}
      <div className="grid gap-6 md:grid-cols-2">

        {/* Holy Matrimony */}
        <div className="group relative overflow-hidden rounded-2xl border border-[#D5C5A8] bg-[#FFFEFB] p-8 shadow-[0_12px_35px_rgba(40,53,71,0.06)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(40,53,71,0.10)]">

          <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-transparent via-[#C6A878] to-transparent" />

          <div className="mb-5 text-3xl text-[#B99B6E]">
            ♡
          </div>

          <p className="mb-3 text-[9px] uppercase tracking-[0.3em] text-[#A88B60]">
            The Ceremony
          </p>

          <h3 className="mb-6 font-editorial text-3xl text-[#101D32]">
            Holy Matrimony
          </h3>

          <div className="mx-auto mb-6 h-px w-10 bg-[#C6A878]" />

          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#A88B60]">
            Date
          </p>

          <p className="mb-6 font-editorial text-xl text-[#101D32]">
            Saturday, 21 October 2028
          </p>

          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#A88B60]">
            Time
          </p>

          <p className="mb-6 font-editorial text-lg text-[#71685B]">
            To be announced
          </p>

          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#A88B60]">
            Venue
          </p>

          <p className="font-editorial text-lg text-[#71685B]">
            To be announced
          </p>
        </div>

        {/* Reception */}
        <div className="group relative overflow-hidden rounded-2xl border border-[#D5C5A8] bg-[#FFFEFB] p-8 shadow-[0_12px_35px_rgba(40,53,71,0.06)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(40,53,71,0.10)]">

          <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-transparent via-[#C6A878] to-transparent" />

          <div className="mb-5 text-3xl text-[#B99B6E]">
            ✧
          </div>

          <p className="mb-3 text-[9px] uppercase tracking-[0.3em] text-[#A88B60]">
            The Celebration
          </p>

          <h3 className="mb-6 font-editorial text-3xl text-[#17283B]">
            Wedding Reception
          </h3>

          <div className="mx-auto mb-6 h-px w-10 bg-[#C6A878]" />

          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#A88B60]">
            Date
          </p>

          <p className="mb-6 font-editorial text-xl text-[#293B50]">
            Saturday, 21 October 2028
          </p>

          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#A88B60]">
            Time
          </p>

          <p className="mb-6 font-editorial text-lg text-[#71685B]">
            To be announced
          </p>

          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#A88B60]">
            Venue
          </p>

          <p className="font-editorial text-lg text-[#71685B]">
            To be announced
          </p>
        </div>
      </div>

      {/* Location */}
      <div className="mt-8 rounded-2xl border border-[#D5C5A8] bg-[#101D32] p-9 text-center shadow-[0_15px_40px_rgba(23,40,59,0.12)]">

        <div className="mb-4 text-3xl text-[#D2B98F]">
          ⌖
        </div>

        <p className="mb-3 text-[9px] uppercase tracking-[0.35em] text-[#D2B98F]">
          Find Our Venue
        </p>

        <h3 className="mb-4 font-editorial text-3xl text-[#FFF9EC]">
          Wedding Location
        </h3>

        <div className="mx-auto mb-5 h-px w-12 bg-[#C6A878]" />

        <p className="mx-auto mb-7 max-w-md font-editorial text-lg leading-8 text-[#E5DDD0]">
          The venue details will be announced soon.
        </p>

        <button
          type="button"
          disabled
          className="rounded-full border border-[#D2B98F]/60 px-7 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#D2B98F] opacity-60"
        >
          Location Coming Soon
        </button>
      </div>

      {/* Dress Code */}
      <div className="mt-8 rounded-2xl border border-[#D5C5A8] bg-[#F8F5EF] px-8 py-10">

        <p className="mb-3 text-[9px] uppercase tracking-[0.35em] text-[#A88B60]">
          A Gentle Note
        </p>

        <h3 className="mb-4 font-editorial text-3xl text-[#17283B]">
          Dress Code
        </h3>

        <div className="mx-auto mb-5 h-px w-10 bg-[#C6A878]" />

        <p className="font-editorial text-lg text-[#71685B]">
          To be announced
        </p>
      </div>

      {/* Closing */}
      <p className="mt-12 font-editorial text-lg italic leading-8 text-[#806B4E]">
        We can't wait to celebrate this special day with you.
      </p>

      <div className="mt-5 text-xl text-[#B99B6E]">
        ❧
      </div>

    </section>
  );
};

export default WeddingDetails;
