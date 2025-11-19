import { FormattedMessage } from "react-intl";
import { Outlet } from "react-router-dom";
import { AppShell, Burger, Group, Image, rem, ScrollArea, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import LogoShrunk from "@/assets/faviconLogo.webp";
import LanguageSelector from "@/components/LanguageSelector";
import Navbar from "@/components/Layout/components/Navbar";
import ThemeToggle from "@/components/ThemeToggle";

const Layout = () => {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  return (
    <AppShell
      padding="xl"
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
            <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" />
            <Image src={LogoShrunk} alt="logo" maw={rem(42)} />
            <Title order={3}>
              <FormattedMessage id="header.title" />
            </Title>
          </Group>
          <ThemeToggle />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <AppShell.Section grow my="md" component={ScrollArea} px="md">
          <Navbar />
        </AppShell.Section>

        <AppShell.Section p="md">
          <LanguageSelector />
        </AppShell.Section>
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};

export default Layout;
