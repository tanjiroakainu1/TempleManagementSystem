import { useEffect, useState, FormEvent } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useDataVersion } from '@/context/DataContext';
import { dataApi } from '@/lib/api';
import { formatMoney, formatDateTime } from '@/lib/utils';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';

export default function TransactionsPage() {
  const { user } = useAuth();
  const version = useDataVersion();
  const [transactions, setTransactions] = useState<Record<string, unknown>[]>([]);
  const isTreasurer = user?.role === 'treasurer';

  const load = () => dataApi.transactions().then(({ transactions: t }) => setTransactions(t));

  useEffect(() => { load(); }, [version]);

  const onCreate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    await dataApi.createTransaction({
      transaction_type: fd.get('transaction_type'),
      amount: Number(fd.get('amount')),
      description: fd.get('description'),
      category: fd.get('category'),
    });
    (e.target as HTMLFormElement).reset();
    load();
  };

  const approve = async (id: number, status: 'approved' | 'rejected') => {
    await dataApi.patchTransaction(id, status);
    load();
  };

  return (
    <div className="space-y-4 sm:space-y-6 w-full min-w-0">
      <h1 className="font-display text-xl sm:text-2xl font-bold text-maroon">
        {isTreasurer ? 'Manage Finances' : 'Record Transactions'}
      </h1>
      {user?.role === 'accountant' && (
        <Card>
          <CardHeader title="Record Transaction" />
          <CardBody>
            <form onSubmit={onCreate} className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl w-full">
              <select name="transaction_type" required className="input-candy w-full">
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
              <input name="amount" type="number" step="0.01" placeholder="Amount (₱)" required className="input-candy w-full" />
              <input name="category" placeholder="Category" className="input-candy w-full" />
              <textarea name="description" placeholder="Description" required rows={2} className="sm:col-span-2 input-candy w-full" />
              <Button type="submit">Submit for Approval</Button>
            </form>
          </CardBody>
        </Card>
      )}
      <Card>
        <CardHeader title="Transactions" />
        <CardBody className="table-scroll p-0 sm:p-5">
          <table className="w-full text-sm">
            <thead><tr className="border-b text-left text-slate-500">
              <th className="pb-2">Type</th><th>Amount</th><th>Description</th><th>Status</th><th>Date</th>
              {isTreasurer && <th>Action</th>}
            </tr></thead>
            <tbody>
              {transactions.map((t) => (
                <tr key={String(t.id)} className="border-b">
                  <td className="py-2"><Badge status={String(t.transaction_type)} /></td>
                  <td>{formatMoney(Number(t.amount))}</td>
                  <td>{String(t.description)}</td>
                  <td><Badge status={String(t.status)} /></td>
                  <td>{formatDateTime(String(t.created_at))}</td>
                  {isTreasurer && t.status === 'pending' && (
                    <td className="space-x-1">
                      <Button variant="primary" className="text-xs py-1" onClick={() => approve(Number(t.id), 'approved')}>Approve</Button>
                      <Button variant="danger" className="text-xs py-1" onClick={() => approve(Number(t.id), 'rejected')}>Reject</Button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}
