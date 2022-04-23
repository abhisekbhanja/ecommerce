export const addproduct = (title, image, price, id) => {
  return {
    type: "add",
    title: title,
    image: image,
    price: price,
    id: id,
  };
};

export const removeproduct = (title) => {
  return {
    type: "remove",
    payload: title,
  };
};

export const incquantity = (q1) => {
  return {
    type: "in",
    q1: q1,
  };
};
export const decquantity = (q2) => {
  return {
    type: "dc",
    q2: q2,
  };
};
