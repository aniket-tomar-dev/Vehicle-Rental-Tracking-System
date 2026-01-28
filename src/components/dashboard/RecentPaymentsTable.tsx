import { motion } from 'framer-motion';
import { payments } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { PaymentStatus } from '@/types';

const statusStyles: Record<PaymentStatus, string> = {
  paid: 'bg-green-100 text-green-700 border-green-200',
  pending: 'bg-amber-100 text-amber-700 border-amber-200',
  overdue: 'bg-red-100 text-red-700 border-red-200',
  partial: 'bg-blue-100 text-blue-700 border-blue-200',
};

export function RecentPaymentsTable() {
  const recentPayments = payments.slice(0, 5);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.3 }}
      className="kpi-card"
    >
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Recent Payments</h3>
          <p className="text-sm text-muted-foreground">Latest payment activity</p>
        </div>
      </div>
      <div className="overflow-hidden rounded-lg border border-border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead className="text-xs font-semibold uppercase text-muted-foreground">Rider</TableHead>
              <TableHead className="text-xs font-semibold uppercase text-muted-foreground">Vehicle</TableHead>
              <TableHead className="text-xs font-semibold uppercase text-muted-foreground">Amount</TableHead>
              <TableHead className="text-xs font-semibold uppercase text-muted-foreground">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentPayments.map((payment, index) => (
              <TableRow
                key={payment.id}
                className="group hover:bg-muted/30 transition-colors"
              >
                <TableCell className="font-medium">{payment.riderName}</TableCell>
                <TableCell className="text-muted-foreground">{payment.vehicleName}</TableCell>
                <TableCell className="font-medium">₹{payment.amount.toLocaleString()}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={cn('capitalize', statusStyles[payment.status])}>
                    {payment.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </motion.div>
  );
}
