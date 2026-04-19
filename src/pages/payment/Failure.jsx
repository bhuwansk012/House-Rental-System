import { useEffect } from "react";
import api from "../../service/api";

const Failure = () => {

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const oid = params.get("oid");

    console.log("FAILED PAYMENT:", oid);

    api.post(`/payment/failed?transactionId=${oid}`);
  }, []);

  return (
    <div className="text-center mt-10 text-red-600">
      <h2 className="text-2xl font-bold">Payment Failed ❌</h2>
    </div>
  );
};

export default Failure;