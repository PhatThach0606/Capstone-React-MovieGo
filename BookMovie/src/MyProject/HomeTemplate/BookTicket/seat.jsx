import { useState } from "react";

export default function Seat({ seat, onSelect }) {
  const [selected, setSelected] = useState(false);
  const isDisabled = !!seat?.daDat;

  const handleClick = () => {
    if (isDisabled) return;
    setSelected((prev) => !prev);
    if (typeof onSelect === "function") onSelect(seat);
  };

  const classes = [
    "border",
    "p-2",
    "hover:cursor-pointer",
    "rounded",
    isDisabled ? "bg-gray-500 cursor-not-allowed text-white" : "",
    !isDisabled && selected ? "bg-rose-600 text-white" : "bg-green-600 hover:bg-green-700 text-white",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button onClick={handleClick} className={classes} disabled={isDisabled}>
      {seat?.tenGhe}
    </button>
  );
}
