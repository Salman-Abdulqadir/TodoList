import ThemeChanger from "../../../components/theme-changer";

const Header = () => {
  return (
    <header className="flex items-center justify-between mb-[10px]">
      <h1 className="text-5xl tracking-[1rem] font-bold text-light-very-light-gray">
        TODO
      </h1>
      <ThemeChanger />
    </header>
  );
};

export default Header;
