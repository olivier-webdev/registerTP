import Header from "./Header";
import Homepage from "./Homepage";
import Login from "./Login";
import Profile from "./Profile";
import Register from "./Register";
import { useState } from "react";

function App() {
  const [location, setLocation] = useState("register");
  const [user, setUser] = useState(null);
  console.log(location);

  return (
    <div className={`mh100 d-flex flex-column align-items-center`}>
      <Header changeView={setLocation} user={user} setUser={setUser} />
      {location === "register" ? (
        <Register changeView={setLocation} />
      ) : location === "login" ? (
        <Login setUser={setUser} changeView={setLocation} />
      ) : location === "profile" ? (
        <Profile user={user} changeView={setLocation} />
      ) : (
        <Homepage />
      )}
    </div>
  );
}

export default App;
