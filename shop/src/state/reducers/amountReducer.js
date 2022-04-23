const cartReducer = (state = [], action) => {
  switch (action.type) {
    case "add":
      const exist = state.find((x) => x.id === action.id);
      if (exist) {
        return state.map((x) =>
          x.id === action.id ? { ...x, quantity: x.quantity + 1 } : x
        );
      } else {
        return [
          ...state,
          {
            id: action.id,
            title: action.title,
            price: action.price,
            image: action.image,
            quantity: 1,
          },
        ];
      }

    case "remove":
      console.log("remove" + action.payload);
      return state.filter((item) => item.title !== action.payload);

    case "in":
      return state.map((x) =>
        x.id === action.q1 ? { ...x, quantity: x.quantity + 1 } : x
      );
    case "dc":
      return state.map((x) =>
        x.id === action.q2 ? { ...x, quantity: x.quantity - 1 } : x
      );

    default:
      return state;
  }
};
export default cartReducer;
