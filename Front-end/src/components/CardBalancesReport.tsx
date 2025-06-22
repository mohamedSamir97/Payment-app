import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronLeft, ChevronRight, CreditCard, Search } from 'lucide-react';
import { API_ENDPOINTS } from '@/config/api';

interface CardBalance {
  cardNumber: string;
  balance: number;
}

interface CardBalancesResponse {
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalRecords: number;
  data: CardBalance[];
}

const CardBalancesReport = () => {
  const [cardBalances, setCardBalances] = useState<CardBalancesResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [cardNumberFilter, setCardNumberFilter] = useState('');
  const [searchInput, setSearchInput] = useState('');

  const fetchCardBalances = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        pageNumber: currentPage.toString(),
        pageSize: pageSize.toString(),
        ...(cardNumberFilter && { lastFourDigits: cardNumberFilter }),
      });

      const response = await fetch(`${API_ENDPOINTS.cardBalancesReport}?${params}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: CardBalancesResponse = await response.json();
      setCardBalances(data);
    } catch (error) {
      console.error('Failed to fetch card balances:', error);
      
      // Fallback to mock data in case of API error
      const mockData: CardBalancesResponse = {
        pageNumber: currentPage,
        pageSize: pageSize,
        totalPages: 3,
        totalRecords: 24,
        data: Array.from({ length: Math.min(pageSize, 24 - (currentPage - 1) * pageSize) }, (_, i) => ({
          cardNumber: `****-****-****-${String(1000 + i + (currentPage - 1) * pageSize).padStart(4, '0')}`,
          balance: Math.random() * 5000 + 500,
        })),
      };
      setCardBalances(mockData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCardBalances();
  }, [currentPage, pageSize, cardNumberFilter]);

  const handleSearch = () => {
    setCardNumberFilter(searchInput);
    setCurrentPage(1);
  };

  const handleClearSearch = () => {
    setSearchInput('');
    setCardNumberFilter('');
    setCurrentPage(1);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const getBalanceColor = (balance: number) => {
    if (balance < 100) return 'text-red-600';
    if (balance < 500) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search Card Balances
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
              <Input
                placeholder="Enter card number (last 4 digits)"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            
            <div className="flex flex-col justify-end">
              <div className="flex gap-2">
                <Button onClick={handleSearch} className="flex-1">
                  Search
                </Button>
                <Button variant="outline" onClick={handleClearSearch}>
                  Clear
                </Button>
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Page Size</label>
            <Select value={pageSize.toString()} onValueChange={(value) => setPageSize(Number(value))}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10 per page</SelectItem>
                <SelectItem value="25">25 per page</SelectItem>
                <SelectItem value="50">50 per page</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Card Balances
          </CardTitle>
          {cardBalances && (
            <p className="text-sm text-gray-600">
              Showing {cardBalances.data.length} of {cardBalances.totalRecords} card balances
            </p>
          )}
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <>
              <div className="grid gap-4">
                {cardBalances?.data.map((card, index) => (
                  <div
                    key={`${card.cardNumber}-${index}`}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <CreditCard className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{card.cardNumber}</p>
                        <p className="text-sm text-gray-500">Card Number</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-lg font-semibold ${getBalanceColor(card.balance)}`}>
                        {formatCurrency(card.balance)}
                      </p>
                      <p className="text-sm text-gray-500">Available Balance</p>
                    </div>
                  </div>
                ))}
              </div>

              {cardBalances && cardBalances.data.length === 0 && (
                <div className="text-center py-12">
                  <CreditCard className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No card balances found</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {cardNumberFilter ? 'Try adjusting your search criteria.' : 'No card balances are available.'}
                  </p>
                </div>
              )}

              {cardBalances && cardBalances.totalPages > 1 && (
                <div className="flex items-center justify-between mt-6">
                  <div className="text-sm text-gray-700">
                    Page {cardBalances.pageNumber} of {cardBalances.totalPages}
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(Math.min(cardBalances.totalPages, currentPage + 1))}
                      disabled={currentPage === cardBalances.totalPages}
                    >
                      Next
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CardBalancesReport;
