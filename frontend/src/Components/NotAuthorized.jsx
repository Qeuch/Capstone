// NOT AUTHORIZED
// any naughty users trying to bypass the login,
// or non-admins trying to reach admin pages should be brought here

import { Link } from "react-router-dom";

export default function NotAuthorized() {
  return (
    <div>
      <h1>Error 403: User Not Authorized to see this page</h1>
      <Link to="/">Please login first</Link>
    </div>
  );
}
