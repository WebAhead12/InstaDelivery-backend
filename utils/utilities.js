const throwError = (errorMessage, errorStatus) => {
  const error = new Error(errorMessage);
  error.status = errorStatus;
  throw error;
};

//calculate total price of items added to cart.
const totalPrice = (arrayOfItems) => {
  let sum = 0;
  for (let item of arrayOfItems) {
    sum += item.price * item.quantity;
  }
  return sum.toFixed(2);
};

module.exports = { throwError, totalPrice };
