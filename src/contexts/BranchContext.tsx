import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Branch } from '@/types';
import { branches } from '@/data/mockData';

interface BranchContextType {
  currentBranch: Branch | null;
  setCurrentBranch: (branch: Branch | null) => void;
  allBranches: Branch[];
}

const BranchContext = createContext<BranchContextType | undefined>(undefined);

export function BranchProvider({ children }: { children: ReactNode }) {
  const [currentBranch, setCurrentBranch] = useState<Branch | null>(null);

  return (
    <BranchContext.Provider value={{ currentBranch, setCurrentBranch, allBranches: branches }}>
      {children}
    </BranchContext.Provider>
  );
}

export function useBranch() {
  const context = useContext(BranchContext);
  if (context === undefined) {
    throw new Error('useBranch must be used within a BranchProvider');
  }
  return context;
}
