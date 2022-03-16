// const Reducer = (state, action) => {
//   switch (action.type) {
//     case "GET_WILDERS":
//       return {
//         wilders: [action.payload],
//       };
//     case "ADD_WILDER":
//       return {
//         ...state,
//         wilders: [...state.wilders, action.payload],
//       };
//     case "UPDATE_WILDER":
//       const updatedWilders = state.wilders.map((wilder) => {
//         if (wilder.id === action.payload.id) {
//           return action.payload;
//         }
//         return wilder;
//       });

//       return {
//         ...state,
//         wilders: updatedWilders,
//       };
//     case "DELETE_WILDER":
//       return {
//         ...state,
//         wilders: state.wilders.filters(
//           (wilder) => wilder.id !== action.payload
//         ),
//       };
//     case "FAILURE":
//       return {
//         ...state,
//         error: true,
//       };
//     default:
//       return state;
//   }
// };

// export default Reducer;
