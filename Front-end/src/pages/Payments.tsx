
import PaymentsReport from '@/components/PaymentsReport';

const Payments = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Payment Transactions</h1>
        <p className="text-gray-600">View and filter all payment transactions</p>
      </div>
      <PaymentsReport />
    </div>
  );
};

export default Payments;
