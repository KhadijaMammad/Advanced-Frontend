export const DataSummary = ({ data }) => {
  const totalSales = data.reduce((sum, item) => sum + item.value, 0);
  const averageSales = data.length > 0 ? totalSales / data.length : 0;
  const maxSale = data.length > 0 ? Math.max(...data.map((d) => d.value)) : 0;
  const minSale = data.length > 0 ? Math.min(...data.map((d) => d.value)) : 0;

  const stats = [
    { label: 'Total Sales', value: `$${totalSales.toLocaleString()}` },
    { label: 'Average Sale', value: `$${Math.round(averageSales).toLocaleString()}` },
    { label: 'Highest Sale', value: `$${maxSale.toLocaleString()}` },
    { label: 'Lowest Sale', value: `$${minSale.toLocaleString()}` },
    { label: 'Total Records', value: data.length.toString() },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-6 transition-colors duration-300">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Data Summary
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
          >
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {stat.value}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
