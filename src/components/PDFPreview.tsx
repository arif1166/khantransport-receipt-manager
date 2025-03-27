
import { useState, useEffect } from "react";
import { Receipt } from "../types/receipt";
import { Button } from "@/components/ui/button";
import { sharePDF } from "@/utils/pdfGenerator";
import { Share2, Download, Printer } from "lucide-react";
import { format } from "date-fns";

interface PDFPreviewProps {
  receipt: Receipt;
}

const PDFPreview = ({ receipt }: PDFPreviewProps) => {
  const [isPrinting, setIsPrinting] = useState(false);

  const handlePrint = () => {
    setIsPrinting(true);
    window.print();
    setTimeout(() => setIsPrinting(false), 1000);
  };

  return (
    <div className="flex flex-col items-center w-full animate-scale-in">
      <div className="print:shadow-none mb-4 w-full max-w-md glass-card p-6 print:p-2">
        <div className="pdf-content">
          <div className="flex justify-between items-center mb-6">
            <div className="text-sm text-gray-600">
              {format(new Date(receipt.date), "dd/MM/yyyy")}
            </div>
            <div className="text-center text-xl font-bold text-contransport-800">
              KHAN TRANSPORT
            </div>
            <div className="text-sm text-gray-600 text-right">
              Receipt #{receipt.id.slice(0, 4)}
            </div>
          </div>

          <div className="mb-6">
            <div className="text-sm text-gray-600 mb-1">Transported By:</div>
            <div className="font-medium">{receipt.transportedBy}</div>
          </div>

          <div className="mb-6">
            <div className="text-sm text-gray-600 mb-2">Total Amount:</div>
            <div className="text-xl font-bold">₹{receipt.totalAmount.toFixed(2)}</div>
          </div>

          <div className="mb-6">
            <div className="text-sm text-gray-600 mb-2">Expenses:</div>
            <div className="space-y-2">
              {receipt.expenses.map((expense) => (
                <div key={expense.id} className="flex justify-between">
                  <span>{expense.name}</span>
                  <span>₹{expense.amount.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t">
            <div className="flex justify-between font-bold">
              <span>Remaining Amount:</span>
              <span>₹{receipt.remaining.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex space-x-3 print:hidden">
        <Button 
          onClick={() => sharePDF(receipt)} 
          className="glass-button flex items-center"
        >
          <Share2 className="w-4 h-4 mr-2" />
          Share
        </Button>
        <Button 
          onClick={handlePrint} 
          variant="outline" 
          className="flex items-center"
        >
          <Printer className="w-4 h-4 mr-2" />
          Print
        </Button>
      </div>
    </div>
  );
};

export default PDFPreview;
