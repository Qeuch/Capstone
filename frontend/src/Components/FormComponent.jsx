import { useState } from "react";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";

export default function FormComponent({
  formData,
  handleOnSubmit,
  handleOnChange,
  currentPage,
}) {
  const [isLogin, setIsLogin] = useState();

  return (
    <div>
      <h1>
        {currentPage ? <RegisterPage /> : <LoginPage />}
      </h1>
    </div>
  )
}


