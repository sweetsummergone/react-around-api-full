const { ErrorHandler } = require('./error');

const handleError = (err) => {
  if (err.name === 'CastError') {
    throw new ErrorHandler(400, 'Not Valid Data');
  } if (err.name === 'DocumentNotFoundError') {
    throw new ErrorHandler(404, 'User Not Found');
  } if (err.name === 'ValidationError') {
    if (err.details && err.details[0]?.type) {
      throw new ErrorHandler(400, err.details[0].message.replace(/"/gi, "'"));
    }
    throw new ErrorHandler(400, 'Validation fault');
  } if (err.code === 11000) {
    throw new ErrorHandler(404, 'Email is already used');
  }
  throw new ErrorHandler(500, 'An error has occurred on the server');
};

module.exports = { handleError };
