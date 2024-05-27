import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./error-page.jsx";
import Home from "./pages/Home.jsx";
import Recipes from "./pages/Recipes.jsx";
import AddRecipe from "./pages/AddRecipe.jsx";

import axios from "axios";
import { Provider } from "react-redux";
import store from "./redux/store.jsx";
import PurchaseCoin from "./pages/PurchaseCoin.jsx";
import RecipeDetails from "./pages/RecipeDetails.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";

axios.defaults.baseURL = "http://localhost:8000/";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/recipes",
        element: <Recipes />
      },
      {
        path: "/add-recipe",
        element: (
          <PrivateRoute>
            <AddRecipe />
          </PrivateRoute>
        )
      },
      {
        path: "/recipe-details/:id",
        element: (
          <PrivateRoute>
            <RecipeDetails />
          </PrivateRoute>
        )
      },
      {
        path: "/purchase-coin",
        element: (
          <PrivateRoute>
            <PurchaseCoin />
          </PrivateRoute>
        )
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
