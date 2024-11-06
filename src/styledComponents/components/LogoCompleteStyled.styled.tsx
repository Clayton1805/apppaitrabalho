import styled from "styled-components/native";

interface LogoImgProps {
  readonly marginTop?: number;
}

const LogoImgStyled = styled.Image<LogoImgProps>`
  width: 25%;
  height: 100px;
  margin-top: ${({ theme, marginTop }) => marginTop ?? 0}px;
`;

export const LogoCompleteStyled = ({ marginTop }: LogoImgProps) => (
  <LogoImgStyled
    marginTop={marginTop}
    resizeMode={"contain"}
    source={require("../../images/logoComplete.png")}
  />
);
