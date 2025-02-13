import { create } from "zustand";
import type {
  Organization,
  AdminUser,
  SystemSettings,
  AuditLog,
} from "@/types/admin";

interface AdminState {
  organizations: Organization[];
  admins: AdminUser[];
  systemSettings: SystemSettings;
  auditLogs: AuditLog[];
  isLoading: boolean;
  error: string | null;
  // Organization actions
  addOrganization: (org: Organization) => void;
  updateOrganization: (id: string, updates: Partial<Organization>) => void;
  deleteOrganization: (id: string) => void;
  // Admin actions
  addAdmin: (admin: AdminUser) => void;
  updateAdmin: (id: string, updates: Partial<AdminUser>) => void;
  deleteAdmin: (id: string) => void;
  // System actions
  updateSystemSettings: (settings: Partial<SystemSettings>) => void;
  addAuditLog: (log: AuditLog) => void;
}

const defaultSystemSettings: SystemSettings = {
  maintenance: false,
  registrationOpen: true,
  defaultUserRole: "member",
  securitySettings: {
    mfaRequired: false,
    passwordPolicy: {
      minLength: 8,
      requireSpecialChars: true,
      requireNumbers: true,
    },
  },
};

export const useAdminStore = create<AdminState>((set) => ({
  organizations: [],
  admins: [],
  systemSettings: defaultSystemSettings,
  auditLogs: [],
  isLoading: false,
  error: null,

  // Organization actions
  addOrganization: (org) =>
    set((state) => ({ organizations: [...state.organizations, org] })),

  updateOrganization: (id, updates) =>
    set((state) => ({
      organizations: state.organizations.map((org) =>
        org.id === id ? { ...org, ...updates } : org,
      ),
    })),

  deleteOrganization: (id) =>
    set((state) => ({
      organizations: state.organizations.filter((org) => org.id !== id),
    })),

  // Admin actions
  addAdmin: (admin) => set((state) => ({ admins: [...state.admins, admin] })),

  updateAdmin: (id, updates) =>
    set((state) => ({
      admins: state.admins.map((admin) =>
        admin.id === id ? { ...admin, ...updates } : admin,
      ),
    })),

  deleteAdmin: (id) =>
    set((state) => ({
      admins: state.admins.filter((admin) => admin.id !== id),
    })),

  // System actions
  updateSystemSettings: (settings) =>
    set((state) => ({
      systemSettings: { ...state.systemSettings, ...settings },
    })),

  addAuditLog: (log) =>
    set((state) => ({ auditLogs: [log, ...state.auditLogs] })),
}));
