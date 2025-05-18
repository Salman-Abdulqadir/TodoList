import { useState, type InputHTMLAttributes } from "react";
import CheckIcon from "../assets/images/icon-check.svg";
const Checkbox = (checkboxProps: InputHTMLAttributes<HTMLInputElement>) => {
  const [isHovered, setIsHovered] = useState(false);
  const { checked } = checkboxProps;
  return (
    <label
      className="relative inline-flex items-center cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <input type="checkbox" {...checkboxProps} className="peer sr-only" />
      <div
        className="w-6 h-6 rounded-full transition border border-primary-border peer-checked:border-none flex flex-col items-center justify-center"
        style={{
          background: checked ? "var(--primary-gradient)" : "",
        }}
      >
        {checked && (
          <img src={CheckIcon} alt="check box mark" className="h-3 w-3" />
        )}
      </div>
      {/* Gradient borders */}
      {!checked && isHovered && (
        <div
          className="absolute w-6 h-6 rounded-full z-0 transition-all flex flex-col justify-center items-center"
          style={{ background: "var(--primary-gradient)" }}
        >
          <div className="w-5.5 h-5.5 bg-foreground rounded-full " />
        </div>
      )}
    </label>
  );
};

export default Checkbox;
