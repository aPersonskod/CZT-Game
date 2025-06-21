import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router";
import SummaryPage from "./pages/SummaryPage.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import Root from "./pages/Root.jsx";
import DetailsPage from "./pages/DetailsPage.jsx";
import IndicatorsPage from "./pages/IndicatorsPage.jsx";
import NewIndicationsPage from "./pages/NewIndicationsPage.jsx";

const router = createBrowserRouter([
    {path: '/CZT-Game', Component: Root, 
        children:[
            {path: '', Component: SummaryPage},
            {path: 'indicators', Component: IndicatorsPage},
            {path: 'new-indicators', Component: NewIndicationsPage},
            {path: 'details', Component: DetailsPage},
        ]}
]);

createRoot(document.getElementById('root')).render(
        <RouterProvider router={router}/>
)
