import { createContext } from "react";

export const backgroundColors = {
  primary: "primary",
  
};

export const BackgroundColorContext = createContext({
  color: backgroundColors.primary,
  changeColor: (color) => {},
});
