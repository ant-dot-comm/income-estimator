import { useState } from 'react';
import { Button, Form, Input } from 'antd';
import { FaPlus } from 'react-icons/fa';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

import SpaceDistributionComponent from './components/SpaceDistributionComponent';
import OccupancyEstimateComponent from './components/OccupancyEstimateComponent';

import './App.css';
import StyledInput from './components/StyledInput';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

function App() {
  const [spaceData, setSpaceData] = useState({
    type1: { isChecked: false, numSpaces: 0, dailyRate: 0, monthlyRate: 0, distribution: 50 },
    type2: { isChecked: false, numSpaces: 0, dailyRate: 0, monthlyRate: 0, distribution: 50 },
    type3: { isChecked: false, numSpaces: 0, dailyRate: 0, monthlyRate: 0, distribution: 50 },
  });

  const [profits, setProfits] = useState({
    type1: { monthlyProfit: 0, dailyProfit: 0 },
    type2: { monthlyProfit: 0, dailyProfit: 0 },
    type3: { monthlyProfit: 0, dailyProfit: 0 },
  });

  const [expenses, setExpenses] = useState({ expense1: 0, expense2: 0, expense3: 0 });

  const handleDataChange = (type, field, value) => {
    setSpaceData((prev) => ({
      ...prev,
      [type]: { ...prev[type], [field]: value },
    }));
  };

  const handleProfitChange = (type, profitData) => {
    setProfits((prev) => ({
      ...prev,
      [type]: profitData,
    }));
  };

  // Calculate total number of spaces
  const totalSpaces = Object.values(spaceData).reduce((acc, cur) => acc + cur.numSpaces, 0);

  // Calculate total estimated revenue
  const totalMonthlyRevenue = Object.values(profits).reduce((acc, cur) => acc + cur.monthlyProfit, 0);
  const totalDailyRevenue = Object.values(profits).reduce((acc, cur) => acc + cur.dailyProfit, 0);
  const grossRevenue = totalMonthlyRevenue + totalDailyRevenue;

  // Calculate total expenses and net profit
  const totalExpenses = Object.values(expenses).reduce((acc, cur) => acc + Number(cur), 0);
  const netProfit = grossRevenue - totalExpenses;

  const handleExpenseChange = (name, value) => {
    setExpenses((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const chartData = [
    { name: 'Type 1', value: profits.type1.monthlyProfit + profits.type1.dailyProfit },
    { name: 'Type 2', value: profits.type2.monthlyProfit + profits.type2.dailyProfit },
    { name: 'Type 3', value: profits.type3.monthlyProfit + profits.type3.dailyProfit },
  ];

  const SectionTitle = ({ title, addNew }) => (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">{title}</h2>
        {addNew && (
          <Button
            type="text"
            icon={<FaPlus className="text-neutral-900" />}
          />
        )}
      </div>
      <hr className="mb-8" />
    </>
  );
  return (
    <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-white rounded-2xl">
        <div className="p-8 pb-2">
          <h1 className="text-3xl font-bold mb-8">Calculate your monthly income</h1>
          <p className="text-xl font-bold">Tell us about your site</p>
        </div>

        <hr />

        <div className="p-8">
          <StyledInput label="Address" placeholder="1234 5th Ave" />
          <StyledInput label="Area in acres" placeholder="3" />
          
          <div className="mt-8">
            {SectionTitle({ 
              title: 'Space occupancy & distribution', 
              addNew: () => console.log('add new') 
            })}

            <SpaceDistributionComponent
              label="Type 1 Spaces"
              data={spaceData.type1}
              onCheckboxChange={(value) => handleDataChange('type1', 'isChecked', value)}
              onNumSpacesChange={(value) => handleDataChange('type1', 'numSpaces', value)}
              onDailyRateChange={(value) => handleDataChange('type1', 'dailyRate', value)}
              onMonthlyRateChange={(value) => handleDataChange('type1', 'monthlyRate', value)}
              onDistributionChange={(value) => handleDataChange('type1', 'distribution', value)}
              color={COLORS[0]}
            />
            <SpaceDistributionComponent
              label="Type 2 Spaces"
              data={spaceData.type2}
              onCheckboxChange={(value) => handleDataChange('type2', 'isChecked', value)}
              onNumSpacesChange={(value) => handleDataChange('type2', 'numSpaces', value)}
              onDailyRateChange={(value) => handleDataChange('type2', 'dailyRate', value)}
              onMonthlyRateChange={(value) => handleDataChange('type2', 'monthlyRate', value)}
              onDistributionChange={(value) => handleDataChange('type2', 'distribution', value)}
              color={COLORS[1]}
            />
            <SpaceDistributionComponent
              label="Type 3 Spaces"
              data={spaceData.type3}
              onCheckboxChange={(value) => handleDataChange('type3', 'isChecked', value)}
              onNumSpacesChange={(value) => handleDataChange('type3', 'numSpaces', value)}
              onDailyRateChange={(value) => handleDataChange('type3', 'dailyRate', value)}
              onMonthlyRateChange={(value) => handleDataChange('type3', 'monthlyRate', value)}
              onDistributionChange={(value) => handleDataChange('type3', 'distribution', value)}
              color={COLORS[2]}
            />

            {SectionTitle({ 
              title: 'Expenses', 
              addNew: () => console.log('add new') 
            })}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <StyledInput label="Expense 1" placeholder="123" value={expenses.expense1} onChange={(e) => handleExpenseChange('expense1', e.target.value)} />
              <StyledInput label="Expense 2" placeholder="123" value={expenses.expense2} onChange={(e) => handleExpenseChange('expense2', e.target.value)} />
              <StyledInput label="Expense 3" placeholder="123" value={expenses.expense3} onChange={(e) => handleExpenseChange('expense3', e.target.value)} />
            </div>

          </div>
        </div>
      </div>

      <div>
        <div className="bg-white rounded-2xl mb-4">
          <div className="p-8">
            <h2 className="text-2xl font-bold mb-0">Occupancy estimator</h2>
            <p className="text-lg font-bold text-neutral-400 mb-4">{totalSpaces} total spaces</p>
            <p>How many space do you expect to be filled?</p>
          </div>
          <OccupancyEstimateComponent
            label="Type 1 Spaces"
            spaceData={spaceData.type1}
            onProfitChange={(profitData) => handleProfitChange('type1', profitData)}
            color={COLORS[0]}
          />
          <OccupancyEstimateComponent
            label="Type 2 Spaces"
            spaceData={spaceData.type2}
            onProfitChange={(profitData) => handleProfitChange('type2', profitData)}
            color={COLORS[1]}
          />
          <OccupancyEstimateComponent
            label="Type 3 Spaces"
            spaceData={spaceData.type3}
            onProfitChange={(profitData) => handleProfitChange('type3', profitData)}
            color={COLORS[2]}
          />
        </div>
        <div className="bg-white rounded-2xl p-8">
          <h2 className="text-2xl font-semibold mb-2">Estimated Revenue</h2>
          <div className="flex justify-between"><p>Monthly Total:</p> <p>${totalMonthlyRevenue}</p></div>
          <div className="flex justify-between"><p>Daily Total:</p> <p>${totalDailyRevenue}</p></div>
          <div className="flex justify-between font-bold my-2"><p>Gross Revenue:</p><p>${grossRevenue}</p></div>
          <div className="flex justify-between"><p>Total Expenses:</p> <p>${totalExpenses}</p></div>
          <div className="flex justify-between font-bold mt-2 text-lg"><p>Net Profit:</p><p>${netProfit}</p></div>
          
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={150}
                fill="#8884d8"
                label={({ name, value }) => `${name}: $${value}`}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `$${value}`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default App;
