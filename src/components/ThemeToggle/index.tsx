import { IconMoon, IconSun } from "@tabler/icons-react";
import { ActionIcon, Group, useMantineColorScheme } from "@mantine/core";

const ThemeToggle = () => {
  const { setColorScheme, colorScheme } = useMantineColorScheme();
  const isLightTheme = colorScheme === "light";

  return (
    <Group justify="center">
      <ActionIcon
        onClick={() => setColorScheme(isLightTheme ? "dark" : "light")}
        variant="default"
        size="xl"
        radius="md"
        aria-label="Toggle color scheme"
      >
        {!isLightTheme && <IconSun stroke={1.5} />}
        {isLightTheme && <IconMoon stroke={1.5} />}
      </ActionIcon>
    </Group>
  );
};

export default ThemeToggle;
