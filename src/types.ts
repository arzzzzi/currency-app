export type ChartData = {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    borderWidth: number;
  }[];
};

export interface ChartRendererProps {
  chartData: any;
}

export interface CurrencyCheckboxProps {
  currencies: string[];
  handleCheckboxChange: (currency: string) => void;
}

export interface DateInputsProps {
  startDate: Date;
  endDate: Date;
  handleStartDateChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleEndDateChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
