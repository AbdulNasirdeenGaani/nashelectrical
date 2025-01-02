import React, { useEffect, useState } from "react";
import { Table } from "flowbite-react";
import { Link } from "react-router-dom";
import axios from "axios";

const Items = () => {
  const [items, setItems] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const allProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:3000");
        setItems(response.data);
      } catch (error) {
        console.log("Fetch Error: ", error);
      } finally {
        setLoading(false);
      }
    };

    allProducts();
  }, []);

  // Delete a Product
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3000/delete/${id}`);
    setItems(items.filter((item) => item._id !== id)); //Update the state after deletion
    alert("Item Deleted Successfully");
  };

  return (
    <div className="overflow-x-auto">
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>Product Number</Table.HeadCell>
          <Table.HeadCell>Product name</Table.HeadCell>
          <Table.HeadCell>Product Description</Table.HeadCell>
          <Table.HeadCell>Price</Table.HeadCell>
          <Table.HeadCell>Manage Products</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        {items?.map((item, index) => (
          <Table.Body className="divide-y" key={item?._id}>
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell>{index + 1}</Table.Cell>
              <Table.Cell>{item.productName}</Table.Cell>
              <Table.Cell>{item.productDescription}</Table.Cell>
              <Table.Cell>{item.productPrice}</Table.Cell>
              <Table.Cell>
                <Link
                  to={`/edit/${item?._id}`}
                  className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 mr-5"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(item?._id)}
                  className="bg-red-500 px-4 py-1 font-semibold text-white rounded-sm hover:bg-sky-600"
                >
                  Delete
                </button>
              </Table.Cell>
            </Table.Row>
            ;
          </Table.Body>
        ))}
      </Table>
      {loading && (
        <div className="p-20 text-center min-h-[60vh] flex justify-center text-neutral-600 text-3xl">
          Loading Items...
        </div>
      )}
      {!loading && items?.length == 0 && (
        <div className="p-20 text-center min-h-[60vh] flex justify-center text-neutral-600 text-3xl">
          You do not have items yet
        </div>
      )}
    </div>
  );
};

export default Items;
