export const STATIONS = [
    { id: 1, name: "강남역", line: "2호선", lat: 37.4979, lng: 127.0276 },
    { id: 2, name: "역삼역", line: "2호선", lat: 37.5006, lng: 127.0365 },
    { id: 3, name: "선릉역", line: "2호선", lat: 37.5045, lng: 127.0490 },
    { id: 4, name: "삼성역", line: "2호선", lat: 37.5088, lng: 127.0632 },
];

export const generateTransactions = (stationId) => {
    const station = STATIONS.find((s) => s.id === stationId);
    const transactions = [];
    const basePrice = 150000; // 1.5억 base
    for (let i = 0; i < 50; i++) {
        const date = new Date(2023, 0, 1 + i * 3).toISOString().split("T")[0];
        const price = basePrice + Math.random() * 50000 - 25000;
        transactions.push({
            id: `${stationId}-${i}`,
            stationName: station.name,
            aptName: `${station.name} 래미안 ${i + 1}차`,
            date,
            price: Math.floor(price),
            distance: Math.floor(Math.random() * 500),
            pyung: Math.floor(Math.random() * 30 + 20), // 20-50 pyung
        });
    }
    return transactions;
};
