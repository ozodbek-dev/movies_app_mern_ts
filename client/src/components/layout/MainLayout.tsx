import React from 'react';
import {Box} from "@mui/material";
import {Outlet} from "react-router-dom";
import GlobalLoading from "../common/GlobalLoading";
import Footer from "../common/Footer";
import Topbar from "../common/Topbar";

const MainLayout = () => {
    return (
        <>
        {/*    global Loading*/}
            <GlobalLoading/>
        {/*    global Loading*/}

        {/*    login modal*/}
        {/*    login modal*/}

            <Box display="flex" minHeight="100vh">

            {/*    header*/}
                <Topbar/>
            {/*    header*/}

            {/*    main*/}
                <Box
                    component="main"
                    flexGrow={1}
                    overflow="hidden"
                    minHeight="100vh"
                >
                    <Outlet/>
                </Box>
            {/*    main*/}

            </Box>

        {/*    Footer*/}
            <Footer/>
        {/*    Footer*/}

        </>
    );
};

export default MainLayout;
