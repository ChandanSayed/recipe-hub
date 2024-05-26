import CountUp from "react-countup";

const SuccessStory = () => {
  return (
    <>
      <div className="py-12">
        <div className="max-w-5xl px-4 mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Why Use Our Recipe System?</h2>
          <p className="text-xl mb-12 text-gray-700">
            Discover thousands of recipes, connect with fellow food enthusiasts, and share your
            culinary creations with our vibrant community.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-3xl font-semibold text-dark-blue">Total Recipes</h3>
              <p className="text-5xl font-bold text-gray-800 mt-4">
                <CountUp end={3250} duration={3} />
              </p>
              <p className="text-gray-600 mt-2">and counting...</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-3xl font-semibold text-dark-blue">Happy Users</h3>
              <p className="text-5xl font-bold text-gray-800 mt-4">
                <CountUp end={1200} duration={3} />
              </p>
              <p className="text-gray-600 mt-2">and growing...</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SuccessStory;
