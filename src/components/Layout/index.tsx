import { Outlet } from "react-router-dom";
import { AppShell, Burger, Group, Image, rem, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import LogoShrunk from "@/assets/faviconLogo.webp";
import ThemeToggle from "@/components/ThemeToggle";
import Navbar from "@/components/Layout/components/Navbar";

const Layout = () => {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  return (
    <AppShell
      padding="sm"
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
            <Title order={3}>HarvestHub</Title>
          </Group>
          <ThemeToggle />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <Navbar />
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};

export default Layout;
