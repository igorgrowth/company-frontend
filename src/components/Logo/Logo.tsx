import { FC } from "react";
import { Link } from "react-router-dom";
import "./Logo.scss";

const Logo: FC = () => {
  return (
    <Link className="logo__link" to="/">
      <h2 className="logo">
        <span className="logo__span">IGOR</span>GROW
        <span className="logo__span">TH</span>
      </h2>
    </Link>
  );
};

export default Logo;
