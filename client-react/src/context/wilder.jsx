// import axios from "axios";
// import { createContext, useReducer } from "react";
// import Reducer from "./reducer";

// const INITIAL_STATE = {
//   wilders: [],
//   error: null,
// };

// export const wilderContext = createContext(INITIAL_STATE);

// export const ContextProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

//   const getWilders = async () => {
//     const { data } = await axios.get(
//       `${process.env.REACT_APP_URL_API}/wilders`
//     );
//     dispatch({ type: "GET_WILDERS", payload: data.result });
//   };

//   const addWilder = (wilder) => {
//     dispatch({
//       type: "ADD_WILDER",
//       payload: wilder,
//     });
//   };

//   const updateWilder = (wilder) => {
//     dispatch({
//       type: "UPDATE_WILDER",
//       payload: wilder,
//     });
//   };

//   const removeWild = (wilder) => {
//     dispatch({
//       type: "REMOVE_WILDER",
//       payload: wilder,
//     });
//   };

//   return (
//     <wilderContext.Provider
//       value={{
//         wilders: state.wilders,
//         error: state.error,
//         getWilders,
//         addWilder,
//         updateWilder,
//         removeWild,
//       }}
//     >
//       {children}
//     </wilderContext.Provider>
//   );
// };
