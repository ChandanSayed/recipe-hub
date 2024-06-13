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

  const getRecipes = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/all-recipes?page=${page}&limit=8`);
      setAllRecipes(prevRecipes => [...prevRecipes, ...res.data]);
      setHasMore(res.data.length === 8);
    } catch (error) {
      console.error("Failed to load recipes", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // if (initialRender.current) {
    //   initialRender.current = false;
    //   return
    // }
    getRecipes();
  }, [page]);

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
      <div className="grid grid-cols-2 gap-2 lg:grid-cols-5">
        {allRecipes.map(recipe => (
          <RecipeCard recipe={recipe} key={recipe._id} />
        ))}
      </div>
      {loading && <Loader />}
      {!hasMore && <p className="text-center mt-4">No more recipes</p>}
    </div>
  );
};

export default Recipes;
