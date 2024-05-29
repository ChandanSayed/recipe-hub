import { useParams } from "react-router-dom";
import RecipeDetail from "../components/recipe/RecipeDetail";
import { useEffect, useState } from "react";
import axios from "axios";

const RecipeDetails = () => {
  const { id } = useParams();

  const [recipe, setRecipe] = useState({
    category: "",
    country: "",
    creatorEmail: "",
    purchased_by: [],
    recipeDetails: "",
    recipeImage: "",
    recipeName: "",
    watchCount: 0,
    youtubeCode: "",
    _id: ""
  });

  useEffect(() => {
    axios
      .get(`/recipe/${id}`)
      .then(res => {
        setRecipe(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <div className="container mx-auto px-4 pt-12 pb-5">
      <RecipeDetail recipe={recipe} />
    </div>
  );
};

export default RecipeDetails;
