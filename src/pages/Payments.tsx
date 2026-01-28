import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Download, MoreHorizontal, IndianRupee, AlertCircle } from 'lucide-react';
import { payments as allPayments } from '@/data/mockData';
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
import { PaymentStatus } from '@/types';

const statusStyles: Record<PaymentStatus, string> = {
  paid: 'bg-green-100 text-green-700 border-green-200',
  pending: 'bg-amber-100 text-amber-700 border-amber-200',
  overdue: 'bg-red-100 text-red-700 border-red-200',
  partial: 'bg-blue-100 text-blue-700 border-blue-200',
};

export default function Payments() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredPayments = useMemo(() => {
    return allPayments.filter((payment) => {
      // Search filter
      if (search) {
        const searchLower = search.toLowerCase();
        if (
          !payment.riderName.toLowerCase().includes(searchLower) &&
          !payment.vehicleName.toLowerCase().includes(searchLower)
        ) {
          return false;
        }
      }
      
      // Status filter
      if (statusFilter !== 'all' && payment.status !== statusFilter) return false;
      
      return true;
    });
  }, [search, statusFilter]);

  const totalAmount = filteredPayments.reduce((sum, p) => sum + p.amount, 0);
  const totalPaid = filteredPayments.reduce((sum, p) => sum + p.paidAmount, 0);
  const outstanding = totalAmount - totalPaid;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Payments</h1>
          <p className="text-muted-foreground">Track payment collections</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="w-4 h-4" />
          Export
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
            placeholder="Search by rider or vehicle..."
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
            <SelectItem value="paid">Paid</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="partial">Partial</SelectItem>
            <SelectItem value="overdue">Overdue</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-lg border border-border bg-card">
          <p className="text-2xl font-bold text-foreground">{filteredPayments.length}</p>
          <p className="text-sm text-muted-foreground">Total Payments</p>
        </div>
        <div className="p-4 rounded-lg border border-primary/20 bg-primary/5">
          <p className="text-2xl font-bold text-primary">₹{totalAmount.toLocaleString()}</p>
          <p className="text-sm text-primary/70">Total Amount</p>
        </div>
        <div className="p-4 rounded-lg border border-green-200 bg-green-50">
          <p className="text-2xl font-bold text-green-700">₹{totalPaid.toLocaleString()}</p>
          <p className="text-sm text-green-600">Collected</p>
        </div>
        <div className="p-4 rounded-lg border border-amber-200 bg-amber-50">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-amber-600" />
            <p className="text-2xl font-bold text-amber-700">₹{outstanding.toLocaleString()}</p>
          </div>
          <p className="text-sm text-amber-600">Outstanding</p>
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
              <TableHead className="text-xs font-semibold uppercase text-muted-foreground">Rider</TableHead>
              <TableHead className="text-xs font-semibold uppercase text-muted-foreground">Vehicle</TableHead>
              <TableHead className="text-xs font-semibold uppercase text-muted-foreground">Amount</TableHead>
              <TableHead className="text-xs font-semibold uppercase text-muted-foreground">Paid</TableHead>
              <TableHead className="text-xs font-semibold uppercase text-muted-foreground">Due Date</TableHead>
              <TableHead className="text-xs font-semibold uppercase text-muted-foreground">Status</TableHead>
              <TableHead className="text-xs font-semibold uppercase text-muted-foreground w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPayments.map((payment, index) => (
              <motion.tr
                key={payment.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group hover:bg-muted/30 transition-colors border-b border-border last:border-0"
              >
                <TableCell className="font-medium">{payment.riderName}</TableCell>
                <TableCell className="text-muted-foreground">{payment.vehicleName}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <IndianRupee className="w-3.5 h-3.5 text-muted-foreground" />
                    <span className="font-semibold">{payment.amount.toLocaleString()}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className={cn('font-medium', payment.paidAmount < payment.amount ? 'text-amber-600' : 'text-green-600')}>
                    ₹{payment.paidAmount.toLocaleString()}
                  </span>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {new Date(payment.dueDate).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={cn('capitalize', statusStyles[payment.status])}>
                    {payment.status}
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
                      <DropdownMenuItem>Send Reminder</DropdownMenuItem>
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
