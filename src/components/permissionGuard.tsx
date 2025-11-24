// src/components/PermissionGuard.tsx
"use client";

import { useEffect, useState } from 'react';
import { userService } from '@/lib/api/userService';

interface PermissionGuardProps {
  children: React.ReactNode;
  requiredPermission?: string;
  fallback?: React.ReactNode;
}

export default function PermissionGuard({ 
  children, 
  requiredPermission,
  fallback = <div>Access Denied</div> 
}: PermissionGuardProps) {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    const checkPermissions = async () => {
      try {
        // Get current user to check permissions
        const user = await userService.getCurrentUser();
        
        // Simple role-based permission check
        // You might want to implement more complex permission logic
        if (requiredPermission) {
          const hasAccess = user.role === 'admin' || 
                           (user.role === 'manager' && requiredPermission !== 'admin_only');
          setHasPermission(hasAccess);
        } else {
          setHasPermission(true);
        }
      } catch (error) {
        console.error('Permission check failed:', error);
        setHasPermission(false);
      }
    };

    checkPermissions();
  }, [requiredPermission]);

  if (hasPermission === null) {
    return <div>Checking permissions...</div>;
  }

  return hasPermission ? <>{children}</> : <>{fallback}</>;
}