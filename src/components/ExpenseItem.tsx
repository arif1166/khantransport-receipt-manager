
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface ExpenseItemProps {
  id: string;
  name: string;
  amount: number;
  onUpdate: (id: string, name: string, amount: number) => void;
  onRemove: (id: string) => void;
  isNew?: boolean;
}

const ExpenseItem = ({ 
  id, 
  name, 
  amount, 
  onUpdate, 
  onRemove, 
  isNew = false 
}: ExpenseItemProps) => {
  const [expenseName, setExpenseName] = useState(name);
  const [expenseAmount, setExpenseAmount] = useState(amount.toString());
  const [isHighlighted, setIsHighlighted] = useState(isNew);

  useEffect(() => {
    if (isNew) {
      const timer = setTimeout(() => {
        setIsHighlighted(false);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [isNew]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setExpenseName(newName);
    onUpdate(id, newName, parseFloat(expenseAmount) || 0);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount = e.target.value;
    setExpenseAmount(newAmount);
    onUpdate(id, expenseName, parseFloat(newAmount) || 0);
  };

  return (
    <div 
      className={cn(
        "flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 animate-fade-in",
        isHighlighted ? "bg-contransport-100" : "bg-white/50 hover:bg-white/80"
      )}
    >
      <div className="flex-1">
        <Input
          value={expenseName}
          onChange={handleNameChange}
          placeholder="Expense name"
          className="border-none bg-transparent focus-visible:ring-0 p-0 h-auto text-sm font-medium"
        />
      </div>
      <div className="w-24">
        <Input
          type="number"
          value={expenseAmount}
          onChange={handleAmountChange}
          placeholder="0.00"
          className="text-right border-none bg-transparent focus-visible:ring-0 p-0 h-auto text-sm"
        />
      </div>
      <button
        onClick={() => onRemove(id)}
        className="text-gray-400 hover:text-red-500 transition-colors p-1"
        aria-label="Remove expense"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default ExpenseItem;
