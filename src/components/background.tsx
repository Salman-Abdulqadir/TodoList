const Background = () => {
  return (
    <>
      {/* Mobile BG */}
      <div className="md:hidden bg-mobile" />
      {/* Desktop BG */}
      <div className="hidden md:block bg-desktop" />
    </>
  );
};

export default Background;
