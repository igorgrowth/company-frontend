import AdminMenu from "../AdminMenu/AdminMenu";
import Logo from "../Logo/Logo";
import Navigation from "../Navigation/Navigation";
import company from "../../utils/stores/company";
import "./Header.scss";

const Header: React.FC = () => {
  return (
    <header className="header">
      <Logo />
      <Navigation />
      {company.token && <AdminMenu />}
    </header>
  );
};

export default Header;
