import { FormattedMessage } from "react-intl";
import { Title } from "@mantine/core";
import Typography from "@/components/Typography";
import { FormattedGradient } from "@/i18n/utils";

const HomePage = () => (
  <>
    <Title ta="center">
      <FormattedMessage
        id="page.home.title"
        values={{
          gradient: FormattedGradient("blue", "green"),
        }}
      />
    </Title>
    <Typography
      id="page.home.description"
      c="dimmed"
      ta="center"
      size="lg"
      maw={580}
      mx="auto"
      mt="xl"
    />
  </>
);

export default HomePage;
