import Homepage from "./Homepage";
import Register from "./Register";
import { useState } from "react";

function App() {
  const [location, setLocation] = useState("register");

  function changeView() {
    setLocation("homepage");
  }

  return (
    <div
      className={`mh100 d-flex flex-column justify-content-center align-items-center`}
    >
      {location === "register" ? (
        <Register changeView={changeView} />
      ) : (
        <Homepage />
      )}
    </div>
  );
}

export default App;
