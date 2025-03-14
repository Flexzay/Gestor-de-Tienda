import { ReactNode } from "react";
interface SummaryProps {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
}

interface CardProps {
  title: string;
  amount: number;
  colorClass: string;
  icon: ReactNode;
}

export type { SummaryProps, CardProps }; 