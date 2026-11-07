
const WeddingDetails = () => {
  return (
   <section className="w-full max-w-3xl mx-auto py-20 px-5 text-center">
      <p className="text-sm tracking-[0.35em] uppercase text-amber-800 mb-3 font-semibold">
        Save The Date
      </p>

      <h2 className="text-3xl md:text-4xl font-serif mb-4 text-gray-900">
        Wedding Details
      </h2>

      <p className="text-gray-700 mb-12">
        The beginning of our forever
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="border border-amber-300 bg-white rounded-2xl p-8">
          <div className="text-4xl mb-4">💍</div>
          <h3 className="text-xl font-serif mb-3 text-gray-900">
            Holy Matrimony
          </h3>
          <p className="text-gray-800 mb-2">
            Saturday, 21 October 2028
          </p>
          <p className="text-gray-700 text-sm">
            Time: To be announced
          </p>
          <p className="text-gray-700 text-sm mt-3">
            Venue: To be announced
          </p>
        </div>

        <div className="border border-amber-300 bg-white rounded-2xl p-8">
          <div className="text-4xl mb-4">🥂</div>
          <h3 className="text-xl font-serif mb-3 text-gray-900">
            Wedding Reception
          </h3>
          <p className="text-gray-800 mb-2">
            Saturday, 21 October 2028
          </p>
          <p className="text-gray-700 text-sm">
            Time: To be announced
          </p>
          <p className="text-gray-700 text-sm mt-3">
            Venue: To be announced
          </p>
        </div>
      </div>
      <div className="mt-8 border border-amber-300 bg-white rounded-2xl p-8">
        <div className="text-4xl mb-4">📍</div>

        <h3 className="text-xl font-serif mb-3 text-gray-900">
          Wedding Location
        </h3>

        <p className="text-gray-700 mb-5">
          The venue details will be announced soon.
        </p>

        <button
          type="button"
          disabled
          className="border border-amber-300 text-amber-800 px-6 py-3 rounded-full text-sm opacity-50 cursor-not-allowed"
        >
          View Location — Coming Soon
        </button>
      </div>
      <div className="mt-12 bg-amber-50 border border-amber-200 rounded-2xl p-8">
        <h3 className="text-xl font-serif mb-3 text-gray-900">
          Dress Code
        </h3>
        <p className="text-gray-700">
          To be announced
        </p>
      </div>

      <p className="text-sm text-gray-600 mt-10 italic">
        We can't wait to celebrate this special day with you.
      </p>
    </section>
  );
};

export default WeddingDetails;
