const { Router } = require("express");
const {
  get,
  add,
  update,
  deleteCrud,
  search,
} = require("../controller/crudController");

const crudRouter = Router();

crudRouter.get("/get", get);
crudRouter.post("/add", add);
crudRouter.put("/update/:id", update);
crudRouter.delete("/delete/:id", deleteCrud);
crudRouter.get("/search/:id", search);

module.exports = crudRouter;
