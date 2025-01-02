import React from "react";
import Search from "../components/Search";
import Items from "../components/Items";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="">
      <Link to={"/upload"}>Add Item</Link>
      <Search />
      <Items />
    </div>
  );
};

export default Home;
