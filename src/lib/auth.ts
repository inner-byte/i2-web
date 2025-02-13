import { create } from "zustand";

export type UserRole = "super_admin" | "admin" | "member";

interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
}

// Mock user data for different roles
const mockUsers = [
  {
    email: "admin@example.com",
    password: "admin123",
    name: "Admin User",
    role: "admin" as UserRole,
  },
  {
    email: "superadmin@example.com",
    password: "super123",
    name: "Super Admin",
    role: "super_admin" as UserRole,
  },
  {
    email: "member@example.com",
    password: "member123",
    name: "Regular Member",
    role: "member" as UserRole,
  },
];

export const useAuth = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  login: async (email: string, password: string) => {
    set({ isLoading: true });
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Find matching user
      const matchedUser = mockUsers.find(
        (u) => u.email === email && u.password === password,
      );

      if (!matchedUser) {
        throw new Error("Invalid credentials");
      }

      const user: User = {
        id: "1",
        email: matchedUser.email,
        name: matchedUser.name,
        role: matchedUser.role,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${matchedUser.email}`,
      };

      set({ user, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
  signup: async (email: string, password: string, name: string) => {
    set({ isLoading: true });
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const user: User = {
        id: "1",
        email,
        name,
        role: "member",
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      };

      set({ user, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
  logout: () => {
    set({ user: null });
  },
}));

export const useUser = () => useAuth((state) => state.user);
export const useIsAuthenticated = () => useAuth((state) => !!state.user);

export const checkAccess = (
  userRole: UserRole,
  requiredRole: UserRole,
): boolean => {
  const roleHierarchy: Record<UserRole, number> = {
    super_admin: 3,
    admin: 2,
    member: 1,
  };

  return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
};
