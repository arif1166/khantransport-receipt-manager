
import { Receipt } from "../types/receipt";
import { toast } from "sonner";

// Helper function to format currency
const formatCurrency = (amount: number) => {
  return amount.toLocaleString('en-IN') + "/-";
};

export const generatePDF = async (receipt: Receipt): Promise<Blob | null> => {
  try {
    const pdfContent = `
      KHAN TRANSPORT RECEIPT
      
      Date: ${receipt.date}
      Transported By: ${receipt.transportedBy}
      Transporting Place: ${receipt.transportingPlace}
      
      Total Amount: ₹${formatCurrency(receipt.totalAmount)}
      
      EXPENSES:
      ${receipt.expenses.map(expense => `${expense.name}: ₹${formatCurrency(expense.amount)}`).join('\n')}
      
      Remaining Amount: ₹${formatCurrency(receipt.remaining)}
    `;
    
    const blob = new Blob([pdfContent], { type: "application/pdf" });
    return blob;
  } catch (error) {
    console.error("Failed to generate PDF:", error);
    toast.error("Failed to generate PDF");
    return null;
  }
};

export const sharePDF = async (receipt: Receipt) => {
  try {
    const pdfBlob = await generatePDF(receipt);
    
    if (!pdfBlob) {
      throw new Error("Failed to generate PDF");
    }
    
    // Check if the Web Share API is available
    if (navigator.share) {
      const file = new File([pdfBlob], `contransport-receipt-${Date.now()}.pdf`, {
        type: "application/pdf",
      });
      
      await navigator.share({
        title: "Contransport Receipt",
        text: `Receipt for transportation by ${receipt.transportedBy}`,
        files: [file],
      });
      
      toast.success("Receipt shared successfully");
    } else {
      // Fallback for browsers that don't support the Web Share API
      const url = URL.createObjectURL(pdfBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `contransport-receipt-${Date.now()}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast.success("Receipt downloaded successfully");
    }
  } catch (error) {
    console.error("Error sharing PDF:", error);
    toast.error("Failed to share receipt");
  }
};
