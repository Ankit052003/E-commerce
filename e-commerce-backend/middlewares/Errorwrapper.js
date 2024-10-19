function AsyncWrapper(route) {
  return async (req, res, next) => {
    try {
      await route(req, res, next);
    } catch (error) {
      // Optionally attach additional context to the error, if needed
      error.status = error.status || 500; // Default to 500 if no status is set
      next(error);
    }
  };
}

module.exports = AsyncWrapper;
