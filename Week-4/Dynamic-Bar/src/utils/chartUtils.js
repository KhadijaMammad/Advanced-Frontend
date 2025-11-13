export const generateSampleData = () => {
  const categories = ['Electronics', 'Clothing', 'Food', 'Books', 'Sports'];
  const regions = ['North', 'South', 'East', 'West'];
  const data = [];

  const startDate = new Date('2024-01-01');
  const endDate = new Date('2024-12-31');

  for (let i = 0; i < 100; i++) {
    const randomDate = new Date(
      startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime())
    );

    data.push({
      id: `${i}`,
      date: randomDate.toISOString().split('T')[0],
      category: categories[Math.floor(Math.random() * categories.length)],
      region: regions[Math.floor(Math.random() * regions.length)],
      value: Math.floor(Math.random() * 10000) + 1000,
    });
  }

  return data.sort((a, b) => a.date.localeCompare(b.date));
};

export const filterData = (data, filters) => {
  return data.filter((item) => {
    const dateMatch =
      (!filters.startDate || item.date >= filters.startDate) &&
      (!filters.endDate || item.date <= filters.endDate);
    const categoryMatch = !filters.category || item.category === filters.category;
    const regionMatch = !filters.region || item.region === filters.region;

    return dateMatch && categoryMatch && regionMatch;
  });
};

export const aggregateDataByCategory = (data) => {
  return data.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + item.value;
    return acc;
  }, {});
};

export const exportToCSV = (data, filename = 'chart-data.csv') => {
  const headers = ['Date', 'Category', 'Region', 'Value'];
  const csvContent = [
    headers.join(','),
    ...data.map((row) => `${row.date},${row.category},${row.region},${row.value}`),
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
