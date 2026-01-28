import { Branch, Vehicle, Rider, Agreement, Payment, DashboardKPIs } from '@/types';

export const branches: Branch[] = [
  { id: 'br-1', name: 'Jaipur Central', location: 'Jaipur, Rajasthan', totalVehicles: 45, activeAgreements: 32 },
  { id: 'br-2', name: 'Mumbai West', location: 'Mumbai, Maharashtra', totalVehicles: 68, activeAgreements: 51 },
  { id: 'br-3', name: 'Kolkata South', location: 'Kolkata, West Bengal', totalVehicles: 35, activeAgreements: 24 },
];

export const vehicles: Vehicle[] = [
  { id: 'v-1', name: 'Ather 450X', type: 'scooter', branchId: 'br-1', branchName: 'Jaipur Central', status: 'rented', totalEarnings: 45600, registrationNumber: 'RJ14EV0001' },
  { id: 'v-2', name: 'Ola S1 Pro', type: 'scooter', branchId: 'br-1', branchName: 'Jaipur Central', status: 'available', totalEarnings: 38200, registrationNumber: 'RJ14EV0002' },
  { id: 'v-3', name: 'Revolt RV400', type: 'bike', branchId: 'br-1', branchName: 'Jaipur Central', status: 'rented', totalEarnings: 52100, registrationNumber: 'RJ14EV0003' },
  { id: 'v-4', name: 'Bajaj Chetak', type: 'scooter', branchId: 'br-1', branchName: 'Jaipur Central', status: 'broken', totalEarnings: 28900, registrationNumber: 'RJ14EV0004' },
  { id: 'v-5', name: 'TVS iQube', type: 'scooter', branchId: 'br-2', branchName: 'Mumbai West', status: 'rented', totalEarnings: 61200, registrationNumber: 'MH02EV0001' },
  { id: 'v-6', name: 'Ather 450X', type: 'scooter', branchId: 'br-2', branchName: 'Mumbai West', status: 'available', totalEarnings: 55800, registrationNumber: 'MH02EV0002' },
  { id: 'v-7', name: 'Ultraviolette F77', type: 'bike', branchId: 'br-2', branchName: 'Mumbai West', status: 'rented', totalEarnings: 72400, registrationNumber: 'MH02EV0003' },
  { id: 'v-8', name: 'Ola S1 Pro', type: 'scooter', branchId: 'br-3', branchName: 'Kolkata South', status: 'available', totalEarnings: 41300, registrationNumber: 'WB06EV0001' },
  { id: 'v-9', name: 'Revolt RV400', type: 'bike', branchId: 'br-3', branchName: 'Kolkata South', status: 'rented', totalEarnings: 48700, registrationNumber: 'WB06EV0002' },
  { id: 'v-10', name: 'Simple One', type: 'scooter', branchId: 'br-3', branchName: 'Kolkata South', status: 'broken', totalEarnings: 19800, registrationNumber: 'WB06EV0003' },
];

export const riders: Rider[] = [
  { id: 'r-1', name: 'Amit Sharma', phone: '+91 98765 43210', email: 'amit.sharma@email.com', address: 'Jaipur, Rajasthan', idProof: 'AADHAAR', createdAt: '2024-01-15' },
  { id: 'r-2', name: 'Priya Patel', phone: '+91 87654 32109', email: 'priya.patel@email.com', address: 'Mumbai, Maharashtra', idProof: 'PAN Card', createdAt: '2024-02-20' },
  { id: 'r-3', name: 'Rahul Singh', phone: '+91 76543 21098', email: 'rahul.singh@email.com', address: 'Kolkata, West Bengal', idProof: 'Driving License', createdAt: '2024-03-10' },
  { id: 'r-4', name: 'Sneha Gupta', phone: '+91 65432 10987', email: 'sneha.gupta@email.com', address: 'Jaipur, Rajasthan', idProof: 'AADHAAR', createdAt: '2024-01-25' },
  { id: 'r-5', name: 'Vikram Reddy', phone: '+91 54321 09876', email: 'vikram.reddy@email.com', address: 'Mumbai, Maharashtra', idProof: 'Voter ID', createdAt: '2024-04-05' },
];

export const agreements: Agreement[] = [
  { id: 'ag-1', riderId: 'r-1', riderName: 'Amit Sharma', vehicleId: 'v-1', vehicleName: 'Ather 450X', branchId: 'br-1', branchName: 'Jaipur Central', rentalPrice: 3500, serviceCharges: 500, startDate: '2025-01-01', endDate: '2025-01-31', status: 'active', totalAmount: 4000, paidAmount: 4000 },
  { id: 'ag-2', riderId: 'r-2', riderName: 'Priya Patel', vehicleId: 'v-5', vehicleName: 'TVS iQube', branchId: 'br-2', branchName: 'Mumbai West', rentalPrice: 4200, serviceCharges: 600, startDate: '2025-01-05', endDate: '2025-02-04', status: 'active', totalAmount: 4800, paidAmount: 2400 },
  { id: 'ag-3', riderId: 'r-3', riderName: 'Rahul Singh', vehicleId: 'v-9', vehicleName: 'Revolt RV400', branchId: 'br-3', branchName: 'Kolkata South', rentalPrice: 5000, serviceCharges: 800, startDate: '2025-01-10', endDate: '2025-02-09', status: 'active', totalAmount: 5800, paidAmount: 5800 },
  { id: 'ag-4', riderId: 'r-4', riderName: 'Sneha Gupta', vehicleId: 'v-3', vehicleName: 'Revolt RV400', branchId: 'br-1', branchName: 'Jaipur Central', rentalPrice: 5000, serviceCharges: 700, startDate: '2024-12-15', endDate: '2025-01-14', status: 'completed', totalAmount: 5700, paidAmount: 5700 },
  { id: 'ag-5', riderId: 'r-5', riderName: 'Vikram Reddy', vehicleId: 'v-7', vehicleName: 'Ultraviolette F77', branchId: 'br-2', branchName: 'Mumbai West', rentalPrice: 6500, serviceCharges: 1000, startDate: '2025-01-15', endDate: '2025-02-14', status: 'active', totalAmount: 7500, paidAmount: 3750 },
];

export const payments: Payment[] = [
  { id: 'p-1', agreementId: 'ag-1', riderName: 'Amit Sharma', vehicleName: 'Ather 450X', amount: 4000, paidAmount: 4000, dueDate: '2025-01-31', status: 'paid', paymentDate: '2025-01-28' },
  { id: 'p-2', agreementId: 'ag-2', riderName: 'Priya Patel', vehicleName: 'TVS iQube', amount: 4800, paidAmount: 2400, dueDate: '2025-02-04', status: 'partial', paymentDate: '2025-01-20' },
  { id: 'p-3', agreementId: 'ag-3', riderName: 'Rahul Singh', vehicleName: 'Revolt RV400', amount: 5800, paidAmount: 5800, dueDate: '2025-02-09', status: 'paid', paymentDate: '2025-01-25' },
  { id: 'p-4', agreementId: 'ag-5', riderName: 'Vikram Reddy', vehicleName: 'Ultraviolette F77', amount: 7500, paidAmount: 3750, dueDate: '2025-02-14', status: 'partial' },
  { id: 'p-5', agreementId: 'ag-4', riderName: 'Sneha Gupta', vehicleName: 'Revolt RV400', amount: 5700, paidAmount: 5700, dueDate: '2025-01-14', status: 'paid', paymentDate: '2025-01-12' },
];

export const dashboardKPIs: DashboardKPIs = {
  totalEarnings: 464000,
  activeAgreements: 107,
  outstandingDues: 86500,
  vehicleUtilization: 72.4,
  totalVehicles: 148,
  availableVehicles: 41,
};

export const earningsData = [
  { month: 'Aug', earnings: 320000, rentals: 85 },
  { month: 'Sep', earnings: 380000, rentals: 92 },
  { month: 'Oct', earnings: 410000, rentals: 98 },
  { month: 'Nov', earnings: 435000, rentals: 104 },
  { month: 'Dec', earnings: 448000, rentals: 102 },
  { month: 'Jan', earnings: 464000, rentals: 107 },
];

export const branchPerformance = [
  { name: 'Jaipur Central', earnings: 156000, vehicles: 45, utilization: 71 },
  { name: 'Mumbai West', earnings: 198000, vehicles: 68, utilization: 75 },
  { name: 'Kolkata South', earnings: 110000, vehicles: 35, utilization: 69 },
];
