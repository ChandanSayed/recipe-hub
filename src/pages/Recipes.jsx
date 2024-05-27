import axios from "axios";
import { useEffect, useState } from "react";
import RecipeCard from "../components/recipe/RecipeCard";

const Recipes = () => {
  const [allRecipes, setAllRecipes] = useState(null);
  const [loading, setLoading] = useState(null);

  async function getRecipes() {
    const res = await axios.get("/all-recipes");
    console.log(res.data);
    setAllRecipes(res.data);
  }

  useEffect(() => {
    getRecipes();
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="w-10 h-10 animate-[spin_2s_linear_infinite] rounded-full border-8 border-dotted border-sky-600"></div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-center text-2xl md:text-4xl font-semibold mb-5">All Recipes</h1>
      <div className="grid grid-cols-2 gap-2 lg:grid-cols-5">
        {allRecipes && allRecipes.map(recipe => <RecipeCard recipe={recipe} key={recipe._id} />)}
      </div>
    </div>
  );
};

export default Recipes;
