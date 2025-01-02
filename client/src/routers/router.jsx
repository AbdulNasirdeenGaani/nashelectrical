import { createBrowserRouter } from "react-router-dom";
import EditItem from "../components/EditItem";
import Home from "../pages/Home.jsx";
import UploadItem from "../components/Upload.jsx";

const router = createBrowserRouter([
  {
    path: "/edit/:id",
    element: <EditItem />,
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/upload",
    element: <UploadItem />,
  },
]);

export default router;
