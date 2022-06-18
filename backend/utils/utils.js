// IDK if this method is used in practice. but it seems very logical to me
const handleError = (err) => {
  if (err.name === 'CastError') {
    return [400, new Error('NotValid Data')];
  } if (err.name === 'DocumentNotFoundError') {
    return [404, new Error('User not found')];
  } if (err.name === 'ValidationError') {
    if (err.details && err.details[0]?.type) {
      return [400, new Error(err.details[0].message.replace(/"/gi, "'"))];
    }
    return [400, new Error('Validation fault')];
  } if (err.code === 11000) {
    return [400, new Error('Email is already used')];
  }
  return [500, new Error('An error has occurred on the server')];
};

module.exports = { handleError };
