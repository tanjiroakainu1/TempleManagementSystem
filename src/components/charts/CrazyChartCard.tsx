import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { ChartPoint } from '@/lib/chartData';
import { CHART_COLORS } from './chartTheme';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';

interface Props {
  title: string;
  data: ChartPoint[];
  type: 'bar' | 'pie' | 'area' | 'line' | 'radial';
  height?: number;
}

function CrazyTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value: number; name: string }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border-2 border-candy-300 bg-white px-3 py-2 shadow-candy text-sm font-bold text-candy-900 max-w-[200px]">
      <p className="text-candy-600 text-xs truncate">{label ?? payload[0].name}</p>
      <p>
        {typeof payload[0].value === 'number' && payload[0].value > 999
          ? `₱${payload[0].value.toLocaleString()}`
          : payload[0].value}
      </p>
    </div>
  );
}

export default function CrazyChartCard({ title, data, type, height }: Props) {
  const safe = data.length ? data : [{ name: 'No data', value: 0 }];

  return (
    <Card className="overflow-hidden border-candy-300/60 hover:shadow-candy-lg transition-shadow w-full min-w-0">
      <CardHeader title={title} />
      <CardBody className="pt-2 pb-4 px-2 sm:px-5">
        <div className="chart-responsive w-full" style={height ? { height, maxHeight: height } : undefined}>
          <ResponsiveContainer width="100%" height="100%">
            {type === 'pie' ? (
              <PieChart>
                <Pie
                  data={safe}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius="35%"
                  outerRadius="70%"
                  paddingAngle={3}
                  label={({ name, percent }) =>
                    `${String(name).slice(0, 8)}${String(name).length > 8 ? '…' : ''} ${((percent ?? 0) * 100).toFixed(0)}%`
                  }
                >
                  {safe.map((_, i) => (
                    <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} stroke="#fff" strokeWidth={2} />
                  ))}
                </Pie>
                <Tooltip content={<CrazyTooltip />} />
                <Legend wrapperStyle={{ fontSize: 10, fontWeight: 600 }} />
              </PieChart>
            ) : type === 'area' ? (
              <AreaChart data={safe} margin={{ top: 8, right: 4, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="ashArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#71717a" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#e4e4e7" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#d4d4d8" />
                <XAxis dataKey="name" tick={{ fontSize: 9, fill: '#52525b' }} interval="preserveStartEnd" />
                <YAxis tick={{ fontSize: 9, fill: '#52525b' }} width={36} />
                <Tooltip content={<CrazyTooltip />} />
                <Area type="monotone" dataKey="value" stroke="#52525b" strokeWidth={2} fill="url(#ashArea)" />
              </AreaChart>
            ) : type === 'line' ? (
              <LineChart data={safe} margin={{ top: 8, right: 4, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#d4d4d8" />
                <XAxis dataKey="name" tick={{ fontSize: 9, fill: '#52525b' }} interval="preserveStartEnd" />
                <YAxis tick={{ fontSize: 9, fill: '#52525b' }} width={36} />
                <Tooltip content={<CrazyTooltip />} />
                <Line type="monotone" dataKey="value" stroke="#52525b" strokeWidth={2} dot={{ fill: '#71717a', r: 3 }} />
              </LineChart>
            ) : (
              <BarChart data={safe} margin={{ top: 8, right: 4, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#d4d4d8" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 9, fill: '#52525b' }} interval={0} angle={-25} textAnchor="end" height={50} />
                <YAxis tick={{ fontSize: 9, fill: '#52525b' }} width={36} />
                <Tooltip content={<CrazyTooltip />} />
                <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={40}>
                  {safe.map((_, i) => (
                    <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </CardBody>
    </Card>
  );
}
