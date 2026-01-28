import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Filter, Calendar, BarChart3, PieChart, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useBranch } from '@/contexts/BranchContext';
import { earningsData, branchPerformance, vehicles } from '@/data/mockData';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RePieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';

const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))'];

export default function Reports() {
  const { currentBranch, allBranches } = useBranch();
  const [timeGrouping, setTimeGrouping] = useState<string>('monthly');
  const [selectedBranch, setSelectedBranch] = useState<string>('all');

  // Calculate vehicle type distribution
  const vehicleTypeData = [
    { name: 'Scooters', value: vehicles.filter((v) => v.type === 'scooter').length },
    { name: 'Bikes', value: vehicles.filter((v) => v.type === 'bike').length },
  ];

  // Calculate status distribution
  const statusData = [
    { name: 'Available', value: vehicles.filter((v) => v.status === 'available').length },
    { name: 'Rented', value: vehicles.filter((v) => v.status === 'rented').length },
    { name: 'Under Service', value: vehicles.filter((v) => v.status === 'broken').length },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Reports & Analytics</h1>
          <p className="text-muted-foreground">
            Comprehensive business insights
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export CSV
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export Excel
          </Button>
        </div>
      </div>

      {/* Filters Panel */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 rounded-xl border border-border bg-card"
      >
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <span className="font-medium text-sm">Filters</span>
          <Badge variant="secondary" className="ml-2">3 active</Badge>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Select value={selectedBranch} onValueChange={setSelectedBranch}>
            <SelectTrigger>
              <SelectValue placeholder="Select Branch" />
            </SelectTrigger>
            <SelectContent className="bg-popover">
              <SelectItem value="all">All Branches</SelectItem>
              {allBranches.map((branch) => (
                <SelectItem key={branch.id} value={branch.id}>
                  {branch.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={timeGrouping} onValueChange={setTimeGrouping}>
            <SelectTrigger>
              <SelectValue placeholder="Time Period" />
            </SelectTrigger>
            <SelectContent className="bg-popover">
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger>
              <SelectValue placeholder="Vehicle" />
            </SelectTrigger>
            <SelectContent className="bg-popover">
              <SelectItem value="all">All Vehicles</SelectItem>
              <SelectItem value="bikes">Bikes Only</SelectItem>
              <SelectItem value="scooters">Scooters Only</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger>
              <SelectValue placeholder="Payment Status" />
            </SelectTrigger>
            <SelectContent className="bg-popover">
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="overdue">Overdue</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </motion.div>

      {/* Report Tabs */}
      <Tabs defaultValue="earnings" className="space-y-6">
        <TabsList className="bg-muted/50 p-1">
          <TabsTrigger value="earnings" className="gap-2 data-[state=active]:bg-card">
            <TrendingUp className="w-4 h-4" />
            Earnings
          </TabsTrigger>
          <TabsTrigger value="branch" className="gap-2 data-[state=active]:bg-card">
            <BarChart3 className="w-4 h-4" />
            Branch Analysis
          </TabsTrigger>
          <TabsTrigger value="fleet" className="gap-2 data-[state=active]:bg-card">
            <PieChart className="w-4 h-4" />
            Fleet Overview
          </TabsTrigger>
        </TabsList>

        {/* Earnings Tab */}
        <TabsContent value="earnings" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-2 p-6 rounded-xl border border-border bg-card"
            >
              <div className="mb-4">
                <h3 className="text-lg font-semibold">Earnings Trend</h3>
                <p className="text-sm text-muted-foreground">Revenue over time</p>
              </div>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={earningsData}>
                    <defs>
                      <linearGradient id="reportGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--popover))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                      }}
                      formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Earnings']}
                    />
                    <Area type="monotone" dataKey="earnings" stroke="hsl(var(--primary))" strokeWidth={2} fill="url(#reportGradient)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Summary Cards */}
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="p-5 rounded-xl border border-border bg-card"
              >
                <p className="text-sm text-muted-foreground mb-1">Total Earnings</p>
                <p className="text-3xl font-bold text-foreground">₹4,64,000</p>
                <p className="text-sm text-status-available mt-2">+8.2% from last month</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="p-5 rounded-xl border border-border bg-card"
              >
                <p className="text-sm text-muted-foreground mb-1">Service Charges</p>
                <p className="text-3xl font-bold text-foreground">₹36,000</p>
                <p className="text-sm text-muted-foreground mt-2">7.8% of total revenue</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="p-5 rounded-xl border border-border bg-card"
              >
                <p className="text-sm text-muted-foreground mb-1">Outstanding</p>
                <p className="text-3xl font-bold text-status-rented">₹86,500</p>
                <p className="text-sm text-muted-foreground mt-2">12 pending payments</p>
              </motion.div>
            </div>
          </div>
        </TabsContent>

        {/* Branch Analysis Tab */}
        <TabsContent value="branch" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-xl border border-border bg-card"
          >
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Branch Performance Comparison</h3>
              <p className="text-sm text-muted-foreground">Earnings and utilization by branch</p>
            </div>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={branchPerformance} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={true} vertical={false} />
                  <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
                  <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} width={120} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--popover))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                    formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Earnings']}
                  />
                  <Bar dataKey="earnings" fill="hsl(var(--primary))" radius={[0, 6, 6, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </TabsContent>

        {/* Fleet Overview Tab */}
        <TabsContent value="fleet" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 rounded-xl border border-border bg-card"
            >
              <div className="mb-4">
                <h3 className="text-lg font-semibold">Vehicle Types</h3>
                <p className="text-sm text-muted-foreground">Distribution by type</p>
              </div>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RePieChart>
                    <Pie
                      data={vehicleTypeData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {vehicleTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--popover))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                      }}
                    />
                    <Legend />
                  </RePieChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="p-6 rounded-xl border border-border bg-card"
            >
              <div className="mb-4">
                <h3 className="text-lg font-semibold">Fleet Status</h3>
                <p className="text-sm text-muted-foreground">Current availability</p>
              </div>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RePieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      <Cell fill="hsl(var(--status-available))" />
                      <Cell fill="hsl(var(--status-rented))" />
                      <Cell fill="hsl(var(--status-broken))" />
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--popover))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                      }}
                    />
                    <Legend />
                  </RePieChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
