export const notFound = (req, res) => {
  res.sendStatus(404);
};

export const handler = (req, res) => {
  if (process.env.NODE_ENV === 'dev') {
    return;
  }

  res.status(500).send({
    error: 'Something broke. Try again later',
    data: {},
  });
};
