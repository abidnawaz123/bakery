import React from 'react';

const Badge = ({ children, color = "gray" }) => {
  const colors = {
    red: "bg-red-100 text-red-800",
    green: "bg-green-100 text-green-800",
    gray: "bg-gray-100 text-gray-800",
  };

  return (
    <span
      className={`inline-block px-2 py-1 rounded-full text-sm font-semibold ${colors[color]}`}
    >
      {children}
    </span>
  );
}

export default Badge;
