import { useState, useMemo } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { BarChart } from './components/BarChart';
import { FilterControls } from './components/FilterControls';
import { DataSummary } from './components/DataSUmmary';
import { aggregateDataByCategory, exportToCSV, filterData, generateSampleData } from './utils/ChartUtils';


function AppContent() {
  const [allData] = useState(() => generateSampleData());
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    category: '',
    region: '',
  });

  const filteredData = useMemo(
    () => filterData(allData, filters),
    [allData, filters]
  );

  const aggregatedData = useMemo(
    () => aggregateDataByCategory(filteredData),
    [filteredData]
  );

  const categories = useMemo(
    () => Array.from(new Set(allData.map((d) => d.category))).sort(),
    [allData]
  );

  const regions = useMemo(
    () => Array.from(new Set(allData.map((d) => d.region))).sort(),
    [allData]
  );

  const handleExport = () => {
    exportToCSV(filteredData, 'sales-data.csv');
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Sales Analytics Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Interactive data visualization with custom filters and real-time updates
          </p>
        </div>

        <FilterControls
          filters={filters}
          onFilterChange={setFilters}
          categories={categories}
          regions={regions}
          onExport={handleExport}
        />

        <DataSummary data={filteredData} />

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transition-colors duration-300">
          <div className="flex justify-center">
            <BarChart data={aggregatedData} width={900} height={500} />
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>
            Hover over bars to see detailed information. Use filters to explore different data
            segments.
          </p>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
