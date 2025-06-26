import React from "react";

type Props = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
};

const Slider = ({ value, onChange, min = 0, max = 1000 }: Props) => {
  return (
    <div>
      <h2 className="font-semibold">Price Range</h2>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
      />
      <p>Up to ${value}</p>
    </div>
  );
};

export default Slider;
