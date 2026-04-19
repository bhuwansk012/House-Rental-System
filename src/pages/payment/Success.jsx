import { useEffect } from "react";
import api from "../../service/api";

const Success = () => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const encodedData = params.get("data");

    if (encodedData) {
      // Decode the base64 response from eSewa
      const decodedString = atob(encodedData);
      const responseData = JSON.parse(decodedString);

      // responseData contains transaction_uuid, status, total_amount, etc.
      console.log("Decoded Data:", responseData);

      const transactionId = responseData.transaction_uuid;
      
      api.post(`/payment/success?transactionId=${transactionId}`);
    }
  }, []);

  return (
    <div className="text-center mt-10 text-green-600">
      <h2 className="text-2xl font-bold">Payment Successful</h2>
    </div>
  );
};

export default Success;