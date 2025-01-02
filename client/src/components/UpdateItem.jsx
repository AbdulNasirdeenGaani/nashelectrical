import React, { useState } from "react";
import { Button, Label, TextInput } from "flowbite-react";

const UpdateItem = ({ item }) => {
  const [loading, setLoading] = useState(false);

  console.log("ITEM AT UPDATEITEM: ", item);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      // Get form inputs
      const form = event.target;
      const productName = form.productName.value;
      const productDescription = form.productDescription.value;
      const productPrice = form.productPrice.value;

      // Update Product
      const itemObj = {
        productName,
        productDescription,
        productPrice,
      };

      const response = await fetch(`http://localhost:3000/edit/${item?._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(itemObj),
      });

      const data = await response.json();

      alert(data.message);

      form.reset();
    } catch (error) {
      console.log("Error: ", error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <h2>Update Item</h2>
      <form onSubmit={handleSubmit} className="flex flex-col flex-wrap gap-4">
        <div className="flex gap-8">
          {/* product Name */}
          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="productName" value="Product Name" />
            </div>
            <TextInput
              id="productName"
              type="text"
              placeholder="Enter Product Name"
              name="productName"
              required
              defaultValue={item?.productName}
            />
          </div>
          {/* product Description */}
          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="productDescription" value="Product Description" />
            </div>
            <TextInput
              id="productDescription"
              type="text"
              placeholder="Enter Product Description"
              name="productDescription"
              required
              defaultValue={item?.productDescription}
            />
          </div>
          {/* product Price */}
          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="productPrice" value="Product Price" />
            </div>
            <TextInput
              id="productPrice"
              type="number"
              placeholder="Enter Product Price"
              name="productPrice"
              required
              defaultValue={item?.productPrice}
            />
          </div>
        </div>

        <Button className="mt-5 w-fit px-5 m-auto" type="submit">
          {loading ? "Updating..." : "Update Item"}
        </Button>
      </form>
    </div>
  );
};

export default UpdateItem;
