import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Login } from "./pages/login";
import { Resetpass } from "./pages/resetpass";
import { Signup } from "./pages/signup";
import { Psicho } from "./pages/psicho";
import { Usuario } from "./pages/usuario";
import { Single } from "./pages/single";
import { ChangePsico } from "./pages/ChangePsico";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

//create your first component
const Layout = () => {
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL === "") return <BackendURL />;

    return (
        
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/demo" element={<Demo />} />
                            <Route path="/Signup" element={<Signup />} />
                            <Route path="/Resetpass" element={<Resetpass />} />
                            <Route path="/Login" element={<Login />} />
                            <Route path="/Psicho" element={<Psicho />} />
                            <Route path="/Usuario" element={<Usuario />} />
                            <Route path="/single/:id" element={<Single />} />
                            <Route path="/ChangePsico/:id" element={<ChangePsico />} />

                            <Route element={<h1>Not found!</h1>} />
                        </Routes>
                    
                    
                </ScrollToTop>
                <Footer />
            </BrowserRouter>
        
    );
};

export default injectContext(Layout);

