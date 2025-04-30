import React from "react";

export const Card = ({ children, className = "" }) => {
  return (
    <div className={`bg-white rounded-xl shadow-md p-4 ${className}`}>
      {children}
    </div>
  );
}

export const CardHeader = ({ children }) => {
  return <div className="mb-2">{children}</div>;
}

export const CardTitle = ({ children })=> {
  return <h2 className="text-lg font-semibold">{children}</h2>;
}

export const CardContent = ({ children }) => {
  return <div>{children}</div>;
}
