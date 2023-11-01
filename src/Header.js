import styles from "./Header.module.scss";
import logo from "./assets/images/logo.png";

export default function Header({ changeView, user, setUser }) {
  return (
    <header className={`d-flex align-items-center ${styles.header}`}>
      <div className="flex-fill">
        <img src={logo} alt="logo" onClick={() => changeView("homepage")} />
      </div>

      {user ? (
        <ul className={``}>
          <button
            onClick={() => {
              setUser(null);
              changeView("profile");
            }}
            className="mr10 btn btn-primary"
          >
            <span>Logout</span>
          </button>
          <button
            className="mr10 btn btn-primary-reverse"
            onClick={() => changeView("profile")}
          >
            <span>Profile</span>
          </button>
        </ul>
      ) : (
        <ul className={``}>
          <button
            className="mr10 btn btn-primary"
            onClick={() => changeView("register")}
          >
            <span>Register</span>
          </button>
          <button
            className="mr10 btn btn-primary-reverse"
            onClick={() => changeView("login")}
          >
            <span>Login</span>
          </button>
        </ul>
      )}
    </header>
  );
}
