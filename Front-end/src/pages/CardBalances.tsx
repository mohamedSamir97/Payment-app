
import CardBalancesReport from '@/components/CardBalancesReport';

const CardBalances = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Card Balances</h1>
        <p className="text-gray-600">Monitor card balances and account status</p>
      </div>
      <CardBalancesReport />
    </div>
  );
};

export default CardBalances;
