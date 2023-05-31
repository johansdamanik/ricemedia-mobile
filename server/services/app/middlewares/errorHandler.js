module.exports = (err, req, res, next) => {
  let message = 'Internal Server Error';
  let status = 500;

  switch (err.name) {
    case 'SequelizeValidationError':
    case 'SequelizeUniqueConstraintError':
      message = err.errors[0].message;
      status = 400;
      break;

    case '!tags':
      message = 'Tag is required';
      status = 400;
      break;

    case '!email':
      message = 'Email is required';
      status = 400;
      break;

    case '!password':
      message = 'Password is required';
      status = 400;
      break;

    case '!isValidPassword':
      message = 'Email/password is wrong';
      status = 401;
      break;

    case '!user':
      message = 'Email/password is wrong';
      status = 401;
      break;

    case 'InvalidToken':
    case 'JsonWebTokenError':
      message = 'Invalid Token';
      status = 401;
      break;

    case 'Forbidden':
      message = 'You are not authorized';
      status = 403;
      break;

    case '!post':
      message = 'Post not found';
      status = 404;
      break;
  }

  res.status(status).json({ message });
};
