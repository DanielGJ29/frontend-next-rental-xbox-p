// PROJECT IMPORTS
import GuestGuard from '@/utils/GuestGuard';

// types
import { GuardProps } from '@/types/auth';

// ==============================|| DASHBOARD LAYOUT ||============================== //

export default function Layout({ children }: GuardProps) {
  return <GuestGuard>{children}</GuestGuard>;
}
