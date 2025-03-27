
import Navbar from "@/components/Navbar";
import ReceiptForm from "@/components/ReceiptForm";

const CreateReceipt = () => {
  return (
    <div className="min-h-screen pb-24 px-4">
      <div className="max-w-md mx-auto pt-12 pb-4">
        <ReceiptForm />
      </div>
      <Navbar />
    </div>
  );
};

export default CreateReceipt;
