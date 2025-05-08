import Header from "./Header.jsx";
import {Outlet, RouterProvider} from "react-router";
import {useEffect, useState} from "react";
import ApiService from "../services/ApiService.js";
import Spinner from 'react-bootstrap/Spinner';
export const apiService = new ApiService();

function Root() {
    const [init, setInit] = useState(false);
    useEffect( () => {
        (async () => {
            setInit(await apiService.initializeVtd());
        })();
    },[]);
    
    return (
        <>
            {init &&
                <div style={{backgroundColor: "#F5F7F9"}}>
                    <Header/>
                    <Outlet/>
                </div>
            }
            {!init &&
                <Spinner animation="border" variant="primary" />
            }
        </>
    );
}

export default Root;
