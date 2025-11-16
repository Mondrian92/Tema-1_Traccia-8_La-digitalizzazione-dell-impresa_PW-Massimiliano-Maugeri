import { IconDownload } from "@tabler/icons-react";
import Papa from "papaparse";
import { FormattedMessage, IntlShape, useIntl } from "react-intl";
import { Button } from "@mantine/core";

type Props<T> = {
  data: T[];
  fileName?: string;
};

export type CsvColumn<T> = {
  key: keyof T;
  header: string;
};

export const exportDataToCSV = <T extends object>(
  data: T[],
  intl: IntlShape,
  options?: {
    fileName?: string;
    columns?: CsvColumn<T>[];
  }
): void => {
  if (!data.length) {
    return; // evita file vuoti
  }

  const columns =
    options?.columns ||
    (Object.keys(data[0] || {}) as (keyof T)[]).map((key) => ({
      key,
      header: intl.formatMessage({
        id: `components.export_csv_button.header_label.${String(key)}`,
      }),
    }));
  const fields = columns.map((col) => col.header);
  const dataArrays = data.map((item) => columns.map((col) => item[col.key]));

  const csv = Papa.unparse({ fields, data: dataArrays });
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", options?.fileName || "exported_data.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

const ExportCsvButton = <T extends object>({ data, fileName }: Props<T>) => {
  const intl = useIntl();
  return (
    <Button
      variant="light"
      mt="md"
      onClick={() => exportDataToCSV<T>(data, intl, { fileName })}
      rightSection={<IconDownload size={14} />}
    >
      <FormattedMessage id="components.export_csv_button.label" />
    </Button>
  );
};

export default ExportCsvButton;
