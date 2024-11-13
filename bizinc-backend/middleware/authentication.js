module.exports = function (req, res, next) {
  // Check if the user is authenticated (logged in)
  if (req.isAuthenticated()) {
    // If the user is authenticated, allow them to proceed to the next middleware or route handler
    return next();
  }

  // If the user is not authenticated, send a 401 Unauthorized status with a message
  res.status(401).json({ message: 'User not authenticated' });
}
