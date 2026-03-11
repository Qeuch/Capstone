import { FaRegUser } from "react-icons/fa";
import { CgPassword } from "react-icons/cg";
import { MdOutlineEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function FormComponent({
  formData,
  handleOnSubmit,
  handleOnChange,
  showEmail,
  postResponse,
  buttonText,
  secondaryText,
  secondaryLink,
}) {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-md rounded-[2rem] border-4 border-red-500 bg-black px-9 py-8 shadow-2xl">
      <form onSubmit={handleOnSubmit} className="space-y-5">
        <div>
          <label className="block text-white text-lg text-center mb-2">
            Username
          </label>
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
          <label className="block text-white text-lg text-center mb-2">
            Password
          </label>
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

        {showEmail && (
          <div>
            <label className="block text-white text-lg text-center mb-2">
              Email
            </label>
            <div className="flex items-center gap-3 rounded-xl bg-white px-4 py-4">
              <MdOutlineEmail className="text-gray-500 text-xl" />
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleOnChange}
                className="w-full bg-transparent outline-none text-gray-800 placeholder:text-gray-400"
              />
            </div>
          </div>
        )}

        {postResponse && (
          <p className="text-center text-red-400 font-semibold">
            {postResponse}
          </p>
        )}

        <div className="flex justify-center gap-6 pt-3">
          <button
            type="submit"
            className="w-36 rounded-xl bg-zinc-800 py-3 text-white font-semibold hover:bg-zinc-700 transition"
          >
            {buttonText}
          </button>

          <button
            type="button"
            onClick={() => navigate(secondaryLink)}
            className="w-36 rounded-xl bg-zinc-800 py-3 text-white font-semibold hover:bg-zinc-700 transition"
          >
            {secondaryText}
          </button>
        </div>
      </form>
    </div>
  );
}