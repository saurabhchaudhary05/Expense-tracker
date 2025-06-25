import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, FunnelChart, Funnel, LabelList, ComposedChart, AreaChart, Area } from 'recharts';
import { Paper, Typography, Stack, MenuItem, FormControl, Select, InputLabel } from '@mui/material';

const COLORS = ['#1976d2', '#43a047', '#fbc02d', '#e53935', '#8e24aa', '#00838f'];

// Helper to group expenses by category
const getCategoryData = (expenses) => {
  const map = {};
  expenses.forEach((e) => {
    map[e.category] = (map[e.category] || 0) + e.amount;
  });
  return Object.entries(map).map(([name, value]) => ({ name, value }));
};

// Helper to group expenses by month (with month names)
const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const getMonthData = (expenses) => {
  const map = {};
  expenses.forEach((e) => {
    const d = new Date(e.date);
    const key = `${MONTH_NAMES[d.getMonth()]} ${d.getFullYear()}`;
    map[key] = (map[key] || 0) + e.amount;
  });
  return Object.entries(map).map(([month, total]) => ({ month, total }));
};

// Helper to group expenses by year
const getYearData = (expenses) => {
  const map = {};
  expenses.forEach((e) => {
    const d = new Date(e.date);
    const key = `${d.getFullYear()}`;
    map[key] = (map[key] || 0) + e.amount;
  });
  return Object.entries(map).map(([year, total]) => ({ year, total }));
};

// Helper to group expenses by category for line chart
const getCategoryLineData = (expenses) => {
  const map = {};
  expenses.forEach((e) => {
    map[e.category] = (map[e.category] || 0) + e.amount;
  });
  return Object.entries(map).map(([category, total]) => ({ category, total }));
};

// Helper to group expenses by day
const getDayData = (expenses) => {
  const map = {};
  expenses.forEach((e) => {
    const d = new Date(e.date);
    const key = `${d.getDate().toString().padStart(2, '0')} ${MONTH_NAMES[d.getMonth()]} ${d.getFullYear()}`;
    map[key] = (map[key] || 0) + e.amount;
  });
  return Object.entries(map).map(([day, total]) => ({ day, total }));
};

const ExpenseChart = ({ expenses }) => {
  const [trendType, setTrendType] = useState('month'); // 'month', 'year', 'category'
  const categoryData = getCategoryData(expenses);
  const monthData = getMonthData(expenses);
  const yearData = getYearData(expenses);
  const categoryLineData = getCategoryLineData(expenses);

  let lineData = monthData;
  let xKey = 'month';
  let chartLabel = 'Month';
  if (trendType === 'year') {
    lineData = yearData;
    xKey = 'year';
    chartLabel = 'Year';
  } else if (trendType === 'category') {
    lineData = categoryLineData;
    xKey = 'category';
    chartLabel = 'Category';
  }

  // Prepare data for funnel chart (by category, descending order)
  const funnelData = [...categoryData].sort((a, b) => b.value - a.value);

  // Waterfall chart data: cumulative monthly expenses
  let cumulative = 0;
  const waterfallData = monthData.map((d) => {
    cumulative += d.total;
    return { ...d, cumulative };
  });

  // Bubble chart data: each expense as a bubble (x=date, y=amount, size=amount)
  const bubbleData = expenses.map(e => ({
    x: new Date(e.date).getTime(),
    y: e.amount,
    z: Math.max(e.amount, 10), // size, min 10 for visibility
    category: e.category,
    dateLabel: new Date(e.date).toLocaleDateString(),
  }));

  // Area chart interactivity
  const [areaFactor, setAreaFactor] = useState('month'); // 'month', 'day', 'year', 'category'
  let areaData = monthData;
  let areaXKey = 'month';
  let areaLabel = 'Month';
  if (areaFactor === 'day') {
    areaData = getDayData(expenses);
    areaXKey = 'day';
    areaLabel = 'Day';
  } else if (areaFactor === 'year') {
    areaData = yearData;
    areaXKey = 'year';
    areaLabel = 'Year';
  } else if (areaFactor === 'category') {
    areaData = categoryLineData;
    areaXKey = 'category';
    areaLabel = 'Category';
  }

  return (
    <>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} justifyContent="center" alignItems="stretch" sx={{ width: '100%' }}>
        <Paper elevation={4} sx={{ flex: 1, minWidth: 320, p: 3, borderRadius: 3, mb: { xs: 3, md: 0 } }}>
          <Typography variant="h6" align="center" sx={{ mb: 2, fontWeight: 600 }}>Expenses by Category</Typography>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={categoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                {categoryData.map((entry, idx) => (
                  <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Paper>
        <Paper elevation={4} sx={{ flex: 1, minWidth: 320, p: 3, borderRadius: 3 }}>
          <Typography variant="h6" align="center" sx={{ mb: 2, fontWeight: 600 }}>Expenses by Month</Typography>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={monthData} margin={{ top: 16, right: 16, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="total" fill="#1976d2" />
            </BarChart>
          </ResponsiveContainer>
        </Paper>
      </Stack>
      {/* Line Chart for Expense Trend */}
      <Paper elevation={4} sx={{ mt: 4, p: 3, borderRadius: 3, maxWidth: 900, mx: 'auto' }}>
        <Stack direction="row" spacing={2} alignItems="center" justifyContent="flex-end" sx={{ mb: 2 }}>
          <FormControl size="small" sx={{ minWidth: 180 }}>
            <InputLabel id="trend-type-label">Trend Analysis</InputLabel>
            <Select
              labelId="trend-type-label"
              value={trendType}
              label="Trend Analysis"
              onChange={e => setTrendType(e.target.value)}
            >
              <MenuItem value="month">Month-wise</MenuItem>
              <MenuItem value="year">Year-wise</MenuItem>
              <MenuItem value="category">Category-wise</MenuItem>
            </Select>
          </FormControl>
        </Stack>
        <Typography variant="h6" align="center" sx={{ mb: 2, fontWeight: 600 }}>Expense Trend (Line Chart)</Typography>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={lineData} margin={{ top: 16, right: 16, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xKey} label={{ value: chartLabel, position: 'insideBottomRight', offset: -5 }} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="total" stroke="#43a047" strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </Paper>
      {/* Funnel Chart for Expenses by Category */}
      <Paper elevation={4} sx={{ mt: 4, p: 3, borderRadius: 3, maxWidth: 900, mx: 'auto' }}>
        <Typography variant="h6" align="center" sx={{ mb: 2, fontWeight: 600 }}>Expense Funnel by Category</Typography>
        <ResponsiveContainer width="100%" height={320}>
          <FunnelChart>
            <Tooltip />
            <Funnel
              dataKey="value"
              data={funnelData}
              isAnimationActive
              nameKey="name"
              stroke="#1976d2"
              fill="#43a047"
            >
              <LabelList dataKey="name" position="right" fill="#1976d2" style={{ fontWeight: 600 }} />
            </Funnel>
          </FunnelChart>
        </ResponsiveContainer>
      </Paper>
      {/* Waterfall and Area Charts Side by Side */}
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} justifyContent="center" alignItems="stretch" sx={{ width: '100%', mt: 4 }}>
        {/* Waterfall Chart */}
        <Paper elevation={4} sx={{ flex: 1, minWidth: 320, p: 3, borderRadius: 3 }}>
          <Typography variant="h6" align="center" sx={{ mb: 2, fontWeight: 600 }}>Waterfall Chart (Cumulative Monthly Expenses)</Typography>
          <ResponsiveContainer width="100%" height={280}>
            <ComposedChart data={waterfallData} margin={{ top: 16, right: 16, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="total" name="Monthly Expense" fill="#1976d2" />
              <Line type="monotone" dataKey="cumulative" name="Cumulative" stroke="#43a047" strokeWidth={3} dot={{ r: 4 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </Paper>
        {/* Area Chart with Interactivity */}
        <Paper elevation={4} sx={{ flex: 1, minWidth: 320, p: 3, borderRadius: 3 }}>
          <Stack direction="row" spacing={2} alignItems="center" justifyContent="flex-end" sx={{ mb: 2 }}>
            <FormControl size="small" sx={{ minWidth: 160 }}>
              <InputLabel id="area-factor-label">Area Analysis</InputLabel>
              <Select
                labelId="area-factor-label"
                value={areaFactor}
                label="Area Analysis"
                onChange={e => setAreaFactor(e.target.value)}
              >
                <MenuItem value="month">Month</MenuItem>
                <MenuItem value="day">Day</MenuItem>
                <MenuItem value="year">Year</MenuItem>
                <MenuItem value="category">Category</MenuItem>
              </Select>
            </FormControl>
          </Stack>
          <Typography variant="h6" align="center" sx={{ mb: 2, fontWeight: 600 }}>{`Area Chart (${areaLabel}ly Expenses)`}</Typography>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={areaData} margin={{ top: 16, right: 16, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={areaXKey} />
              <YAxis />
              <Tooltip formatter={value => `₹${value}`} />
              <Legend />
              <Area type="monotone" dataKey="total" stroke="#1976d2" fill="#b2f7ef" fillOpacity={0.7} name={`${areaLabel}ly Expense`} />
            </AreaChart>
          </ResponsiveContainer>
        </Paper>
      </Stack>
    </>
  );
};

export default ExpenseChart;
