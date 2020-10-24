import React, { useReducer, useEffect } from "react";

let reducer = (favs = initialState, action) => {
  let uid = action.uid;

  switch (action.type) {
    case "remove":
    return {
      ...favs,
      [action.resource]: favs[action.resource].filter(item => item.uid !== uid)}
    case "add":
      return {
        ...favs,
        [action.resource]: [...favs[action.resource], action.item]
      }
    default:
      return {...favs};
  }

};

const initialState = { "launches": [], "launch-pads": [] }; //dynamically

const FavContext = React.createContext();
const storeKey = process.env.REACT_APP_NAME+"-fav";

function FavProvider(props) {
  const localState = JSON.parse(localStorage.getItem(storeKey));
  const [favs, toggleFav] = useReducer(reducer, localState || initialState);

  useEffect(() => {
    localStorage.setItem(storeKey, JSON.stringify(favs));
  }, [favs]);

  return (
    <FavContext.Provider value={{ favs, toggleFav }}>
      {props.children}
    </FavContext.Provider>
  );
}

export { FavContext, FavProvider };