
export default function OurStory() {
  const stories = [
    {
      number: "01",
      title: "The First Meeting",
      subtitle: "Where everything began",
      description:
        "Every beautiful story has a beginning. Ours started with a simple meeting that would eventually change our lives.",
      date: "The Beginning",
    },
    {
      number: "02",
      title: "Getting to Know You",
      subtitle: "Little moments, big feelings",
      description:
        "From simple conversations to endless laughter, we slowly discovered that we had found something special in each other.",
      date: "Growing Together",
    },
    {
      number: "03",
      title: "The Beginning of Us",
      subtitle: "Choosing each other, every day",
      description:
        "Through every little adventure, we learned that love is not just about finding the right person, but growing together.",
      date: "Our Journey",
    },
    {
      number: "04",
      title: "Forever Starts Here",
      subtitle: "And our next chapter begins",
      description:
        "With grateful hearts, we look forward to a lifetime of love, laughter, and beautiful memories together.",
      date: "21 October 2028",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[#F5F0E8] px-5 py-24 sm:px-6">
      <div className="pointer-events-none absolute right-[-100px] top-20 h-64 w-64 rounded-full border border-[#C5AC83]/20" />
      <div className="pointer-events-none absolute bottom-20 left-[-100px] h-64 w-64 rounded-full border border-[#C5AC83]/20" />

      <div className="relative mx-auto max-w-5xl">
        <div className="mb-20 text-center">
          <p className="mb-5 text-[10px] uppercase tracking-[0.5em] text-[#9B8058]">
            Our Journey
          </p>

          <div className="mx-auto mb-6 h-px w-12 bg-[#B69A6B]" />

          <h2 className="font-serif text-4xl leading-tight text-[#14233A] sm:text-6xl">
            Every Love
            <br />
            <span className="italic text-[#A88B5D]">Has a Story</span>
          </h2>

          <p className="mt-6 font-serif text-lg italic text-[#8C785A]">
            And this is ours...
          </p>
        </div>

        <div className="relative mx-auto max-w-4xl">
          <div className="absolute bottom-0 left-[15px] top-0 w-px bg-[#C5AC83] md:left-1/2 md:-translate-x-1/2" />

          {stories.map((story, index) => (
            <div
              key={story.number}
              className={`relative mb-16 flex last:mb-0 ${
                index % 2 === 0
                  ? "md:flex-row"
                  : "md:flex-row-reverse"
              }`}
            >
              <div className="absolute left-[15px] top-8 z-10 flex h-3 w-3 -translate-x-1/2 items-center justify-center rounded-full border-2 border-[#F5F0E8] bg-[#B69A6B] shadow-[0_0_0_4px_#C5AC8333] md:left-1/2" />

              <div className="ml-10 w-full md:ml-0 md:w-1/2 md:px-10">
                <div className="border border-[#C5AC83]/70 bg-[#FBF8F2] p-6 shadow-[0_12px_35px_rgba(20,35,58,0.06)] sm:p-8">
                  <p className="mb-4 text-[10px] tracking-[0.35em] text-[#A88B5D]">
                    CHAPTER {story.number}
                  </p>

                  {index === 0 && (
                    <div className="mb-7 rotate-[-2deg] bg-white p-2 pb-5 shadow-md">
                      <img
                        src="/images/couple.jpg"
                        alt="Alviyan and Cherline"
                        className="h-48 w-full object-cover sm:h-56"
                      />
                      <p className="mt-3 text-center font-serif text-sm italic text-[#8C785A]">
                        A memory to remember
                      </p>
                    </div>
                  )}

                  {index === 2 && (
                    <div className="mb-7 rotate-[2deg] bg-white p-2 pb-5 shadow-md">
                      <img
                        src="/images/couple.jpg"
                        alt="A beautiful memory of Alviyan and Cherline"
                        className="h-48 w-full object-cover sm:h-56"
                      />
                      <p className="mt-3 text-center font-serif text-sm italic text-[#8C785A]">
                        A beautiful moment together
                      </p>
                    </div>
                  )}

                  <h3 className="font-serif text-2xl leading-snug text-[#14233A] sm:text-3xl">
                    {story.title}
                  </h3>

                  <p className="mt-2 font-serif text-base italic text-[#A88B5D]">
                    {story.subtitle}
                  </p>

                  <p className="mt-5 text-sm leading-7 text-[#756B5D]">
                    {story.description}
                  </p>

                  <div className="my-6 h-px w-12 bg-[#B69A6B]" />

                  <p className="text-[10px] uppercase tracking-[0.25em] text-[#9B8058]">
                    {story.date}
                  </p>
                </div>
              </div>

              <div className="hidden w-1/2 md:block" />
            </div>
          ))}
        </div>

        <div className="mt-24 text-center">
          <div className="mx-auto mb-7 h-px w-12 bg-[#B69A6B]" />

          <p className="font-serif text-3xl italic text-[#14233A] sm:text-4xl">
            To be continued...
          </p>

          <p className="mt-5 text-[10px] uppercase tracking-[0.4em] text-[#A88B5D]">
            Alviyan & Cherline
          </p>
        </div>
      </div>
    </section>
  );
}
