import { useEffect } from "react";
import { useRouter } from "next/router";
import AdminLogin from "../../components/AdminLogin";
import { useAdminSession } from "../../hooks/useAdminSession";

export default function LoginAdmin() {
  const status = useAdminSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/admin/dashboard");
    }
  }, [status, router]);

  if (status === "authenticated") return null;

  return <AdminLogin />;
}
