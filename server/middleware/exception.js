const exception = (req, res) => {
  if (process.env.NODE_ENV === 'dev') {
    return;
  }

  res.status(500).send({
    error: 'Something broke. Try again later',
    data: {},
  });
};

export default exception;
