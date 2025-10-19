import express from "express";
import homeController from "../controller/homeController";

const router = express.Router();

/**
 *
 * @param {} app - express app
 */

const initWebRoutes = (app) => {
  //path, handler
  router.get("/", homeController.handleHelloWorld);
  router.get("/user", homeController.handleUserPage);
  router.post("/users/create-user", homeController.handleCreateNewUser);
  router.post("/delte-user/:id", homeController.handleDelteUser);

  router.get("/about", (req, res) => {
    return res.send("Pham Dinh Nam");
  });

  return app.use("/", router);
};
export default initWebRoutes;
