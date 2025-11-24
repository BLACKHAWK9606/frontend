// src/types/user.ts

export interface User {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  status: 'active' | 'pending' | 'rejected' | 'inactive';
  role: string;
  lastLogin?: string;
  createdAt: string;
  isActive: boolean; // Add this
  isDeleted: boolean; // Add this
  isPhoneVerified: boolean; // Add this
}

export interface UsersResponse {
  users: User[];
  page: number;
  totalPages: number;
  totalUsers: number; // Add this
  totalCount?: number; // Optional: if your API uses different naming
}

export interface CreateUserRequest {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  role?: string;
   title?: string; 
}

export interface UpdateUserRequest {
  username?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  role?: string;
  status?: string;
}