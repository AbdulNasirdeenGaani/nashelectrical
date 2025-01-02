import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBoxOpen } from "react-icons/fa6";
import ClickOutsideEffect from "./ClickOutsideEffect";

const ItemSearcher = () => {
  const [items, setItems] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [filteredItems, setFilteredItems] = useState(null);
  const [isFocused, setIsFocused] = useState(false);
  useEffect(() => {
    fetch("http://localhost:3000")
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
      });
  }, []);

  const handleSearch = () => {
    if (!searchString) return;
    setSearchString(searchString);
    const found = items?.filter((product) => {
      const fields = (
        product?.productName + product?.productPrice
      )?.toLowerCase();

      if (fields?.includes(searchString)) return product;
    });

    setFilteredItems(found);
  };

  useEffect(() => {
    handleSearch(searchString);
  }, [searchString]);

  return (
    <ClickOutsideEffect
      setIsOpen={setIsFocused}
      className=" z-20 relative grow"
    >
      <input
        onFocus={() => {
          setIsFocused(true);
        }}
        onChange={(e) => setSearchString(e.target.value?.toLowerCase())}
        value={searchString}
        type="search"
        className="p-3 rounded-full bg-slate-50 text-center w-full min-w-32 sm:min-w-60 grow outline-primary"
        placeholder="Search Item by title, desc, price"
      />
      {searchString && isFocused ? (
        <ul
          className={` fixed -right-1 left-0 top-auto min-h-[50vh] h-auto max-h-[80vh] overflow-y-auto z-50 shadow-xl bg-white bg-opacity-95 rounded-b`}
        >
          <li
            hidden={!searchString}
            className="p-2 px-5 pb-0 text-sm w-full grow bg-white"
          >
            {filteredItems?.length == 0 ? (
              <div className="flex flex-col justify-center items-center text-xl text-neutral-600">
                <FaBoxOpen size={80} /> <p>No Products found </p>
              </div>
            ) : (
              filteredItems?.length + " found"
            )}
          </li>
          {filteredItems?.length > 1 &&
            filteredItems?.map((item, index) => (
              <li key={index}>
                <ItemTile item={item} setIsFocused={setIsFocused} />
              </li>
            ))}
        </ul>
      ) : null}
    </ClickOutsideEffect>
  );
};

export default ItemSearcher;

const ItemTile = ({ item, setIsFocused }) => {
  const { productName, productDescription } = item;
  const navigate = useNavigate();
  return (
    <button
      onClick={() => {
        navigate("/edit/" + item?._id);
        setIsFocused(false);
      }}
      className="flex items-center gap-2 p-1 px-5 w-full bg-white hover:bg-slate-100 transition-all duration-200 cursor-pointer"
    >
      <div className="grow space-y-2  text-sm font-normal ">
        <p className="font-semibold line-clamp-1 ">{productName}</p>
        <p className="line-clamp-1">{productDescription}</p>
      </div>
    </button>
  );
};
