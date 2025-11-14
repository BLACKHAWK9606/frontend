"use client"

import * as React from "react"
import { toast as sonnerToast } from "sonner"

export const toast = {
  success: (message: string) => sonnerToast.success(message),
  error: (message: string) => sonnerToast.error(message),
  info: (message: string) => sonnerToast.info(message),
}