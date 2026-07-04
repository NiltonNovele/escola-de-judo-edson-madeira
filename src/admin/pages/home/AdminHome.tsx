import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAdminSession } from "../../hooks/useAdminSession";

export default function AdminHome() {
  const status = useAdminSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/admin/dashboard");
    } else if (status === "unauthenticated") {
      router.replace("/admin/login");
    }
  }, [status, router]);

  return null;
}
