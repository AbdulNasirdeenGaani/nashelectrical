import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UploadOrUpdate from "./Upload.Update.jsx";

const EditItem = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    const getMyItem = async () => {
      try {
        const res = await fetch("http://localhost:3000/edit/" + `${id}`);
        const itm = await res.json();
        setItem(itm); // Set the state with the data we need
      } catch (err) {
        console.error("Fetch err: ", err); // Log the error for debugging
      }
    };

    getMyItem();
  }, []); // Add id as a dependency to re-fetch if it changes

  return (
    <div className="px-4 my-12">
      <UploadOrUpdate existingItem={item} />
    </div>
  );
};

export default EditItem;
