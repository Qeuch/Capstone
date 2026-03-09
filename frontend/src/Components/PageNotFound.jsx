// PAGE NOT FOUND
// Any random crap put in as a url should lead here

import { Link } from "react-router-dom";

export default function NotAuthorized() {
  return (
    <div>
      <h1>Error 403: User Not Authorized to see this page</h1>
      <Link to="/">Please login first</Link>
    </div>
  );
}
