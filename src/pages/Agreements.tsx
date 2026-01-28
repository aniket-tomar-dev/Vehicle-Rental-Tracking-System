import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, MoreHorizontal, Calendar, IndianRupee } from 'lucide-react';
import { agreements as allAgreements } from '@/data/mockData';
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
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { AgreementStatus } from '@/types';

const statusStyles: Record<AgreementStatus, string> = {
  active: 'bg-green-100 text-green-700 border-green-200',
  completed: 'bg-blue-100 text-blue-700 border-blue-200',
  cancelled: 'bg-red-100 text-red-700 border-red-200',
};

export default function Agreements() {
  const { currentBranch } = useBranch();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredAgreements = useMemo(() => {
    return allAgreements.filter((agreement) => {
      // Branch filter
      if (currentBranch && agreement.branchId !== currentBranch.id) return false;
      
      // Search filter
      if (search) {
        const searchLower = search.toLowerCase();
        if (
          !agreement.riderName.toLowerCase().includes(searchLower) &&
          !agreement.vehicleName.toLowerCase().includes(searchLower) &&
          !agreement.id.toLowerCase().includes(searchLower)
        ) {
          return false;
        }
      }
      
      // Status filter
      if (statusFilter !== 'all' && agreement.status !== statusFilter) return false;
      
      return true;
    });
  }, [currentBranch, search, statusFilter]);

  const totalValue = filteredAgreements.reduce((sum, a) => sum + a.totalAmount, 0);
  const totalPaid = filteredAgreements.reduce((sum, a) => sum + a.paidAmount, 0);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Agreements</h1>
          <p className="text-muted-foreground">Manage rental agreements</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          New Agreement
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
            placeholder="Search by rider, vehicle, ID..."
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
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-lg border border-border bg-card">
          <p className="text-2xl font-bold text-foreground">{filteredAgreements.length}</p>
          <p className="text-sm text-muted-foreground">Total Agreements</p>
        </div>
        <div className="p-4 rounded-lg border border-green-200 bg-green-50">
          <p className="text-2xl font-bold text-green-700">
            {filteredAgreements.filter((a) => a.status === 'active').length}
          </p>
          <p className="text-sm text-green-600">Active</p>
        </div>
        <div className="p-4 rounded-lg border border-primary/20 bg-primary/5">
          <p className="text-2xl font-bold text-primary">₹{totalValue.toLocaleString()}</p>
          <p className="text-sm text-primary/70">Total Value</p>
        </div>
        <div className="p-4 rounded-lg border border-border bg-card">
          <p className="text-2xl font-bold text-foreground">₹{totalPaid.toLocaleString()}</p>
          <p className="text-sm text-muted-foreground">Collected</p>
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
              <TableHead className="text-xs font-semibold uppercase text-muted-foreground">Agreement</TableHead>
              <TableHead className="text-xs font-semibold uppercase text-muted-foreground">Rider</TableHead>
              <TableHead className="text-xs font-semibold uppercase text-muted-foreground">Vehicle</TableHead>
              <TableHead className="text-xs font-semibold uppercase text-muted-foreground">Duration</TableHead>
              <TableHead className="text-xs font-semibold uppercase text-muted-foreground">Amount</TableHead>
              <TableHead className="text-xs font-semibold uppercase text-muted-foreground">Status</TableHead>
              <TableHead className="text-xs font-semibold uppercase text-muted-foreground w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAgreements.map((agreement, index) => {
              const paymentProgress = (agreement.paidAmount / agreement.totalAmount) * 100;
              return (
                <motion.tr
                  key={agreement.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group hover:bg-muted/30 transition-colors border-b border-border last:border-0"
                >
                  <TableCell>
                    <div>
                      <span className="font-mono text-sm font-medium">{agreement.id}</span>
                      <p className="text-xs text-muted-foreground">{agreement.branchName}</p>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{agreement.riderName}</TableCell>
                  <TableCell className="text-muted-foreground">{agreement.vehicleName}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>
                        {new Date(agreement.startDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                        {' - '}
                        {new Date(agreement.endDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1">
                        <IndianRupee className="w-3.5 h-3.5 text-muted-foreground" />
                        <span className="font-semibold">{agreement.totalAmount.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress value={paymentProgress} className="h-1.5 w-16" />
                        <span className="text-xs text-muted-foreground">{Math.round(paymentProgress)}%</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={cn('capitalize', statusStyles[agreement.status])}>
                      {agreement.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-popover">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Record Payment</DropdownMenuItem>
                        <DropdownMenuItem>Close Agreement</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </motion.tr>
              );
            })}
          </TableBody>
        </Table>
      </motion.div>
    </div>
  );
}
