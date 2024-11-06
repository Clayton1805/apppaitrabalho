import styled from "styled-components/native";
import { FontSizeTextStyled, TextStyled } from "../utils/TextStyled.styled";
import { colors } from "../theme";

interface ButtonPropsStyled {
  readonly widthPercentage?: number;
  readonly marginTop?: number;
  readonly marginBottom?: number;
  readonly borderRadius?: number;
  readonly backgroundColor?: keyof colors;
}

const TouchableOpacityStyled = styled.TouchableOpacity<ButtonPropsStyled>`
  width: ${({ widthPercentage }) => widthPercentage ?? 75}%;
  justify-content: center;
  align-items: center;
  margin: 8px;
  padding: 5px;
  border-radius: ${({ borderRadius = 30 }) => borderRadius}px;
  border: 3px solid ${({ theme }) => theme.colors.secondary};
  margin-top: ${({ marginTop = 8 }) => marginTop}px;
  margin-bottom: ${({ marginBottom = 8 }) => marginBottom}px;
  background-color: ${({ theme, backgroundColor = "transparent" }) =>
    theme.colors[backgroundColor]};
`;

interface ButtonProps {
  onPress: () => void;
  title: string;
  widthPercentage?: number;
  fontSize?: FontSizeTextStyled;
  marginTop?: number;
  marginBottom?: number;
  borderRadius?: number;
  backgroundColor?: keyof colors;
  color?: keyof colors;
}

export const ButtonStyled = ({
  onPress,
  title,
  widthPercentage,
  fontSize,
  marginTop,
  marginBottom,
  borderRadius,
  backgroundColor,
  color,
}: ButtonProps) => (
  <TouchableOpacityStyled
    activeOpacity={0.8}
    onPress={onPress}
    widthPercentage={widthPercentage}
    marginTop={marginTop}
    marginBottom={marginBottom}
    borderRadius={borderRadius}
    backgroundColor={backgroundColor}
  >
    <TextStyled fontSize={fontSize} color={color}>
      {title}
    </TextStyled>
  </TouchableOpacityStyled>
);
