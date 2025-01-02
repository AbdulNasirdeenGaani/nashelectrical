import Home from "./pages/Home";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import EditItem from "./components/EditItem";
import UploadOrUpdate from "./components/Upload.Update";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/edit/:id" element={<EditItem />} />
        <Route path="/upload" element={<UploadOrUpdate />} />
      </Routes>
    </div>
  );
}

export default App;
