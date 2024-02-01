import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [searchParam, setSearchParam] = useState("");
  const [loading, setLoading] = useState(false);
  const [recipeList, setRecipeList] = useState([]);
  const [recipeDetailsData, setRecipeDetailsData] = useState(null);
  const [favoritesList, setFavoritesList] = useState([]);
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      if (!searchParam.trim()) {
        // If searchParam is empty or contains only whitespace, do nothing
        return;
      }

      setLoading(true);

      const res = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchParam}`
      );
      const data = await res.json();

      if (data.status === "success" && data.data.recipes) {
        setRecipeList(data.data.recipes);
        setLoading(false);
        setSearchParam(""); // Clear the search input
        navigate("/");
      }
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
      setRecipeList([]);
    }
  }
  function handleAddFavorite(getCurrentItem) {
    console.log(getCurrentItem);
    let cpyFavvList = [...favoritesList];
    const index = cpyFavvList.findIndex(
      (item) => item.id === getCurrentItem.id
    );

    if (index === -1) {
      cpyFavvList.push(getCurrentItem);
    } else {
      cpyFavvList.splice(index);
    }
    setFavoritesList(cpyFavvList);
  }

  console.log(favoritesList, "handleAddFavorite");
  return (
    <GlobalContext.Provider
      value={{
        searchParam,
        loading,
        recipeList,
        setSearchParam,
        handleSubmit,
        recipeDetailsData,
        setRecipeDetailsData,
        handleAddFavorite,
        favoritesList,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
