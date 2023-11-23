import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ListMed from "./components/med/ListMed";
import CreateMed from "./components/med/CreateMed";
import ViewMed from "./components/med/ViewMed";
import EditMed from "./components/med/EditMed";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";


const router = createBrowserRouter([
    { path: '', element: <App/> },
    { path: 'med/list', element: <ListMed/> },
    { path: 'med/list/create' , element : <CreateMed/> },
    { path: 'med/list/:medId', element: <ViewMed/>},
    { path: 'med/list/:medId/edit', element: <EditMed/>},
    { path: 'register', element:<Register/>},
    { path: 'login', element:<Login/>},
]);

export default router;