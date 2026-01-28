// Branch types
export interface Branch {
  id: string;
  name: string;
  location: string;
  totalVehicles: number;
  activeAgreements: number;
}

// Vehicle types
export type VehicleStatus = 'available' | 'rented' | 'broken';
export type VehicleType = 'bike' | 'scooter';

export interface Vehicle {
  id: string;
  name: string;
  type: VehicleType;
  branchId: string;
  branchName: string;
  status: VehicleStatus;
  totalEarnings: number;
  registrationNumber: string;
}

// Rider types
export interface Rider {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  idProof: string;
  createdAt: string;
}

// Agreement types
export type AgreementStatus = 'active' | 'completed' | 'cancelled';

export interface Agreement {
  id: string;
  riderId: string;
  riderName: string;
  vehicleId: string;
  vehicleName: string;
  branchId: string;
  branchName: string;
  rentalPrice: number;
  serviceCharges: number;
  startDate: string;
  endDate: string;
  status: AgreementStatus;
  totalAmount: number;
  paidAmount: number;
}

// Payment types
export type PaymentStatus = 'paid' | 'pending' | 'overdue' | 'partial';

export interface Payment {
  id: string;
  agreementId: string;
  riderName: string;
  vehicleName: string;
  amount: number;
  paidAmount: number;
  dueDate: string;
  status: PaymentStatus;
  paymentDate?: string;
}

// Dashboard KPIs
export interface DashboardKPIs {
  totalEarnings: number;
  activeAgreements: number;
  outstandingDues: number;
  vehicleUtilization: number;
  totalVehicles: number;
  availableVehicles: number;
}

// Report filters
export interface ReportFilters {
  branchId: string | null;
  vehicleId: string | null;
  dateRange: { from: Date | null; to: Date | null };
  timeGrouping: 'daily' | 'weekly' | 'monthly';
  agreementStatus: AgreementStatus | null;
  paymentStatus: PaymentStatus | null;
}
