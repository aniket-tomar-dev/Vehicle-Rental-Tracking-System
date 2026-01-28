import { motion } from 'framer-motion';
import { vehicles } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { VehicleStatus } from '@/types';
import { Bike, Zap } from 'lucide-react';

const statusStyles: Record<VehicleStatus, string> = {
  available: 'bg-green-100 text-green-700 border-green-200',
  rented: 'bg-amber-100 text-amber-700 border-amber-200',
  broken: 'bg-red-100 text-red-700 border-red-200',
};

export function VehicleStatusGrid() {
  // Get status counts
  const statusCounts = vehicles.reduce(
    (acc, v) => {
      acc[v.status]++;
      return acc;
    },
    { available: 0, rented: 0, broken: 0 } as Record<VehicleStatus, number>
  );

  const topVehicles = vehicles.slice(0, 4);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.4 }}
      className="kpi-card"
    >
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground">Fleet Status</h3>
        <p className="text-sm text-muted-foreground">Vehicle availability overview</p>
      </div>

      {/* Status Summary */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="p-3 rounded-lg bg-green-50 border border-green-100">
          <p className="text-2xl font-bold text-green-700">{statusCounts.available}</p>
          <p className="text-xs text-green-600 font-medium">Available</p>
        </div>
        <div className="p-3 rounded-lg bg-amber-50 border border-amber-100">
          <p className="text-2xl font-bold text-amber-700">{statusCounts.rented}</p>
          <p className="text-xs text-amber-600 font-medium">Rented</p>
        </div>
        <div className="p-3 rounded-lg bg-red-50 border border-red-100">
          <p className="text-2xl font-bold text-red-700">{statusCounts.broken}</p>
          <p className="text-xs text-red-600 font-medium">Under Service</p>
        </div>
      </div>

      {/* Top Vehicles */}
      <div className="space-y-3">
        {topVehicles.map((vehicle) => (
          <div
            key={vehicle.id}
            className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                {vehicle.type === 'bike' ? (
                  <Bike className="w-5 h-5 text-primary" />
                ) : (
                  <Zap className="w-5 h-5 text-primary" />
                )}
              </div>
              <div>
                <p className="font-medium text-sm">{vehicle.name}</p>
                <p className="text-xs text-muted-foreground">{vehicle.branchName}</p>
              </div>
            </div>
            <Badge variant="outline" className={cn('capitalize text-xs', statusStyles[vehicle.status])}>
              {vehicle.status}
            </Badge>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
