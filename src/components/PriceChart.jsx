import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const PriceChart = ({ data }) => {
    if (!data || data.length === 0) {
        return (
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>
                역을 선택하면 가격 추세가 표시됩니다.
            </div>
        );
    }

    const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={sortedData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                <XAxis
                    dataKey="date"
                    tick={{ fontSize: 11, fill: '#94a3b8' }}
                    tickFormatter={(v) => v.substring(5)}
                    stroke="#334155"
                />
                <YAxis
                    domain={['auto', 'auto']}
                    tickFormatter={(v) => `${(v / 100000).toFixed(1)}억`}
                    width={55}
                    tick={{ fontSize: 11, fill: '#94a3b8' }}
                    stroke="#334155"
                />
                <Tooltip
                    formatter={(value) => [`${(value / 10000).toFixed(0)}만원`, '거래가']}
                    labelFormatter={(label) => `거래일: ${label}`}
                    contentStyle={{
                        backgroundColor: '#1e293b',
                        border: '1px solid #334155',
                        borderRadius: '8px',
                        color: '#f1f5f9'
                    }}
                />
                <Line
                    type="monotone"
                    dataKey="price"
                    stroke="#818cf8"
                    activeDot={{ r: 6, fill: '#6366f1' }}
                    name="실거래가"
                    strokeWidth={2}
                    dot={{ r: 2, fill: '#818cf8' }}
                />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default PriceChart;
