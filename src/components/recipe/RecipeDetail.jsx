import React from "react";

const RecipeDetail = ({ recipe }) => {
  const {
    recipeName,
    recipeImage,
    recipeDetails,
    creatorEmail,
    purchased_by,
    watchCount,
    country,
    youtubeCode,
    category
  } = recipe;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg overflow-hidden">
        <img className="w-full h-64 object-cover" src={recipeImage} alt={recipeName} />
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">{recipeName}</h1>
          <p className="mb-4">{recipeDetails}</p>
          <p className="mb-2">
            <strong>Category:</strong> {category}
          </p>
          <p className="mb-2">
            <strong>Country:</strong> {country}
          </p>
          <p className="mb-2">
            <strong>Creator Email:</strong> {creatorEmail}
          </p>
          <p className="mb-2">
            <strong>Watch Count:</strong> {watchCount}
          </p>
          <p className="mb-4">
            <strong>Purchased By:</strong>{" "}
            {purchased_by.length > 0 ? purchased_by.join(", ") : "Did not make a sale yet!"}
          </p>
          <div className="mb-4">
            <iframe
              className="w-full h-64"
              src={`https://www.youtube.com/embed/${youtubeCode}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="YouTube video player"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
