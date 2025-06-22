
// API Configuration
export const API_BASE_URL = 'https://localhost:44314/api/v1';

export const API_ENDPOINTS = {
  // Payment endpoints
  validateCard: `${API_BASE_URL}/Payments/validate`,
  processPayment: `${API_BASE_URL}/Payments`,
  refundPayment: `${API_BASE_URL}/Payments/refund`,
  
  // Report endpoints
  paymentsReport: `${API_BASE_URL}/Reports/payments`,
  cardBalancesReport: `${API_BASE_URL}/Reports/card-balances`,
} as const;

// Default API configuration
export const API_CONFIG = {
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
};
