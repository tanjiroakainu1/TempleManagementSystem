import { useEffect, useState, FormEvent } from 'react';
import { useDataVersion } from '@/context/DataContext';
import { dataApi } from '@/lib/api';
import { formatMoney, formatDateTime, formatPaymentMethod } from '@/lib/utils';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import StatCard from '@/components/ui/StatCard';

export default function DonatePage() {
  const version = useDataVersion();
  const [donations, setDonations] = useState<Record<string, unknown>[]>([]);
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const load = () => dataApi.donations().then(({ donations: d }) => setDonations(d));

  useEffect(() => { load(); }, [version]);

  const total = donations.reduce((s, d) => s + Number(d.amount), 0);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMsg('');
    const fd = new FormData(e.currentTarget);
    try {
      await dataApi.createDonation({
        amount: Number(fd.get('amount')),
        donation_type: fd.get('donation_type'),
        purpose: fd.get('purpose'),
        payment_method: fd.get('payment_method'),
      });
      setMsg('Thank you for your generous donation!');
      (e.target as HTMLFormElement).reset();
      load();
    } catch (err) {
      setMsg(err instanceof Error ? err.message : 'Failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6 w-full min-w-0">
      <h1 className="font-display text-xl sm:text-2xl font-bold text-maroon">Make Donations</h1>
      <StatCard icon="🎁" value={formatMoney(total)} label="Total Donated" variant="green" />
      {msg && <div className="rounded-lg bg-emerald-50 text-emerald-800 px-4 py-3">{msg}</div>}
      <Card>
        <CardHeader title="Make a Donation" />
        <CardBody>
          <form onSubmit={onSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl w-full">
            <div>
              <label className="block text-sm font-medium mb-1">Amount (₱)</label>
              <input name="amount" type="number" step="0.01" min="1" required className="input-candy" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Donation Type</label>
              <select name="donation_type" className="input-candy">
                <option value="general">General</option>
                <option value="temple_fund">Temple Fund</option>
                <option value="annadanam">Annadanam</option>
                <option value="festival">Festival</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Payment Method</label>
              <select name="payment_method" className="input-candy">
                <option value="gcash">GCash</option>
                <option value="paymaya">PayMaya</option>
                <option value="bank_transfer">Bank Transfer</option>
                <option value="cash">Cash</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Purpose (optional)</label>
              <input name="purpose" className="input-candy" />
            </div>
            <div className="md:col-span-2">
              <Button type="submit" disabled={loading}>{loading ? 'Processing...' : 'Donate Now'}</Button>
            </div>
          </form>
        </CardBody>
      </Card>
      <Card>
        <CardHeader title="My Donation History" />
        <CardBody className="table-scroll p-0 sm:p-5">
          <table className="w-full text-sm">
            <thead><tr className="border-b text-left text-slate-500">
              <th className="pb-2">Amount</th><th>Type</th><th>Purpose</th><th>Payment</th><th>Date</th>
            </tr></thead>
            <tbody>
              {donations.map((d) => (
                <tr key={String(d.id)} className="border-b border-slate-50">
                  <td className="py-2">{formatMoney(Number(d.amount))}</td>
                  <td>{String(d.donation_type)}</td>
                  <td>{String(d.purpose || '—')}</td>
                  <td>{formatPaymentMethod(String(d.payment_method))}</td>
                  <td>{formatDateTime(String(d.created_at))}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}
