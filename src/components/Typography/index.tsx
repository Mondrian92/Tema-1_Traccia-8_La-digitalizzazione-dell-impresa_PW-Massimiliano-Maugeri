import { FormattedMessage } from "react-intl";
import { Text, TextProps } from "@mantine/core";
import { TranslationId } from "@/i18n";

type Props = {
  id: TranslationId;
  values?: Record<string, any>;
} & TextProps;

const Typography = ({ id, values, ...props }: Props) => (
  <Text {...props}>
    <FormattedMessage id={id} values={values} />
  </Text>
);

export default Typography;
