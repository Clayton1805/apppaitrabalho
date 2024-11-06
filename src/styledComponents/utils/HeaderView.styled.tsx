import styled from "styled-components/native";

interface HeaderViewProps {
  readonly backgroundColor?: string;
}

export const HeaderView = styled.View<HeaderViewProps>`
  height: ${({ theme }) => theme.spaces.header}px;
  background-color: ${({ theme, backgroundColor }) =>
    backgroundColor ?? theme.colors.primary};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 14px;
  padding-right: 14px;
`;
