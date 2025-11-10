import { ReactNode } from "react";
import { FormattedMessage } from "react-intl";
import { Flex, Group, Title } from "@mantine/core";
import { TranslationId } from "@/i18n";

type Props = {
  children: ReactNode;
  rightHeaderSection?: ReactNode;
  subtitle?: ReactNode;
  title: TranslationId;
  mb?: "xs" | "sm" | "md" | "lg" | "xl";
};

const PageWrapper = ({ children, title, rightHeaderSection, subtitle, mb = "xl" }: Props) => {
  return (
    <Flex w="100%" direction="column">
      <Group mb={mb} justify="space-between">
        <Title>
          <Group align="end">
            <FormattedMessage id={title} />
            {subtitle || null}
          </Group>
        </Title>
        {rightHeaderSection}
      </Group>
      {children}
    </Flex>
  );
};

export default PageWrapper;
