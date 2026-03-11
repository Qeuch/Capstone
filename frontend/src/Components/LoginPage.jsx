import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";
import { CgPassword } from "react-icons/cg";
import { FaRegUser } from "react-icons/fa";

export default function LoginPage() {
  const [formData, setFormData] = useState({ username: "", password: "" });
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

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center px-4 relative"
      style={{
        backgroundImage:
          "url('images/93feef50202e7e7f220833140b3fbfe7.jpg')",
      }}
    >
      {/* dark overlay */}
      <div className="absolute inset-0 bg-black/35"></div>

      {/* content */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-5xl">
        <h1 className="text-4xl md:text-6xl font-bold text-slate-700 mb-10 text-center shadow-lg shadow-red-500/50 font-serif text-outline-red">
          Local Football Stat Tracker
        </h1>

        <div className="w-full max-w-md rounded-[2rem] border-4 border-red-500 bg-black px-8 py-8 shadow-2xl">
          <form onSubmit={handleOnSubmit} className="space-y-6">
            <div>
              <label className="block text-white text-lg mb-2">Username</label>
              <div className="flex items-center gap-3 rounded-xl bg-white px-4 py-4">
                <FaRegUser className="text-gray-500 text-xl" />
                <input
                  type="text"
                  name="username"
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={handleOnChange}
                  className="w-full bg-transparent outline-none text-gray-800 placeholder:text-gray-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-white text-lg mb-2">Password</label>
              <div className="flex items-center gap-3 rounded-xl bg-white px-4 py-4">
                <CgPassword className="text-gray-500 text-xl" />
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleOnChange}
                  className="w-full bg-transparent outline-none text-gray-800 placeholder:text-gray-400"
                />
              </div>
            </div>

            {postResponse && (
              <p className="text-center text-red-300 text-sm">{postResponse}</p>
            )}

            <div className="flex justify-center gap-6 pt-6">
              <button
                type="submit"
                className="w-40 bg-zinc-800 text-white py-3 rounded-xl hover:bg-zinc-700 transition">
                  Login
                </button>
                <button type="button" onClick={() => navigate("/create-user")}
                className="w-40 bg-zinc-800 text-white py-3 rounded-xl hover:bg-zinc-700 transition">
              Register
            </button>
            </div>
          </form>
        </div>
      </div>

      <img
        src="images\baltimore-ravens-logo-png_seeklogo-196542.png"
        alt=""
        className="absolute bottom-6 left-6 w-24 md:w-32 z-10"
      />
      <img
        src="images\Cornwall-Wildcats-logo-rev.png"
        alt=""
        className="absolute bottom-6 right-6 w-24 md:w-32 z-10"
      />
    </div>
  );
}