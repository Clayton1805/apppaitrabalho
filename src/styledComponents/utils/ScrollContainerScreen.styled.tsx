import { ScrollView } from "react-native";
import styled from "styled-components/native";

interface ScrollViewProps {
  readonly horizontalCenter?: boolean;
  readonly backgroundColor?: string;
  readonly borderTopRadius?: number;
}

const InstanceStyledScrollView = styled(ScrollView)<ScrollViewProps>``;

export const ScrollContainerScreen = styled(InstanceStyledScrollView).attrs(
  ({ horizontalCenter }) =>
    horizontalCenter
      ? {
          contentContainerStyle: {
            alignItems: "center",
            justifyContent: "center",
            flexGrow: 1,
          },
        }
      : {
          contentContainerStyle: {
            alignItems: "center",
          },
        }
)`
  background-color: ${({ theme, backgroundColor }) =>
    backgroundColor ?? theme.colors.primary};
  border-top-left-radius: ${({ borderTopRadius }) => borderTopRadius ?? 0}px;
  border-top-right-radius: ${({ borderTopRadius }) => borderTopRadius ?? 0}px;
`;
