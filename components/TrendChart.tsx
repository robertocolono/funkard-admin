"use client";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface TrendChartProps {
  data: number[];
  title: string;
}

export default function TrendChart({ data, title }: TrendChartProps) {
  const chartData = data.map((value, index) => ({
    day: `G${index + 1}`,
    price: value
  }));

  return (
    <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
      <h3 className="text-lg font-semibold mb-4 text-yellow-400">{title}</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="day" 
              stroke="#9CA3AF"
              fontSize={12}
            />
            <YAxis 
              stroke="#9CA3AF"
              fontSize={12}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: '#18181B',
                border: '1px solid #27272A',
                borderRadius: '8px',
                color: '#FCD34D'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="price" 
              stroke="#FCD34D" 
              strokeWidth={2}
              dot={{ fill: '#FCD34D', strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
