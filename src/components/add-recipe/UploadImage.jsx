import axios from "axios";

const UploadImage = ({ setRecipeData, recipeImage, errors }) => {
  const handleImageUpload = async event => {
    const imageFile = event.target.files[0];
    const formData = new FormData();
    formData.append("image", imageFile);
    if (imageFile) {
      try {
        const response = await axios.post(
          "https://api.imgbb.com/1/upload?key=e67dada753176ec640ceb26edb0f9c90",
          formData
        );
        setRecipeData(prev => ({ ...prev, recipeImage: response.data.data.display_url }));
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    } else {
      setRecipeData(prev => ({ ...prev, recipeImage: null }));
    }
  };
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">Recipe Image</label>
      <input
        type="file"
        className="w-full px-3 py-2 border rounded-lg"
        name="recipeImage"
        onChange={handleImageUpload}
      />
      {recipeImage && <img src={recipeImage} alt="Recipe" className="mt-4 size-28" />}
      {errors.recipeImage && <p className="text-red-500 text-xs mt-2">{errors.recipeImage}</p>}
    </div>
  );
};

export default UploadImage;
