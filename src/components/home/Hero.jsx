import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="flex items-center justify-center border h-[80vh] bg-dark-blue">
      <div className="flex flex-col items-center my-10 text-white space-y-8">
        <h1 className="text-5xl font-semibold text-white text-center leading-[65px] ">
          Get the <span className="text-red-500">best</span> <br /> recipe from here!
        </h1>

        <div className="flex flex-wrap gap-10 items-center py-4">
          <Link to="/recipes">
            <button className="flex items-center gap-4 px-8 py-3 bg-gradient-to-t from-black to-white/10 text-white text-lg font-medium rounded-lg">
              Explore More
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
