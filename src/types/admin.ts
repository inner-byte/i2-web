export interface Organization {
  id: string;
  name: string;
  adminCount: number;
  memberCount: number;
  status: "active" | "pending" | "suspended";
  createdAt: string;
  settings?: OrganizationSettings;
}

export interface OrganizationSettings {
  allowMemberInvites: boolean;
  requireAdminApproval: boolean;
  maxMembers: number;
  features: {
    events: boolean;
    forums: boolean;
    resources: boolean;
  };
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  organization: string;
  role: "organization_admin" | "moderator";
  permissions: string[];
  status: "active" | "inactive";
  lastActive: string;
}

export interface SystemSettings {
  maintenance: boolean;
  registrationOpen: boolean;
  defaultUserRole: string;
  securitySettings: {
    mfaRequired: boolean;
    passwordPolicy: {
      minLength: number;
      requireSpecialChars: boolean;
      requireNumbers: boolean;
    };
  };
}

export interface AuditLog {
  id: string;
  action: string;
  performedBy: string;
  targetType: "organization" | "user" | "system";
  targetId: string;
  timestamp: string;
  details: Record<string, any>;
}
