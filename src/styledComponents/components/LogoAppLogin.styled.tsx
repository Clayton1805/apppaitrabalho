import styled from "styled-components/native";
import { LogoCompleteStyled } from "./LogoCompleteStyled.styled";
import { theme } from "../theme";

const LogoTextImgStyled = styled.Image`
  width: 90%;
  height: 200px;
  margin-top: 20px;
`;

const ContainerLogoAppStyled = styled.View`
  width: 100%;
  align-items: center;
`;

export const LogoAppLogin = () => (
  <ContainerLogoAppStyled>
    <LogoCompleteStyled marginTop={theme.spaces.header} />
    <LogoTextImgStyled
      resizeMode={"contain"}
      source={require("../../images/cleanConnect.png")}
    />
  </ContainerLogoAppStyled>
);
