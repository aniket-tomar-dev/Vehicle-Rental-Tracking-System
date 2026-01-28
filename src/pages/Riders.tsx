import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, MoreHorizontal, Phone, Mail } from 'lucide-react';
import { riders as allRiders } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function Riders() {
  const [search, setSearch] = useState('');

  const filteredRiders = useMemo(() => {
    if (!search) return allRiders;
    const searchLower = search.toLowerCase();
    return allRiders.filter(
      (rider) =>
        rider.name.toLowerCase().includes(searchLower) ||
        rider.phone.includes(search) ||
        rider.email.toLowerCase().includes(searchLower)
    );
  }, [search]);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Riders</h1>
          <p className="text-muted-foreground">Manage customer records</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Add Rider
        </Button>
      </div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-sm"
      >
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, phone, email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-lg border border-border bg-card">
          <p className="text-2xl font-bold text-foreground">{allRiders.length}</p>
          <p className="text-sm text-muted-foreground">Total Riders</p>
        </div>
        <div className="p-4 rounded-lg border border-primary/20 bg-primary/5">
          <p className="text-2xl font-bold text-primary">4</p>
          <p className="text-sm text-primary/70">Active Rentals</p>
        </div>
        <div className="p-4 rounded-lg border border-border bg-card">
          <p className="text-2xl font-bold text-foreground">2</p>
          <p className="text-sm text-muted-foreground">New This Month</p>
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
              <TableHead className="text-xs font-semibold uppercase text-muted-foreground">Contact</TableHead>
              <TableHead className="text-xs font-semibold uppercase text-muted-foreground">Address</TableHead>
              <TableHead className="text-xs font-semibold uppercase text-muted-foreground">ID Proof</TableHead>
              <TableHead className="text-xs font-semibold uppercase text-muted-foreground">Joined</TableHead>
              <TableHead className="text-xs font-semibold uppercase text-muted-foreground w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRiders.map((rider, index) => (
              <motion.tr
                key={rider.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group hover:bg-muted/30 transition-colors border-b border-border last:border-0"
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-primary/10 text-primary font-medium">
                        {rider.name.split(' ').map((n) => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{rider.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Phone className="w-3.5 h-3.5" />
                      {rider.phone}
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Mail className="w-3.5 h-3.5" />
                      {rider.email}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">{rider.address}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{rider.idProof}</Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {new Date(rider.createdAt).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-popover">
                      <DropdownMenuItem>View Profile</DropdownMenuItem>
                      <DropdownMenuItem>Edit Details</DropdownMenuItem>
                      <DropdownMenuItem>View Agreements</DropdownMenuItem>
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
