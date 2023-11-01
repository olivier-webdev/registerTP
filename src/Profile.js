import styles from "./Profile.module.scss";

export default function Profile({ user, changeView }) {
  return (
    <div>
      <h1 className="my30">Profile</h1>
      {user ? (
        <div className={`d-flex flex-column justify-content-center mt20`}>
          <h2 className="mt20">username : {user.username}</h2>
          <h2 className="mt20">email : {user.email}</h2>
          <h2 className="mt20">gender : {user.gender}</h2>
          <h2 className="mt20">techno : {user.techno}</h2>
          <ul>
            {user.hobbies.map((h, i) => (
              <h3 key={i} className="mt20 d-flex justify-content-between">
                <span>Hobby :</span> {h.hobby} | <span>Level : </span>
                {h.level}
              </h3>
            ))}
          </ul>
        </div>
      ) : (
        changeView("login")
      )}
    </div>
  );
}
