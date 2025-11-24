// src/lib/api/userService.ts
import { User, CreateUserRequest, UpdateUserRequest, UsersResponse } from '@/types/user';

const API_BASE = '/api/users';

// Helper function to handle API responses
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }
  return response.json();
}

// Interface for the raw API user data
interface ApiUser {
  userId: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  status: string;
  isActive: boolean;
  role: {
    roleId: number;
    roleName: string;
    roleDescription: string;
    isActive: boolean;
    createdAt: string;
    createdBy: number;
  };
  createdAt: string;
  isLoggedIn: boolean;
  isFirstLogin: boolean;
  lastLogin: string;
  isDeleted: boolean;
  isApproved: boolean;
  approvalTimestamp: string;
  isRejected: boolean;
  rejectionTimestamp: string;
  rejectionReason: string;
  remainingDaysTillPasswordReset: number;
  hasAcceptedTerms: boolean;
  securityQuestionsSet: boolean;
  securityQuestionsMandatory: boolean;
  isPhoneVerified: boolean;
}

// Transform API user data to match frontend User type
function transformUserData(apiUser: ApiUser): User {
  // Determine status based on approval/rejection flags
  let status: User['status'] = 'pending';
  if (apiUser.isApproved) {
    status = 'active';
  } else if (apiUser.isRejected) {
    status = 'rejected';
  } else if (!apiUser.isActive) {
    status = 'inactive';
  }

  return {
    id: apiUser.userId.toString(),
    username: apiUser.username,
    firstName: apiUser.firstName,
    lastName: apiUser.lastName,
    email: apiUser.email,
    phone: apiUser.phoneNumber,
    status: status,
    role: apiUser.role?.roleName?.toLowerCase() || 'user',
    lastLogin: apiUser.lastLogin,
    createdAt: apiUser.createdAt,
    isActive: apiUser.isActive,
    isDeleted: apiUser.isDeleted,
    isPhoneVerified: apiUser.isPhoneVerified,
  };
}

export const userService = {
  async handleRequest(url: string, options: RequestInit = {}) {
    const token = sessionStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
      ...options.headers,
    };

    const response = await fetch(url, {
      ...options,
      headers,
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      
      switch (response.status) {
        case 403:
          throw new Error(errorData.message || 'You do not have permission to perform this action');
        case 401:
          throw new Error('Please log in to continue');
        case 404:
          throw new Error('Resource not found');
        default:
          throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
    }

    return response.json();
  },



  // Get all users
  async getUsers(page: number = 1, limit: number = 10, search?: string): Promise<UsersResponse> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(search && { search })
    });

    const data = await this.handleRequest(`/api/users?${params}`);
    
    // Transform the API response to match your frontend expectations
    return {
      users: data.map(transformUserData),
      page,
      totalPages: Math.ceil(data.length / limit),
      totalUsers: data.length
    };
  },

  // Get user by ID
  async getUserById(id: string): Promise<User> {
    const data = await this.handleRequest(`/api/users/${id}`);
    return transformUserData(data);
  },

  // Get current user profile
  async getCurrentUser(): Promise<User> {
    const data = await this.handleRequest("/api/users/profile");
    return transformUserData(data);
  },

  // Get pending users
  async getPendingUsers(): Promise<User[]> {
    const data = await this.handleRequest("/api/users/pending");
    return data.map(transformUserData);
  },

  // Create new user
  async createUser(userData: CreateUserRequest): Promise<User> {
    const data = await this.handleRequest("/api/users", {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    return transformUserData(data);
  },

  // Update user
  async updateUser(id: string, userData: UpdateUserRequest): Promise<User> {
    const data = await this.handleRequest(`/api/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
    return transformUserData(data);
  },

  // Delete user
  async deleteUser(id: string): Promise<void> {
    await this.handleRequest(`/api/users/${id}`, {
      method: 'DELETE',
    });
  },

  // Approve user
  async approveUser(id: string): Promise<User> {
    const data = await this.handleRequest(`/api/users/${id}/approve`, {
      method: 'PUT',
    });
    return transformUserData(data);
  },

  // Reject user
  async rejectUser(id: string): Promise<User> {
    const data = await this.handleRequest(`/api/users/${id}/reject`, {
      method: 'PUT',
    });
    return transformUserData(data);
  },

  // Send phone verification
  async sendPhoneVerification(id: string): Promise<void> {
    await this.handleRequest(`/api/users/${id}/send-phone-verification`, {
      method: 'POST',
    });
  },

  // Verify phone with OTP
  async verifyPhone(id: string, otpCode: string): Promise<void> {
    await this.handleRequest(`/api/users/${id}/verify-phone`, {
      method: 'POST',
      body: JSON.stringify({ otpCode }),
    });
  },
};