import { IndianRupee, FileText, AlertCircle, TrendingUp, Bike, Users } from 'lucide-react';
import { KPICard } from '@/components/dashboard/KPICard';
import { EarningsChart } from '@/components/dashboard/EarningsChart';
import { BranchPerformanceChart } from '@/components/dashboard/BranchPerformanceChart';
import { RecentPaymentsTable } from '@/components/dashboard/RecentPaymentsTable';
import { VehicleStatusGrid } from '@/components/dashboard/VehicleStatusGrid';
import { dashboardKPIs } from '@/data/mockData';
import { useBranch } from '@/contexts/BranchContext';

export default function Dashboard() {
  const { currentBranch } = useBranch();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">
            {currentBranch ? `${currentBranch.name} Overview` : 'All Branches Overview'}
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="w-2 h-2 rounded-full bg-status-available animate-pulse" />
          Live Data
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Total Earnings"
          value={`₹${dashboardKPIs.totalEarnings.toLocaleString()}`}
          icon={IndianRupee}
          trend={{ value: 8.2, isPositive: true }}
          iconClassName="bg-gradient-to-br from-primary to-chart-2"
        />
        <KPICard
          title="Active Agreements"
          value={dashboardKPIs.activeAgreements}
          icon={FileText}
          trend={{ value: 4.5, isPositive: true }}
          subtitle={`${dashboardKPIs.totalVehicles} total vehicles`}
        />
        <KPICard
          title="Outstanding Dues"
          value={`₹${dashboardKPIs.outstandingDues.toLocaleString()}`}
          icon={AlertCircle}
          subtitle="5 overdue payments"
        />
        <KPICard
          title="Vehicle Utilization"
          value={`${dashboardKPIs.vehicleUtilization}%`}
          icon={TrendingUp}
          trend={{ value: 2.3, isPositive: true }}
          subtitle={`${dashboardKPIs.availableVehicles} available`}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <EarningsChart />
        <BranchPerformanceChart />
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentPaymentsTable />
        <VehicleStatusGrid />
      </div>
    </div>
  );
}
