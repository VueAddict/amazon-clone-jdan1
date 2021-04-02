export const initialState = {
  basket: [],
  user: null,
};

export const getBasketTotal = (basket) =>
  basket?.reduce((total, { price }) => total + price, 0);

const reducer = (state, action) => {
  console.log(state.basket);
  switch (action.type) {
    case "ADD_TO_BASKET":
      return {
        ...state,
        basket: [...state.basket, action.item],
      };
    case "REMOVE_FROM_BASKET":
      console.log(state.basket);
      const index = state.basket.findIndex(
        (product) => product.id === action.id
      );
      const newBasket = [...state.basket];
      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn("there is no item with this id " + action.id);
      }
      return {
        ...state,
        basket: newBasket,
      };
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case 'EMPTY_BASKET':
      return {
        ...state,
        basket: []
      }
    default:
      return state;
  }
};

export default reducer;
