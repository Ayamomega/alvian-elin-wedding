
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
    <section className="bg-[#F5F0E8] px-6 py-24">
      <div className="max-w-4xl mx-auto">

        <div className="text-center mb-16">
          <p className="text-[#9B8058] tracking-[0.4em] text-xs uppercase mb-6">
            Our Journey
          </p>

          <h2 className="font-serif text-4xl md:text-6xl text-[#756044]">
            Every Love Has a Story
          </h2>

          <p className="font-serif italic text-[#9B8058] mt-5 text-lg">
            And this is ours...
          </p>
        </div>

        <div className="relative max-w-3xl mx-auto">

          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-[#C5AC83]" />

          {stories.map((story, index) => (
            <div
              key={story.number}
              className={`relative flex mb-16 ${
                index % 2 === 0
                  ? "md:flex-row"
                  : "md:flex-row-reverse"
              }`}
            >
              <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#B69A6B] border-2 border-[#F5F0E8] z-10" />

              <div className="ml-12 md:ml-0 md:w-1/2 md:px-10 w-full">
                <div className="border border-[#C5AC83] bg-[#F8F4ED] p-5 md:p-7 shadow-sm">

                  <p className="text-[#B69A6B] tracking-[0.3em] text-xs mb-3">
                    CHAPTER {story.number}
                  </p>

                  {index === 0 && (
                    <div className="mb-6 rotate-[-2deg] bg-white p-2 pb-5 shadow-sm">
                      <img
                        src="/images/couple.jpg"
                        alt="Alviyan and Cherline"
                        className="w-full h-48 object-cover"
                      />
                      <p className="text-center font-serif italic text-[#9B8058] mt-3 text-sm">
                        A memory to remember
                      </p>
                    </div>
                  )}

                  {index === 2 && (
                    <div className="mb-6 rotate-[2deg] bg-white p-2 pb-5 shadow-sm">
                      <img
                        src="/images/couple.jpg"
                        alt="A beautiful memory of Alviyan and Cherline"
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  )}

                  <h3 className="font-serif text-2xl text-[#756044] mb-2">
                    {story.title}
                  </h3>

                  <p className="font-serif italic text-[#B69A6B] mb-4">
                    {story.subtitle}
                  </p>

                  <p className="text-[#8C785A] text-sm leading-7">
                    {story.description}
                  </p>

                  <div className="w-10 h-px bg-[#B69A6B] my-5" />

                  <p className="text-[#9B8058] text-xs tracking-widest uppercase">
                    {story.date}
                  </p>

                </div>
              </div>
            </div>
          ))}

        </div>

        <div className="text-center mt-20">
          <p className="font-serif italic text-3xl text-[#9B8058]">
            To be continued...
          </p>

          <p className="text-[#B19B78] tracking-[0.3em] text-xs uppercase mt-4">
            Alviyan & Cherline
          </p>
        </div>

      </div>
    </section>
  );
}
