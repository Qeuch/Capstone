import { jwtDecode } from "jwt-decode";

export function getUser() {
  const token = localStorage.getItem("token");
  console.log("TOKEN:", token);

  if (!token) return null;

  try {
    return jwtDecode(token);
  } catch (err) {
    console.log("DECODE ERROR:", err);
    return null;
  }
}