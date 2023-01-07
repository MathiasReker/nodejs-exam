export const notFound = (req, res) => {
  res.status(404).send({
    error: 'Not found',
  });
};

export const handler = (req, res) => {
  if (process.env.NODE_ENV === 'dev') {
    return;
  }

  res.status(500).send({
    error: 'Something broke. Try again later',
  });
};
