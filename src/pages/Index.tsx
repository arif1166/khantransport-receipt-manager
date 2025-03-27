
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Receipt, Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { format } from "date-fns";
import { Receipt as ReceiptType } from "../types/receipt";

const Index = () => {
  const navigate = useNavigate();
  const [receipts, setReceipts] = useState<ReceiptType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load receipts from localStorage
    const loadReceipts = () => {
      try {
        const savedReceipts = localStorage.getItem("receipts");
        if (savedReceipts) {
          setReceipts(JSON.parse(savedReceipts));
        }
      } catch (error) {
        console.error("Error loading receipts:", error);
      } finally {
        setLoading(false);
      }
    };

    loadReceipts();
  }, []);

  return (
    <div className="min-h-screen pb-24 px-4">
      <div className="max-w-md mx-auto pt-12 pb-4">
        <div className="flex flex-col items-center mb-10 animate-slide-down">
          <h1 className="text-3xl font-bold text-contransport-800 mt-4 mb-2">CONTRANSPORT</h1>
          <p className="text-gray-500 text-center">Receipt Management</p>
        </div>

        <div className="animate-fade-in mb-8">
          <Button
            onClick={() => navigate("/create")}
            className="glass-button w-full mb-8"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create New Receipt
          </Button>

          <h2 className="text-xl font-semibold mb-4">Recent Receipts</h2>

          {loading ? (
            <div className="flex justify-center py-10">
              <div className="animate-pulse text-gray-400">Loading...</div>
            </div>
          ) : receipts.length > 0 ? (
            <div className="space-y-3">
              {receipts.map((receipt, index) => (
                <Card
                  key={receipt.id}
                  className="glass-card p-4 cursor-pointer hover:shadow-lg transition-all duration-200"
                  onClick={() => navigate(`/view/${receipt.id}`)}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Receipt className="w-5 h-5 text-contransport-600 mr-3" />
                      <div>
                        <p className="font-medium">{receipt.transportedBy}</p>
                        <p className="text-sm text-gray-500">
                          {format(new Date(receipt.date), "dd MMM yyyy")}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">${receipt.totalAmount.toFixed(2)}</p>
                      <p className={`text-sm ${receipt.remaining < 0 ? 'text-red-500' : 'text-green-600'}`}>
                        ${receipt.remaining.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-gray-400">
              <Receipt className="w-12 h-12 mx-auto mb-2 opacity-30" />
              <p>No receipts found</p>
              <p className="text-sm">Create your first receipt</p>
            </div>
          )}
        </div>
      </div>
      <Navbar />
    </div>
  );
};

export default Index;
