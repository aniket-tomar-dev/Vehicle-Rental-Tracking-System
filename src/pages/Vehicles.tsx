import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Filter, Bike, Zap, MoreHorizontal } from 'lucide-react';
import { vehicles as allVehicles } from '@/data/mockData';
import { useBranch } from '@/contexts/BranchContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { VehicleStatus, VehicleType } from '@/types';

const statusStyles: Record<VehicleStatus, string> = {
  available: 'bg-green-100 text-green-700 border-green-200',
  rented: 'bg-amber-100 text-amber-700 border-amber-200',
  broken: 'bg-red-100 text-red-700 border-red-200',
};

export default function Vehicles() {
  const { currentBranch } = useBranch();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const filteredVehicles = useMemo(() => {
    return allVehicles.filter((vehicle) => {
      // Branch filter
      if (currentBranch && vehicle.branchId !== currentBranch.id) return false;
      
      // Search filter
      if (search) {
        const searchLower = search.toLowerCase();
        if (
          !vehicle.name.toLowerCase().includes(searchLower) &&
          !vehicle.registrationNumber.toLowerCase().includes(searchLower)
        ) {
          return false;
        }
      }
      
      // Status filter
      if (statusFilter !== 'all' && vehicle.status !== statusFilter) return false;
      
      // Type filter
      if (typeFilter !== 'all' && vehicle.type !== typeFilter) return false;
      
      return true;
    });
  }, [currentBranch, search, statusFilter, typeFilter]);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Vehicles</h1>
          <p className="text-muted-foreground">
            Manage your electric vehicle fleet
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Add Vehicle
        </Button>
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or registration..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent className="bg-popover">
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="available">Available</SelectItem>
            <SelectItem value="rented">Rented</SelectItem>
            <SelectItem value="broken">Under Service</SelectItem>
          </SelectContent>
        </Select>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent className="bg-popover">
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="bike">Bikes</SelectItem>
            <SelectItem value="scooter">Scooters</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-lg border border-border bg-card">
          <p className="text-2xl font-bold text-foreground">{filteredVehicles.length}</p>
          <p className="text-sm text-muted-foreground">Total Vehicles</p>
        </div>
        <div className="p-4 rounded-lg border border-green-200 bg-green-50">
          <p className="text-2xl font-bold text-green-700">
            {filteredVehicles.filter((v) => v.status === 'available').length}
          </p>
          <p className="text-sm text-green-600">Available</p>
        </div>
        <div className="p-4 rounded-lg border border-amber-200 bg-amber-50">
          <p className="text-2xl font-bold text-amber-700">
            {filteredVehicles.filter((v) => v.status === 'rented').length}
          </p>
          <p className="text-sm text-amber-600">Rented</p>
        </div>
        <div className="p-4 rounded-lg border border-red-200 bg-red-50">
          <p className="text-2xl font-bold text-red-700">
            {filteredVehicles.filter((v) => v.status === 'broken').length}
          </p>
          <p className="text-sm text-red-600">Under Service</p>
        </div>
      </div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-xl border border-border bg-card overflow-hidden"
      >
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead className="text-xs font-semibold uppercase text-muted-foreground">Vehicle</TableHead>
              <TableHead className="text-xs font-semibold uppercase text-muted-foreground">Type</TableHead>
              <TableHead className="text-xs font-semibold uppercase text-muted-foreground">Registration</TableHead>
              <TableHead className="text-xs font-semibold uppercase text-muted-foreground">Branch</TableHead>
              <TableHead className="text-xs font-semibold uppercase text-muted-foreground">Status</TableHead>
              <TableHead className="text-xs font-semibold uppercase text-muted-foreground">Total Earnings</TableHead>
              <TableHead className="text-xs font-semibold uppercase text-muted-foreground w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredVehicles.map((vehicle, index) => (
              <motion.tr
                key={vehicle.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group hover:bg-muted/30 transition-colors border-b border-border last:border-0"
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      {vehicle.type === 'bike' ? (
                        <Bike className="w-5 h-5 text-primary" />
                      ) : (
                        <Zap className="w-5 h-5 text-primary" />
                      )}
                    </div>
                    <span className="font-medium">{vehicle.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className="capitalize">
                    {vehicle.type}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground font-mono text-sm">
                  {vehicle.registrationNumber}
                </TableCell>
                <TableCell className="text-muted-foreground">{vehicle.branchName}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={cn('capitalize', statusStyles[vehicle.status])}>
                    {vehicle.status === 'broken' ? 'Under Service' : vehicle.status}
                  </Badge>
                </TableCell>
                <TableCell className="font-semibold">₹{vehicle.totalEarnings.toLocaleString()}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-popover">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Edit Vehicle</DropdownMenuItem>
                      <DropdownMenuItem>Update Status</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </motion.div>
    </div>
  );
}
