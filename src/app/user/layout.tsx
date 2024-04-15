import DashboardLayout from '@/layout/dashboardLayout';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout>{children} </DashboardLayout>;
}
