const crudSchema = require("../schema/crud.schema");

const get = async (req, res, next) => {
  try {
    const data = await crudSchema.find();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const add = async (req, res, next) => {
  try {
    const { username, birthDate } = req.body;
    const addedUser = await crudSchema.create({ username, birthDate });
    res.status(201).json(addedUser);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const updatedData = await crudSchema.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!updatedData) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(updatedData);
  } catch (error) {
    next(error);
  }
};

const deleteCrud = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedData = await crudSchema.findByIdAndDelete(id);
    if (!deletedData) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted", id });
  } catch (error) {
    next(error);
  }
};

const search = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await crudSchema.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  get,
  add,
  update,
  deleteCrud,
  search,
};
