import DashboardLayout from '@/layout/dashboardLayout';
import AuthGuard from '@/utils/AuthGuard';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <DashboardLayout>{children} </DashboardLayout>
    </AuthGuard>
  );
}
