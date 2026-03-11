import FormComponent from "./FormComponent";
import { useState } from "react";
import axios from "axios";

export default function RegisterPage() {
  //States
  const [formData, setFormData] = useState({ username: "", password: "", email: ""});
  const [postResponse, setPostResponse] = useState("");

  //Handlers
  const handleOnChange = (e) => {
    setFormData((prevData) => {
      return { ...prevData, [e.target.name]: e.target.value };
    });
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post("http://localhost:3000/create-user", {
        ...formData,
      });
      setPostResponse(response.data.message);
    } catch (error) {
      console.log(error);
      setPostResponse(error.response?.data?.message || "Something went wrong.");
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    handleRegister();
    setFormData({ username: "", password: "", email: ""});
  };


  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center"
      style={{
        backgroundImage: "url('/images/93feef50202e7e7f220833140b3fbfe7.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black/20"></div>

      <div className="relative z-10 flex flex-col items-center w-full max-w-5xl">
        <h1 className="text-4xl md:text-6xl font-bold text-slate-500 text-outline-red mb-6 text-center shadow-lg shadow-red-500/50 font-serif">
          Create a New User:
        </h1>


        <FormComponent
          formData={formData}
          handleOnSubmit={handleOnSubmit}
          handleOnChange={handleOnChange}
          postResponse={postResponse}
          title=""
          buttonText="Register"
          secondaryText="Back to Login"
          secondaryLink="/"
          showEmail={true}
        />
      </div>

      <img
        src="/images/Cornwall-Wildcats-logo-rev.png"
        alt="Cornwall Wildcats logo"
        className="absolute bottom-6 right-6 w-48 z-20"
      />
    </div>
  );
}