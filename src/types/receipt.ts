
export interface Expense {
  id: string;
  name: string;
  amount: number;
}

export interface Receipt {
  id: string;
  date: string;
  transportedBy: string;
  transportingPlace: string;
  totalAmount: number;
  expenses: Expense[];
  remaining: number;
}
