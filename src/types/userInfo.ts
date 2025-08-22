// Client Info type
interface ClientInfo {
  device: string;
  browser: string;
  ipAddress: string;
  pcName: string;
  os: string;
  userAgent: string;
}

// Main User type
export interface UserInfo {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin" | "superadmin"; // Extend as needed
  hasShop: boolean;
  isActive: boolean;
  otpToken: string | null;
  lastLogin: string; // ISO date string
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  clientInfo: ClientInfo;
}

// Example usage
