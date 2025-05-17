import { useTheme } from "../store/theme/theme";
import moonIcon from "../images/icon-moon.svg";
import sunIcon from "../images/icon-sun.svg";

const ThemeChanger = () => {
  const { theme, setTheme } = useTheme();
  const isLight = theme === "light";
  return (
    <button onClick={() => setTheme(isLight ? "dark" : "light")}>
      <img src={isLight ? moonIcon : sunIcon} alt={isLight ? "sun" : "moon"} />
    </button>
  );
};

export default ThemeChanger;
