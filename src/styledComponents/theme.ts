import "styled-components/native";
import { DefaultTheme } from "styled-components";

export type colors = {
  primary: string;
  secondary: string;
  error: string;
  transparent: string;
  black: string;
  green: string;
  gray: string;
};
export type spaces = {
  header: number;
};
export type fonts = {
  // questrial: string;
};
export type fontSize = {
  medium: number;
  button: number;
  small: number;
  warning: number;
  span: number;
  title: number;
  large: number;
};
declare module "styled-components/native" {
  export interface DefaultTheme {
    colors: colors;
    spaces: spaces;
    fonts: fonts;
    fontSize: fontSize;
  }
}

export const theme: DefaultTheme = {
  colors: {
    primary: "#335f88",
    secondary: "#FFFFFF",
    gray: "#f8f8fb",
    error: "#ED4337",
    transparent: "transparent",
    black: "black",
    green: "#34b233",
  },
  spaces: {
    header: 56,
  },
  fonts: {
    // questrial: "Questrial_400Regular",
  },
  fontSize: {
    medium: 20,
    button: 30,
    small: 18,
    warning: 14,
    span: 15,
    title: 49,
    large: 27,
  },
};
