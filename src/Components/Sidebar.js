import React from "react";
const style = {
  backgroundColor: "#323e4d",
  position: "fixed",
  top: 0,
  left: 0,
  width: "250px",
  height: "100vh",
  zIndex: 2,
};
export const Sidebar = () => {
  return <div className="sidebar" style={style}></div>;
};
