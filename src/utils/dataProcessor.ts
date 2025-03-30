// Utility function to process the JSON data from the API response

export interface ProcessedFinancialData {
  businessInfo: {
    name: string;
    industry: string;
    location: string;
  };
  totalRevenue: number;
  totalExpenses: number;
  profit: number;
  recentTransactions: {
    id: number;
    description: string;
    amount: number;
    date: string;
    category: string;
  }[];
  upcomingBills: {
    description: string;
    amount: number;
    dueDate: string;
    status: string;
  }[];
}

export function processFinancialData(jsonData: any): ProcessedFinancialData {
  try {
    // Parse the data if it's a string
    const data = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;
    
    // Calculate total revenue from income records
    const totalRevenue = data.incomeRecords?.reduce((sum: number, record: any) => 
      sum + (record.amountGHS || 0), 0) || 0;
    
    // Calculate total expenses from expense records
    const totalExpenses = data.expenseRecords?.reduce((sum: number, record: any) => 
      sum + (record.amountGHS || 0), 0) || 0;
    
    // Calculate profit
    const profit = totalRevenue - totalExpenses;
    
    // Format recent transactions from income and expense records
    const recentTransactions = [
      // Income transactions (positive amounts)
      ...(data.incomeRecords?.map((record: any, index: number) => ({
        id: index + 1,
        description: `${record.source}: ${record.description}`,
        amount: record.amountGHS,
        date: formatDate(record.date),
        category: 'Income'
      })) || []),
      
      // Expense transactions (negative amounts)
      ...(data.expenseRecords?.map((record: any, index: number) => ({
        id: data.incomeRecords?.length + index + 1 || index + 1,
        description: `${record.expenseType}: ${record.description}`,
        amount: -record.amountGHS, // Negative amount for expenses
        date: formatDate(record.date),
        category: 'Expense'
      })) || [])
    ];
    
    // Sort transactions by date (most recent first)
    recentTransactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    // Format upcoming bills from liabilities
    const upcomingBills = data.liabilities?.map((liability: any) => ({
      description: liability.creditor,
      amount: liability.amountOwedGHS,
      dueDate: formatDate(liability.dueDate),
      status: liability.paymentStatus
    })) || [];
    
    return {
      businessInfo: data.businessInfo || {
        name: 'Business Name',
        industry: 'Industry',
        location: 'Location'
      },
      totalRevenue,
      totalExpenses,
      profit,
      recentTransactions,
      upcomingBills
    };
  } catch (error) {
    console.error('Error processing financial data:', error);
    // Return default data structure in case of error
    return {
      businessInfo: {
        name: 'Error Processing Data',
        industry: 'N/A',
        location: 'N/A'
      },
      totalRevenue: 0,
      totalExpenses: 0,
      profit: 0,
      recentTransactions: [],
      upcomingBills: []
    };
  }
}

// Helper function to format dates
function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  } catch (error) {
    return dateString; // Return original string if parsing fails
  }
}
