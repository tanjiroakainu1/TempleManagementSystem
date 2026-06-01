import { useEffect, useState, FormEvent } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useDataVersion } from '@/context/DataContext';
import { dataApi } from '@/lib/api';
import { formatMoney, formatDateTime, formatPaymentMethod } from '@/lib/utils';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function DonationsManagePage() {
  const { user } = useAuth();
  const version = useDataVersion();
  const [donations, setDonations] = useState<Record<string, unknown>[]>([]);
  const [donors, setDonors] = useState<{ id: number; full_name: string }[]>([]);
  const canRecord = user?.role === 'donation_manager' || user?.role === 'super_admin' || user?.role === 'temple_administrator';

  const load = () => dataApi.donations().then(({ donations: d }) => setDonations(d));

  useEffect(() => {
    load();
    if (canRecord) {
      dataApi.usersByRole('devotee').then(({ users }) => setDonors(users)).catch(() => {});
    }
  }, [version, canRecord]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    await dataApi.createDonation({
      donor_id: Number(fd.get('donor_id')),
      amount: Number(fd.get('amount')),
      donation_type: fd.get('donation_type'),
      purpose: fd.get('purpose'),
      payment_method: fd.get('payment_method'),
    });
    (e.target as HTMLFormElement).reset();
    load();
  };

  return (
    <div className="space-y-4 sm:space-y-6 w-full min-w-0">
      <h1 className="font-display text-xl sm:text-2xl font-bold text-maroon">
        {canRecord ? 'Track Donations' : 'Monitor Donations'}
      </h1>
      {canRecord && <Card>
        <CardHeader title="Record Donation" />
        <CardBody>
          <form onSubmit={onSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl w-full">
            <div>
              <label className="block text-sm font-medium mb-1">Donor</label>
              <select name="donor_id" required className="input-candy">
                {donors.map((d) => <option key={d.id} value={d.id}>{d.full_name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Amount (₱)</label>
              <input name="amount" type="number" step="0.01" min="1" required className="input-candy" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Type</label>
              <select name="donation_type" className="input-candy">
                <option value="general">General</option>
                <option value="temple_fund">Temple Fund</option>
                <option value="festival">Festival</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Payment</label>
              <select name="payment_method" className="input-candy">
                <option value="cash">Cash</option>
                <option value="gcash">GCash</option>
                <option value="paymaya">PayMaya</option>
              </select>
            </div>
            <div className="md:col-span-2"><Button type="submit">Record Donation</Button></div>
          </form>
        </CardBody>
      </Card>}
      <Card>
        <CardHeader title="All Donations" />
        <CardBody className="table-scroll p-0 sm:p-5">
          <table className="w-full text-sm">
            <thead><tr className="border-b text-left text-slate-500">
              <th className="pb-2">Donor</th><th>Amount</th><th>Type</th><th>Payment</th><th>Date</th>
            </tr></thead>
            <tbody>
              {donations.map((d) => (
                <tr key={String(d.id)} className="border-b">
                  <td className="py-2">{String(d.donor_name || d.donor_id)}</td>
                  <td>{formatMoney(Number(d.amount))}</td>
                  <td>{String(d.donation_type)}</td>
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
