import React from "react";
const style = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "50px",
  border: "1px solid #ebebeb",
  boxShadow: "0 .125rem .25rem rgba(0,0,0,.075)",
  zIndex: 1,
};
export const Navbar = () => {
  return <div className="navbar" style={style}></div>;
};
