const pageNotFound = (req, res) => {
  res.status(404).send({
    error: 'Sorry, page does not exist',
    data: {},
  });
};

export default pageNotFound;
