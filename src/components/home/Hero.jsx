import { Link } from "react-router-dom";
import Button from "../Button";

const Hero = () => {
  return (
    <div className="flex items-center justify-center min-h-[50vh] md:h-screen bg-dark-blue">
      <div className="flex flex-col items-center my-10">
        <h1 className="text-2xl md:text-5xl font-semibold text-white text-center md:leading-tight capitalize">
          Get the <span className="text-red-500">best</span> <br /> recipe from here!
        </h1>

        <div className="flex flex-wrap gap-10 items-center py-4">
          <Link to="/recipes">
            <button className="px-8 py-3 bg-dark-white text-lg font-medium rounded-lg hover:bg-opacity-50 hover:text-white hover:shadow-lg">
              Explore More
            </button>
          </Link>
          <Link to="/add-recipe">
            <button className="px-8 py-3 bg-red-500 text-white text-lg font-medium rounded-lg hover:bg-opacity-50 hover:text-white hover:shadow-lg">
              Add Recipe
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
