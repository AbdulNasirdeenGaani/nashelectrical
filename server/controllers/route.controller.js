import { Schema } from "mongoose";
import Product from "../models/Product.js";

// View all products
export const allProductsController = async (req, res, next) => {
  try {
    //Return all instead
    const allProducts = await Product.find().sort({
      productName: "asc",
    });
    res.status(200).json(allProducts);
  } catch (error) {
    res.status(500).json(null);
  }
};

// Add product
export const addProductsController = async (req, res, next) => {
  const { productName, productDescription, productPrice } = req.body;

  let newProduct = await Product.findOne({ productDescription });

  if (newProduct) return res.send("Product already exist");

  newProduct = Product({
    productName,
    productDescription,
    productPrice,
  });
  await newProduct.save();

  res.status(201).json({ code: 201, message: "Product added successfully" });

  try {
  } catch (error) {
    next(error);
  }
};

// Update product
export const UpdateProductsController = async (req, res) => {
  try {
    // const parsedId = parseInt(req.params.id);
    const { id } = req.params;
    const { _id, ...others } = req.body;
    // const { productName, productDescription, productPrice } = req.body;

    const item = await Product.findById(id);
    console.log("Item at controler", item);

    if (!item) {
      return res.json({ message: "Product not found" });
    }

    await Product.findByIdAndUpdate(id, { $set: { ...others } });

    // item.productName = productName;
    // item.productDescription = productDescription;
    // item.productPrice = productPrice;

    // await item.save();
    res.json({ message: "Product updated" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete product
export const deleteProductsController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const item = await Product.findById(id);

    if (!item) {
      res.send("Product not Found");
    }

    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: "Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// app.get("/edit/:id", );
export const viewSingleProductController = async (req, res, next) => {
  const id = req.params.id;
  try {
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(null);
  }
};
