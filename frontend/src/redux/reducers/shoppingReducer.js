export const addToCart = (id) => {
  return {
    type: ADD_TO_CART,
    id,
  };
};
export const removeFromCart = (id) => {
  return {
    type: REMOVE_FROM_CART,
    id,
  };
};
export const subtractQuantity = (id) => {
  return {
    type: SUB_QUANTITY,
    id,
  };
};
export const addQuantity = (id) => {
  return {
    type: ADD_QUANTITY,
    id,
  };
};
export const emptyCart = () => {
  return {
    type: EMPTY_CART,
  };
};

const shoppingReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        oneProduct: action.payload,
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        oneProduct: action.payload,
      };
    case "SUB_QUANTITY":
      return {
        ...state,
        oneProduct: action.payload,
      };
    case "ADD_QUANTITY":
      return {
        ...state,
        oneProduct: action.payload,
      };
    case "EMPTY_CART":
      return {
        ...state,
        oneProduct: action.payload,
      };
    default:
      return state;
  }
};

export default productsReducer;
