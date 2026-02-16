import React, { useState, useMemo } from 'react'
import Layout from './components/Layout'
import MapComponent from './components/MapContainer'
import PriceChart from './components/PriceChart'
import { STATIONS, generateTransactions } from './data/mockData'
import { Calendar, Building, TrendingUp } from 'lucide-react'

function App() {
  const [selectedStation, setSelectedStation] = useState(STATIONS[0]);

  const transactions = useMemo(() => {
    if (selectedStation) {
      return generateTransactions(selectedStation.id);
    }
    return [];
  }, [selectedStation]);

  const stats = useMemo(() => {
    if (!transactions.length) return { total: 0, avg: 0, max: 0 };
    const total = transactions.length;
    const sum = transactions.reduce((acc, curr) => acc + curr.price, 0);
    const avg = sum / total;
    const max = Math.max(...transactions.map(t => t.price));
    return { total, avg, max };
  }, [transactions]);

  const formatPrice = (price) => `${(price / 10000).toFixed(1)}억`;

  const sortedTransactions = useMemo(() => {
    return [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [transactions]);

  return (
    <Layout>
      {/* Stats */}
      <div className="stats-grid">
        <StatCard
          title="선택된 역"
          value={selectedStation?.name || '-'}
          icon={<Building size={18} color="#3b82f6" />}
        />
        <StatCard
          title="총 거래 건수"
          value={`${stats.total}건`}
          trend="+12%"
          trendDir="positive"
          icon={<Calendar size={18} color="#22c55e" />}
        />
        <StatCard
          title="평균 거래가"
          value={formatPrice(stats.avg)}
          trend="-2.4%"
          trendDir="negative"
          icon={<TrendingUp size={18} color="#f97316" />}
        />
        <StatCard
          title="최고 실거래가"
          value={formatPrice(stats.max)}
          icon={<TrendingUp size={18} color="#ef4444" />}
        />
      </div>

      {/* Map + Transaction List */}
      <div className="middle-section">
        <div className="card">
          <div className="card-header">
            <span className="card-header-title">역세권 지도</span>
            <span className="card-header-subtitle">역을 클릭하여 상세정보 확인</span>
          </div>
          <div className="card-body">
            <MapComponent
              selectedStationId={selectedStation?.id}
              onStationSelect={setSelectedStation}
            />
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <span className="card-header-title">최근 거래 내역</span>
            <span className="card-header-subtitle">{selectedStation?.name}</span>
          </div>
          <div className="card-body-scroll">
            {sortedTransactions.map(t => (
              <div key={t.id} className="transaction-item">
                <div>
                  <div className="transaction-name">{t.aptName}</div>
                  <div className="transaction-meta">
                    <span>{t.date}</span>
                    <span className="transaction-meta-dot"></span>
                    <span>{t.distance}m</span>
                  </div>
                </div>
                <div>
                  <div className="transaction-price">
                    {(t.price / 10000).toFixed(1)}억
                  </div>
                  <div className="transaction-pyung">{t.pyung}평</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="chart-section">
        <div className="chart-title">
          <TrendingUp size={18} color="#64748b" />
          가격 추세 분석 — {selectedStation?.name}
        </div>
        <div className="chart-wrapper">
          <PriceChart data={transactions} />
        </div>
      </div>
    </Layout>
  )
}

const StatCard = ({ title, value, trend, trendDir, icon }) => (
  <div className="stat-card">
    <div className="stat-card-header">
      <div className="stat-card-label">{title}</div>
      {icon && <div className="stat-card-icon">{icon}</div>}
    </div>
    <div className="stat-card-value">{value}</div>
    {trend && (
      <div className={`stat-card-trend ${trendDir}`}>
        {trend} (전월대비)
      </div>
    )}
  </div>
);

export default App
