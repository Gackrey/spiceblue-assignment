import React from "react";
// import { Counter } from "./features/counter/Counter";
import { Task } from "./features/Tasks/Task";
import { Navbar, Sidebar } from "./Components";
function App() {
  return (
    <div className="App">
      <Navbar />
      <Sidebar />
      <Task />
    </div>
  );
}

export default App;
