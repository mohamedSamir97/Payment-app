
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { DollarSign, CreditCard, TrendingUp, Activity } from 'lucide-react';

interface DashboardStats {
  totalTransactions: number;
  totalAmount: number;
  confirmedTransactions: number;
  heldTransactions: number;
  refundedTransactions: number;
  activeCards: number;
}

const DashboardOverview = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  // Mock data for charts
  const transactionsByStatus = [
    { name: 'Confirmed', value: 156, color: '#10B981' },
    { name: 'Held', value: 23, color: '#F59E0B' },
    { name: 'Refunded', value: 12, color: '#EF4444' },
  ];

  const dailyTransactions = [
    { date: '2024-01-01', amount: 1250 },
    { date: '2024-01-02', amount: 1580 },
    { date: '2024-01-03', amount: 980 },
    { date: '2024-01-04', amount: 2100 },
    { date: '2024-01-05', amount: 1750 },
    { date: '2024-01-06', amount: 2300 },
    { date: '2024-01-07', amount: 1920 },
  ];

  const monthlyAmounts = [
    { month: 'Jan', amount: 45000 },
    { month: 'Feb', amount: 52000 },
    { month: 'Mar', amount: 48000 },
    { month: 'Apr', amount: 61000 },
    { month: 'May', amount: 55000 },
    { month: 'Jun', amount: 67000 },
  ];

  useEffect(() => {
    // Simulate API call to fetch dashboard stats
    const fetchStats = async () => {
      setLoading(true);
      try {
        // In real implementation, replace with actual API call
        const mockStats: DashboardStats = {
          totalTransactions: 191,
          totalAmount: 285750.50,
          confirmedTransactions: 156,
          heldTransactions: 23,
          refundedTransactions: 12,
          activeCards: 47,
        };
        
        setTimeout(() => {
          setStats(mockStats);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Failed to fetch dashboard stats:', error);
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Amount</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats ? formatCurrency(stats.totalAmount) : '$0'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Activity className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Transactions</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats?.totalTransactions || 0}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Confirmed</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats?.confirmedTransactions || 0}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <CreditCard className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Cards</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats?.activeCards || 0}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Transaction Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={transactionsByStatus}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {transactionsByStatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Daily Transaction Amounts</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dailyTransactions}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Line type="monotone" dataKey="amount" stroke="#3B82F6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Monthly Transaction Volumes</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={monthlyAmounts}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => formatCurrency(Number(value))} />
              <Bar dataKey="amount" fill="#10B981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardOverview;
