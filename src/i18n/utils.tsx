import { ReactNode } from "react";
import { Text } from "@mantine/core";

export const FormattedGradient = (from: string, to: string) => (textValue: ReactNode) => (
  <Text inherit variant="gradient" component="span" gradient={{ from, to }}>
    {textValue}
  </Text>
);

export const FormattedStrong = (textValue: ReactNode) => <strong>{textValue}</strong>;
