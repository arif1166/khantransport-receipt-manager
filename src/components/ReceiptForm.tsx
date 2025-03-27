
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { PlusCircle, Save, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import ExpenseItem from "./ExpenseItem";
import { Receipt, Expense } from "../types/receipt";

const ReceiptForm = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState<string>(new Date().toISOString().split("T")[0]);
  const [transportedBy, setTransportedBy] = useState<string>("");
  const [totalAmount, setTotalAmount] = useState<string>("");
  const [expenses, setExpenses] = useState<Expense[]>([
    { id: uuidv4(), name: "Driver Salary", amount: 0 },
    { id: uuidv4(), name: "Diesel", amount: 0 },
    { id: uuidv4(), name: "Fastrak", amount: 0 },
  ]);
  const [newExpenseId, setNewExpenseId] = useState<string | null>(null);
  const [remainingAmount, setRemainingAmount] = useState<number>(0);

  // Calculate remaining amount whenever expenses or total amount changes
  useEffect(() => {
    const total = parseFloat(totalAmount) || 0;
    const expensesTotal = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    setRemainingAmount(total - expensesTotal);
  }, [expenses, totalAmount]);

  const handleUpdateExpense = (id: string, name: string, amount: number) => {
    setExpenses(
      expenses.map((expense) =>
        expense.id === id ? { ...expense, name, amount } : expense
      )
    );
  };

  const handleRemoveExpense = (id: string) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  const handleAddExpense = () => {
    const newId = uuidv4();
    setExpenses([...expenses, { id: newId, name: "", amount: 0 }]);
    setNewExpenseId(newId);
    
    // Clear the highlight after animation
    setTimeout(() => {
      setNewExpenseId(null);
    }, 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!transportedBy.trim()) {
      toast.error("Please enter who transported the goods");
      return;
    }
    
    if (!totalAmount || parseFloat(totalAmount) <= 0) {
      toast.error("Please enter a valid total amount");
      return;
    }
    
    const newReceipt: Receipt = {
      id: uuidv4(),
      date,
      transportedBy,
      totalAmount: parseFloat(totalAmount),
      expenses,
      remaining: remainingAmount,
    };
    
    // In a real app, you would save this to a database or localStorage
    // For now, we'll just store it in localStorage for demo purposes
    const existingReceipts = JSON.parse(localStorage.getItem("receipts") || "[]");
    localStorage.setItem("receipts", JSON.stringify([...existingReceipts, newReceipt]));
    
    toast.success("Receipt created successfully");
    navigate(`/view/${newReceipt.id}`);
  };

  return (
    <form onSubmit={handleSubmit} className="animate-fade-in">
      <div className="mb-6">
        <Button
          type="button"
          variant="ghost"
          className="p-0 mb-4"
          onClick={() => navigate("/")}
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          Back
        </Button>
        <h1 className="text-2xl font-bold text-center mb-1">Create Receipt</h1>
        <p className="text-center text-gray-500 mb-6">Enter receipt details below</p>
      </div>

      <Card className="glass-card p-6 mb-6">
        <div className="space-y-6">
          <div className="flex justify-between gap-4">
            <div className="w-1/2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="mt-1"
              />
            </div>
            
            <div className="w-1/2">
              <Label htmlFor="total-amount">Total Amount</Label>
              <Input
                id="total-amount"
                type="number"
                value={totalAmount}
                onChange={(e) => setTotalAmount(e.target.value)}
                placeholder="0.00"
                className="mt-1"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="transported-by">Transported By</Label>
            <Input
              id="transported-by"
              value={transportedBy}
              onChange={(e) => setTransportedBy(e.target.value)}
              placeholder="Enter name"
              className="mt-1"
            />
          </div>
        </div>
      </Card>

      <Card className="glass-card p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Expenses</h2>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleAddExpense}
            className="text-contransport-600 border-contransport-300 hover:bg-contransport-50 hover:text-contransport-700"
          >
            <PlusCircle className="w-4 h-4 mr-1" />
            Add Expense
          </Button>
        </div>

        <div className="space-y-1">
          {expenses.map((expense) => (
            <ExpenseItem
              key={expense.id}
              id={expense.id}
              name={expense.name}
              amount={expense.amount}
              onUpdate={handleUpdateExpense}
              onRemove={handleRemoveExpense}
              isNew={expense.id === newExpenseId}
            />
          ))}
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <span className="font-semibold">Remaining Amount:</span>
            <span className={`font-bold text-lg ${remainingAmount < 0 ? 'text-red-500' : 'text-green-600'}`}>
              ${remainingAmount.toFixed(2)}
            </span>
          </div>
        </div>
      </Card>

      <div className="flex justify-center mb-20">
        <Button type="submit" className="glass-button w-full max-w-xs">
          <Save className="w-4 h-4 mr-2" />
          Create Receipt
        </Button>
      </div>
    </form>
  );
};

export default ReceiptForm;
