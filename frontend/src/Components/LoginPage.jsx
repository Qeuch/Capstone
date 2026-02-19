import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FormComponent from "./FormComponent";
import Cookies from "js-cookie";

export default function LoginPage() {
  // States
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [postResponse, setPostResponse] = useState("");

  const navigate = useNavigate();

  // Handlers
  const handleOnChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3000/", formData);

      setPostResponse(response.data.message);

      if (response.status === 201) {
        Cookies.set("jwt-authorization", response.data.token);
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
  <div/>

  return (
    <div className="football-background">
      <FormComponent
        formData={formData}
        postResponse={postResponse}
        handleOnChange={handleOnChange}
        handleOnSubmit={handleOnSubmit}
        nextPage="create-user"
        currentPage="/"
      />

      <div className="register-button">
        <button type="button"><a href="/create-user">Register </a></button>
      </div >
    </div>
  );
}

