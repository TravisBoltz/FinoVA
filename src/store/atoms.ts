import { atom } from 'jotai';
import { ProcessedFinancialData } from '@/utils/dataProcessor';

// Initial empty state that matches ProcessedFinancialData interface
const initialFinancialData: ProcessedFinancialData = {
  businessInfo: {
    name: '',
    industry: '',
    location: ''
  },
  totalRevenue: 0,
  totalExpenses: 0,
  profit: 0,
  recentTransactions: [],
  upcomingBills: []
};

// Atom to store the raw API response data
export const apiResponseAtom = atom<any>(null);

// Atom to store the processed financial data
export const financialDataAtom = atom<ProcessedFinancialData>(initialFinancialData);

// Atom to track if data has been loaded
export const isDataLoadedAtom = atom<boolean>(false);

// Atom to control the uploader visibility
export const showUploaderAtom = atom<boolean>(true);
