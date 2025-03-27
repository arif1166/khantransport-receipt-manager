
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Trash2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import PDFPreview from "@/components/PDFPreview";
import { Receipt } from "../types/receipt";
import { toast } from "sonner";

const ViewReceipt = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [receipt, setReceipt] = useState<Receipt | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadReceipt = () => {
      try {
        const savedReceipts = JSON.parse(localStorage.getItem("receipts") || "[]");
        const foundReceipt = savedReceipts.find((r: Receipt) => r.id === id);
        
        if (foundReceipt) {
          setReceipt(foundReceipt);
        } else {
          toast.error("Receipt not found");
          navigate("/");
        }
      } catch (error) {
        console.error("Error loading receipt:", error);
        toast.error("Error loading receipt");
      } finally {
        setLoading(false);
      }
    };

    loadReceipt();
  }, [id, navigate]);

  const handleDeleteReceipt = () => {
    if (window.confirm("Are you sure you want to delete this receipt?")) {
      try {
        const savedReceipts = JSON.parse(localStorage.getItem("receipts") || "[]");
        const updatedReceipts = savedReceipts.filter((r: Receipt) => r.id !== id);
        localStorage.setItem("receipts", JSON.stringify(updatedReceipts));
        toast.success("Receipt deleted successfully");
        navigate("/");
      } catch (error) {
        console.error("Error deleting receipt:", error);
        toast.error("Error deleting receipt");
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-pulse text-gray-400">Loading...</div>
      </div>
    );
  }

  if (!receipt) {
    return (
      <div className="min-h-screen flex justify-center items-center flex-col">
        <p className="text-gray-500">Receipt not found</p>
        <Button onClick={() => navigate("/")} variant="link">
          Go back home
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-24 px-4">
      <div className="max-w-md mx-auto pt-12 pb-4">
        <div className="flex justify-between items-center mb-6">
          <Button
            variant="ghost"
            className="p-0"
            onClick={() => navigate("/")}
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Back
          </Button>
          
          <Button
            variant="ghost"
            className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2"
            onClick={handleDeleteReceipt}
          >
            <Trash2 className="w-5 h-5" />
          </Button>
        </div>
        
        <h1 className="text-2xl font-bold text-center mb-6">Khan Transport Receipt Details</h1>
        
        <PDFPreview receipt={receipt!} />
      </div>
      <Navbar />
    </div>
  );
};

export default ViewReceipt;
