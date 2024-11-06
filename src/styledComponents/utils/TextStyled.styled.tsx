import styled from "styled-components/native";
import { colors, fontSize } from "../theme";

export type FontSizeTextStyled = keyof fontSize | number;
type ColorTextStyled = keyof colors;

interface TextStyledProps {
  readonly fontSize?: FontSizeTextStyled;
  readonly color?: ColorTextStyled;
  readonly marginTop?: number;
  readonly letterSpacing?: number;
  readonly justify?: boolean;
  readonly marginBottom?: number;
}

/* font-family: ${({ theme }) => theme.fonts.questrial}; */
export const TextStyled = styled.Text<TextStyledProps>`
  font-size: ${({ theme, fontSize = "medium" }) =>
    typeof fontSize === "string" ? theme.fontSize[fontSize] : fontSize}px;
  color: ${({ theme, color = "secondary" }) => theme.colors[color]};
  margin-top: ${({ marginTop = 0 }) => marginTop}px;
  margin-bottom: ${({ marginBottom = 0 }) => marginBottom}px;
  letter-spacing: ${({ letterSpacing = 0 }) => letterSpacing}px;
  text-align: ${({ justify }) => (justify ? "justify" : "start")};
`;
