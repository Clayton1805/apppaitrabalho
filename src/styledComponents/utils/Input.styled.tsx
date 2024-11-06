import styled from "styled-components/native";

interface InputProps {
  readonly error?: boolean;
  readonly widthPercentage?: number;
}

export const Input = styled.TextInput<InputProps>`
  height: 40px;
  width: ${({ widthPercentage }) => widthPercentage ?? 95}%;
  background-color: ${({ theme }) => theme.colors.secondary};
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 5px;
  border: 1px solid
    ${({ theme, error }) =>
      error ? theme.colors.error : theme.colors.secondary};
`;
