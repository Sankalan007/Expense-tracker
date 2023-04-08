export default interface Transaction {
  id: number | null;
  userId: number | null;
  type: String;
  description: String;
  amount: number;
  transactionTime: String;
  transactionDate: String;
  category: String;
}
