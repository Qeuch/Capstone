import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import FormComponent from "./FormComponent";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [postResponse, setPostResponse] = useState("");
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/login",
        formData
      );

      // show message
      setPostResponse(response.data.message);

      // ALWAYS save token if it exists
      if (response.data.token) {
        Cookies.set("jwt-authorization", response.data.token);

        // redirect immediately
        navigate("/main");
      }
    } catch (error) {
      setPostResponse(
        error?.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center"
      style={{
        backgroundImage:
          "url('/images/93feef50202e7e7f220833140b3fbfe7.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black/20"></div>

      <div className="relative z-10 flex flex-col items-center w-full max-w-5xl">
        <h1 className="text-4xl md:text-6xl font-bold text-slate-500 mb-6 text-center">
          Local Football Stat Tracker
        </h1>

        <h2 className="text-2xl font-bold text-stone-500 mb-10 text-center">
          Developed by: Damien Sauve, Thomas Kolbinger, Tristan Garcia and Chad Watson
        </h2>

        <FormComponent
          formData={formData}
          handleOnSubmit={handleOnSubmit}
          handleOnChange={handleOnChange}
          postResponse={postResponse}
          title=""
          buttonText="Login"
          secondaryText="Register"
          secondaryLink="/create-user"
          showEmail={false}
        />
      </div>

      <img
        src="/images/wildcats.png"
        alt="Cornwall Wildcats logo"
        className="absolute bottom-6 right-6 w-48 z-20"
      />
    </div>
  );
}