import React, { useState } from "react";
import UploadImage from "../components/add-recipe/UploadImage";
import axios from "axios";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

const AddRecipe = () => {
  const userDetails = useSelector(state => state.userData.value);
  const [recipeData, setRecipeData] = useState({
    recipeName: "",
    recipeImage: null,
    recipeDetails: "",
    youtubeCode: "",
    country: "",
    category: "",
    creatorEmail: userDetails?.user?.email,
    watchCount: 0,
    purchased_by: []
  });
  const [errors, setErrors] = useState({});
  const notify = () => toast("Recipe Added Successfully !");
  const [isDisabled, setIsDisabled] = useState(false);
  const validateForm = () => {
    const newErrors = {};
    if (!recipeData.recipeName || recipeData.recipeName.length < 3) {
      newErrors.recipeName = "Recipe name must be at least 3 characters long";
    }
    if (!recipeData.recipeDetails || recipeData.recipeDetails.length < 3) {
      newErrors.recipeDetails = "Recipe details must be at least 3 characters long";
    }
    if (!recipeData.youtubeCode) {
      newErrors.youtubeCode = "Please include video URL";
    }
    if (!recipeData.country || recipeData.country.length < 3) {
      newErrors.country = "Country must be at least 3 characters long";
    }
    if (!recipeData.category) {
      newErrors.category = "Select a category please";
    }
    if (!recipeData.recipeImage) {
      newErrors.recipeImage = "Please upload an image";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  function handleValue(e) {
    const { name, value } = e.target;
    setRecipeData(prev => ({ ...prev, [name]: value }));
  }

  const handleSubmit = async e => {
    e.preventDefault();
    setIsDisabled(true);
    if (validateForm()) {
      const res = await axios.post("/add-recipe", {
        recipe: recipeData,
        token: userDetails.token
      });

      if (res.data.insertedId) {
        notify();
        setRecipeData(prev => ({
          ...prev,
          recipeName: "",
          recipeImage: null,
          recipeDetails: "",
          youtubeCode: "",
          country: "",
          category: ""
        }));
      }
      setIsDisabled(false);
      setErrors({});
    }
    setIsDisabled(false);
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-8 mt-10 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Add Recipe</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Recipe Name</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-lg"
            value={recipeData.recipeName}
            name="recipeName"
            onChange={handleValue}
          />
          {errors.recipeName && <p className="text-red-500 text-xs mt-2">{errors.recipeName}</p>}
        </div>

        <UploadImage
          setRecipeData={setRecipeData}
          recipeImage={recipeData.recipeImage}
          errors={errors}
        />

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Recipe Details</label>
          <textarea
            className="w-full px-3 py-2 border rounded-lg"
            value={recipeData.recipeDetails}
            name="recipeDetails"
            onChange={handleValue}
          />
          {errors.recipeDetails && (
            <p className="text-red-500 text-xs mt-2">{errors.recipeDetails}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Embedded YouTube Video Code
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-lg"
            value={recipeData.youtubeCode}
            name="youtubeCode"
            onChange={handleValue}
          />
          {errors.youtubeCode && <p className="text-red-500 text-xs mt-2">{errors.youtubeCode}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Country</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-lg"
            value={recipeData.country}
            name="country"
            onChange={handleValue}
          />
          {errors.country && <p className="text-red-500 text-xs mt-2">{errors.country}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Category</label>
          <select
            className="w-full px-3 py-2 border rounded-lg"
            value={recipeData.category}
            name="category"
            onChange={handleValue}
          >
            <option value="">Select a category</option>
            <option value="breakfast">Breakfast</option>
            <option value="main-course">Main Course</option>
            <option value="dessert">Dessert</option>
          </select>
          {errors.category && <p className="text-red-500 text-xs mt-2">{errors.category}</p>}
        </div>

        <button
          type="submit"
          disabled={isDisabled}
          className="w-full py-2 text-white px-4 rounded-lg hover:bg-opacity-70 bg-dark-blue hover:text-white shadow-lg"
        >
          Submit Recipe
        </button>
      </form>
    </div>
  );
};

export default AddRecipe;
