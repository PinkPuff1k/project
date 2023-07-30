import React from "react";

const sizeClasses = {
  txtInterRegular20: "font-inter font-normal",
  txtInterRegular20Black90070: "font-inter font-normal",
  txtInterRegular32: "font-inter font-normal",
  txtInterRegular10: "font-inter font-normal",
  txtInterMedium20WhiteA700: "font-inter font-medium",
  txtInterMedium32: "font-inter font-medium",
  txtInterMedium24: "font-inter font-medium",
  txtInterMedium16: "font-inter font-medium",
  txtInterBold28: "font-inter font-bold",
  txtInterBold32: "font-inter font-bold",
  txtInterBold20: "font-inter font-bold",
  txtInterRegular15Black90070: "font-inter font-normal",
  txtInterBold28WhiteA700: "font-inter font-bold",
  txtInterRegular24: "font-inter font-normal",
  txtInterRegular13: "font-inter font-normal",
  txtInterRegular15: "font-inter font-normal",
  txtInterRegular16: "font-inter font-normal",
  txtInterRegular28: "font-inter font-normal",
  txtInterRegular20Gray500: "font-inter font-normal",
};

const Text = ({ children, className = "", size, as, ...restProps }) => {
  const Component = as || "p";

  return (
    <Component
      className={`text-left ${className} ${size && sizeClasses[size]}`}
      {...restProps}
    >
      {children}
    </Component>
  );
};

export { Text };
