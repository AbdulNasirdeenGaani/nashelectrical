import express from "express";
import {
  addProductsController,
  allProductsController,
  deleteProductsController,
  UpdateProductsController,
  viewSingleProductController,
} from "../controllers/route.controller.js";
const router = express.Router();

router.get("/", allProductsController); // View all Products

router.get("/edit/:id", viewSingleProductController);

router.post("/add", addProductsController); // add a Product

router.put("/edit/:id", UpdateProductsController); // Update a Product

router.delete("/delete/:id", deleteProductsController); // delete a Product

export default router;
