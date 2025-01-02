import React, { useState } from "react";
import { Button, Label, TextInput, Textarea } from "flowbite-react";
import { useParams } from "react-router-dom";

const UploadOrUpdate = ({ existingItem }) => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const form = event.target;
      const productName = form.productName.value;
      const productDescription = form.productDescription.value;
      const productPrice = form.productPrice.value;
      if (!existingItem) {
        //   Upload Item
        const itemObj = {
          productName,
          productDescription,
          productPrice,
        };

        if (
          !itemObj.productName ||
          !itemObj.productDescription ||
          !itemObj.productPrice
        ) {
          return console.log("Please fill all the inputs field");
        }

        fetch("http://localhost:3000/add", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(itemObj),
        })
          .then((res) => res.json())
          .then((data) => alert(data.message));
        form.reset();
        setLoading(false);
      } else {
        //Update instead

        const itemObj = {
          productName,
          productDescription,
          productPrice,
        };

        fetch(`http://localhost:3000/edit/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(itemObj),
        })
          .then((res) => res.json())
          .then((data) => {
            alert(data.message);
            form.reset();
          });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>{existingItem ? "Update " : "Upload"}</h2>
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
              defaultValue={existingItem?.productName}
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
              defaultValue={existingItem?.productDescription}
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
              defaultValue={existingItem?.productPrice}
            />
          </div>
        </div>

        <Button className="mt-5 w-fit px-5 m-auto" type="submit">
          {existingItem ? (
            <span> {loading ? "Updating..." : "Update Item"}</span>
          ) : (
            <span> {loading ? "Uploading..." : "Upload Item"}</span>
          )}
        </Button>
      </form>
    </div>
  );
};

export default UploadOrUpdate;
