import styled from "styled-components/native";

interface InputProps {
  readonly error?: boolean;
}

export const InputLogin = styled.TextInput<InputProps>`
  width: 75%;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.secondary};
  margin-top: 8px;
  margin-bottom: 5px;
  padding: 5px;
  border-radius: 30px;
  border: 1px solid
    ${({ theme, error }) =>
      error ? theme.colors.error : theme.colors.secondary};
`;
