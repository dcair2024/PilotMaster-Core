import { Navigate, useParams } from "react-router-dom";

export default function RequireParam({ name, redirectTo, children }) {
  const params = useParams();
  const value = params[name];

  const isInvalid =
    value === undefined ||
    value === null ||
    value === "" ||
    value === "undefined" ||
    value === "null";

  if (isInvalid) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
}

