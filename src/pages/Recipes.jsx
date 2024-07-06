import axios from "axios";
import { useEffect, useRef, useState } from "react";
import RecipeCard from "../components/recipe/RecipeCard";
import Loader from "../components/Loader";

const Recipes = () => {
  const [allRecipes, setAllRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  // const initialRender = useRef(true);
  const [limit, setLimit] = useState(8);
  const [search, setSearch] = useState("");

  const getRecipes = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/all-recipes?page=${page}&limit=${limit}&search=${search}`);
      setAllRecipes(prevRecipes => (page === 0 ? res.data : [...prevRecipes, ...res.data]));
      setHasMore(res.data.length === 8);
      return res.data;
    } catch (error) {
      console.error("Failed to load recipes", error);
    } finally {
      setLoading(false);
    }
  };

  function handleSearch(e) {
    setSearch(e.target.value);
    setPage(0); // Reset to the first page for new search
  }

  useEffect(() => {
    getRecipes();
  }, [page, search]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight &&
        hasMore &&
        !loading
      ) {
        setPage(prevPage => prevPage + 1);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, loading]);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-center text-2xl md:text-4xl font-semibold mb-5">All Recipes</h1>
      <div className="flex flex-col md:flex-row gap-4">
        <div>
          <label htmlFor="search" className="text-lg md:text-2xl font-semibold inline-block mb-2">
            Search by title
          </label>
          <input
            type="text"
            id="search"
            placeholder="Search..."
            className="w-full py-1 px-2 rounded border"
            onChange={handleSearch}
          />
        </div>
        <div className="w-full">
          <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
            {allRecipes.map(recipe => (
              <RecipeCard recipe={recipe} key={recipe._id} />
            ))}
          </div>
          {loading && <Loader />}
          {!hasMore && <p className="text-center mt-4">No more recipes</p>}
        </div>
      </div>
    </div>
  );
};

export default Recipes;
