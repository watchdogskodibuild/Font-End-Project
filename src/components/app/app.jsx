import { Routes, Route } from "react-router-dom";
import { TopBar } from "@/components/top-bar/top-bar";
// content pages
import { Home as HomePage } from "@/components/home/home";
import { About as AboutPage } from "@/components/about/about";
import { Contact as ContactPage } from "@/components/contact/contact";
import {Login} from "@/components/login/login";
import { NoMatch } from "@/components/not-found/not-found";
import '@/styles/main.css';
// navigation
import { SideBar } from "../side-bar/side-bar";
import { Signup } from "../signup/signup";

export const App = () => (
  <>
    <div dir="rtl">
      <TopBar>
      </TopBar>
      <SideBar> 
      </SideBar>  
      <div className="mainRoute">
        <Routes >
        <Route path="*" element={<NoMatch />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      
      </Routes>
      </div>
    </div>
  
  </>
); 