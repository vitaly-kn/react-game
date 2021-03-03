import logo from "../../assets/img/rsSchoolJS.svg";
import "../css/Footer.css";

function Footer() {
  return (
    <div className="Footer">
      <p>
        Minsk, 2021, by{" "}
        <a className="github-link" href="https://github.com/vitaly-kn" target="_blank" rel="noopener noreferrer">
          Vitaly Kniazev
        </a>
      </p>
      <a href="https://rs.school/react/" target="_blank" rel="noopener noreferrer">
        <img className="course-logo" src={logo} alt="React Course" />
      </a>
    </div>
  );
}

export default Footer;
