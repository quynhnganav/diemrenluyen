import React from "react";
import { useLocation } from "react-router-dom";

const Page404 = () => {
    const location = useLocation();
  console.log(location.pathname)
    return 404
}

export default Page404