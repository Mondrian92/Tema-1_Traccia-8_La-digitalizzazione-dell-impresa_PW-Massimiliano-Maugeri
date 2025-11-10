import { Text } from "@mantine/core";
import { ReactNode } from "react";

export const FormattedGradient = (from: string, to: string) => (textValue: ReactNode) => (
  <Text inherit variant="gradient" component="span" gradient={{ from, to }}>
    {textValue}
  </Text>
);
