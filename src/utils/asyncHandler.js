const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => {
      if (next) {
        next(err);
      } else {
        console.error("Unhandled error:", err);
      }
    });
  };
};

const asyncCronHandler = (cronHandler) => {
  return () => {
    Promise.resolve(cronHandler()).catch((err) => {
      console.error("Error in cron job:", err);
    });
  };
};

export { asyncHandler, asyncCronHandler };
