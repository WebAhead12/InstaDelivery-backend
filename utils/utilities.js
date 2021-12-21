const throwError = (errorMessage, errorStatus) => {
  const error = new Error(errorMessage);
  error.status = errorStatus;
  throw error;
};

module.exports = { throwError };
