export default function FormComponent({ currentPage }) {
  return (
    // Form for login / register
    <div>
      <h1>{currentPage === "create-user" ? "Register" : "Login"}</h1>
    </div>
  );
}
