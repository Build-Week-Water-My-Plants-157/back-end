

const find = async (req, res, next) => {
  if (!req.id) {
    res.status(400).json({ error: { message: "User doesn't exist" } });
    return;
  }

  req.user = user;
  next();
};

const findPlant = async (req, res, next) =>  {
  if(!res.id) {
    res.status(400).json({error: {message: "Plant does not exist"}})
    return
  }
  req.plant = plant
  next()
}

module.exports = {find, findPlant}