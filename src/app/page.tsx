// next
import { SessionProvider } from 'next-auth/react';

import Image from 'next/image';
//import styles from "./page.module.css";

import Dashboard from '@/components/dashboard/Dashboard';
import DashboardLayout from '@/layout/dashboardLayout';

export default function Home() {
  return (
    // <main>
    <DashboardLayout>
      <Dashboard />
    </DashboardLayout>
    // </main>
  );
}
