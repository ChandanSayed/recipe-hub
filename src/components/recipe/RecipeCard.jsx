import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getUserData } from "../../redux/features/user/userSlice";

function RecipeCard({ recipe }) {
  const userDetails = useSelector(state => state.userData.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleViewRecipe = async () => {
    if (!userDetails.name) {
      toast.error("Please login to view the recipe");
      return;
    }

    if (userDetails.email === recipe.creatorEmail) {
      // Redirect to recipe details page

      navigate(`/recipe-details/${recipe._id}`);
      return;
    }

    if (userDetails.coin < 10) {
      console.log(userDetails.coin);
      console.log(userDetails.email, recipe.creatorEmail);
      // Redirect to purchase coins page
      toast.warning("You need to purchase more coins");

      navigate(`/purchase-coin`);
      return;
    }

    if (userDetails && recipe.purchased_by.includes(userDetails.email)) {
      // Redirect to recipe details page
      navigate(`/recipe-details/${recipe._id}`);
      return;
    }

    const confirmSpendCoins = window.confirm("Do you want to spend 10 coins to view this recipe?");

    if (confirmSpendCoins) {
      const res = await axios.put(`/update-user/${userDetails.email}`, { coin: -10 });

      const { _id, ...rest } = res.data;
      dispatch(getUserData(rest));

      await axios.put(`/update-user/${recipe.creatorEmail}`, { coin: 1 });

      await axios.put(`/update-recipe/${recipe._id}`, { purchased_by: userDetails.email });

      // Redirect to recipe details page
      navigate(`/recipe-details/${recipe._id}`);
    }
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      <img className="w-full" src={recipe?.recipeImage} alt={recipe.recipeName} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{recipe.recipeName}</div>
        <p className="text-gray-700 text-base">
          Purchased by: {recipe.purchased_by.length} People
        </p>
        <p className="text-gray-700 text-base">Creator Email: {recipe.creatorEmail}</p>
        <p className="text-gray-700 text-base">Country: {recipe.country}</p>
      </div>
      <div className="px-6 py-4">
        {/* {userDetails.email === recipe.creatorEmail && (
          <Link
            className="text-center block w-full py-2 text-white px-4 rounded-lg hover:bg-opacity-70 bg-dark-blue hover:text-white"
            to={`/recipe-details/${recipe._id}`}
          >
            View The Recipe
          </Link>
        )} */}

        <button
          onClick={handleViewRecipe}
          className="w-full py-2 text-white px-4 rounded-lg hover:bg-opacity-70 bg-dark-blue hover:text-white"
        >
          View The Recipe
        </button>
      </div>
    </div>
  );
}

export default RecipeCard;
