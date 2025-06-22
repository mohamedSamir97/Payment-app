
import DashboardOverview from '@/components/DashboardOverview';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600">Monitor your payment transactions and analytics</p>
      </div>
      <DashboardOverview />
    </div>
  );
};

export default Dashboard;
