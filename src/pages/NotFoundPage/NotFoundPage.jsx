import { NavLink } from "react-router-dom";
import s from "./NotFoundPage.module.css"; // Імпортуємо стилі

const NotFoundPage = () => {
  return (
    <div className={s.container}>
      <h1 className={s.title}>404</h1>
      <p className={s.message}>
        Sorry, the page you are looking for does not exist.
      </p>
      <NavLink to="/" className={s.homeLink}>
        Go back to Home
      </NavLink>
    </div>
  );
};

export default NotFoundPage;
