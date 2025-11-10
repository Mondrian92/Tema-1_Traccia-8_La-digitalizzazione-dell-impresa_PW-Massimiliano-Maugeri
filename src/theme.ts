import { Button, Card, createTheme, Select } from "@mantine/core";

export const theme = createTheme({
  components: {
    Button: Button.extend({
      defaultProps: {
        radius: "md",
      },
    }),
    Card: Card.extend({
      defaultProps: {
        radius: "md",
        withBorder: true,
        shadow: "sm",
      },
    }),
    Select: Select.extend({
      defaultProps: {
        radius: "md",
      },
    }),
  },
});
