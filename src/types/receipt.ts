
export interface Expense {
  id: string;
  name: string;
  amount: number;
}

export interface Receipt {
  id: string;
  date: string;
  transportedBy: string;
  totalAmount: number;
  expenses: Expense[];
  remaining: number;
}
