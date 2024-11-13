// Logger middleware function to log HTTP requests and response status
const Logger = (req, res, next) => {
  // Log the HTTP method, request path, and the current date and time in ISO format
  console.log(`${req.method} ${req.path} - ${new Date().toISOString()}`);
  // Pass the request to the next middleware or route handler
  next();
  // Log the response status code after the response has been sent
  console.log(`${res.statusCode}`);
};

// Export the Logger function to be used in other parts of the application
module.exports = Logger;
