import React from "react";
import ImageSlider from "../components/ImageSlider";
import Navlogo from "../components/Navlogo";
import FormRegister from "../layouts/FormRegister";

const Register = () => {
  return (
    <div className="overflow-hidden">
        <Navlogo/>
    <div className="flex">
        <div className="w-6/12 mt-20">
        <ImageSlider />

        </div>
      <div className="flex-grow flex items-center justify-center">
        <div className="w-11/12">
          <FormRegister />
        </div>
      </div>
    </div>
    </div>
    
  );
};

export default Register;