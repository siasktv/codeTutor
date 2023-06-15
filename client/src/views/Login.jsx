import React from "react";
import ImageSlider from "../components/ImageSlider";
import Navlogo from "../components/Navlogo";
import FormLogin from "../layouts/FormLogin";

const Login = () => {
  return (
    <div className="overflow-hidden">
        <Navlogo/>
    <div className="flex">
        <div className="w-6/12 mt-20">
        <ImageSlider />

        </div>
      <div className="flex-grow flex items-center justify-center">
        <div className="w-11/12">
          <FormLogin />
        </div>
      </div>
    </div>
    </div>
    
  );
};

export default Login;