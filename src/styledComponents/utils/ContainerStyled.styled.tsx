import styled from "styled-components/native";
import { colors } from "../theme";

interface InputPropsContainer {
  readonly marginTop?: number;
  readonly marginBottom?: number;
  readonly widthPercentage?: number;
  readonly alignItemsCenter?: boolean;
  readonly backgroundColor?: keyof colors;
  readonly directionRow?: boolean;
  readonly justifyContentCenter?: boolean;
  readonly borderRadius?: number;
  readonly paddingTop?: number;
  readonly paddingBottom?: number;
  readonly flexEnd?: boolean;
}

export const ContainerStyled = styled.View<InputPropsContainer>`
  width: ${({ widthPercentage }) => widthPercentage ?? 100}%;
  align-items: ${({ alignItemsCenter = true, flexEnd }) =>
    flexEnd ? "flex-end" : alignItemsCenter ? "center" : "start"};
  justify-content: ${({ justifyContentCenter }) =>
    justifyContentCenter ? "center" : "start"};
  margin-top: ${({ marginTop }) => marginTop ?? 0}px;
  margin-bottom: ${({ marginBottom }) => marginBottom ?? 0}px;
  background-color: ${({ backgroundColor = "transparent", theme }) =>
    theme.colors[backgroundColor]};
  flex-direction: ${({ directionRow }) => (directionRow ? "row" : "column")};
  border-radius: ${({ borderRadius = 0 }) => borderRadius}px;
  padding-top: ${({ paddingTop = 0 }) => paddingTop}px;
  padding-bottom: ${({ paddingBottom = 0 }) => paddingBottom}px;
`;
