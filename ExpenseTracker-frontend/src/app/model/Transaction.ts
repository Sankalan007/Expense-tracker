export default interface Transaction {
  id: number | null;
  userId: number | null;
  type: string;
  description: string;
  amount: number;
  transactionTime: string;
  transactionDate: string;
  category: string;
}
