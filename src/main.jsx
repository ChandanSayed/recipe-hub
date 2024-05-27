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
import CoinDetails from "./pages/CoinDetails.jsx";
import PurchaseCoin from "./pages/PurchaseCoin.jsx";

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
        element: <AddRecipe />
      },
      {
        path: "/recipe-details/:id",
        element: <CoinDetails />
      },
      {
        path: "/purchase-coin",
        element: <PurchaseCoin />
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
