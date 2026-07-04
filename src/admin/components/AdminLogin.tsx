import { FormEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useReducedMotion } from "framer-motion";
import styles from "./AdminLogin.module.css";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (prefersReducedMotion || !canvas) return;

    let cancelled = false;

    import("webgl-fluid").then(({ default: WebGLFluid }) => {
      if (cancelled) return;
      WebGLFluid(canvas, {
        TRIGGER: "hover",
        IMMEDIATE: false,
        AUTO: false,
        COLORFUL: false,
        SPLAT_COLOR: { r: 0.11, g: 0.31, b: 0.85 },
        TRANSPARENT: true,
        BLOOM: false,
        SUNRAYS: false,
        SHADING: true,
        DENSITY_DISSIPATION: 2.2,
        VELOCITY_DISSIPATION: 1.5,
      });
    });

    // webgl-fluid has no destroy() API; forcing context loss stops its
    // internal render loop from doing GPU work after this page unmounts.
    return () => {
      cancelled = true;
      const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
      gl?.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [prefersReducedMotion]);

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email === "admin@db.com" && password === "2026") {
      localStorage.setItem("adminAuth", "true");
      router.push("/admin/dashboard");
    } else {
      alert("Credenciais inválidas. Por favor, tente novamente.");
    }
  };

  return (
    <div className={styles["login-root"]}>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className={styles["fluid-canvas"]}
      />

      <div className={styles["login-box"]}>
        <h2>EJEM<br />
          Painel de Administração</h2>

        <form onSubmit={handleLogin} autoComplete="off">
          {/* Decoy fields: Chrome ignores display:none inputs, so these sit
              off-screen but "visible" to bait its autofill engine away from
              the real email/password fields below. */}
          <input
            type="text"
            name="fakeusernameremembered"
            autoComplete="username"
            tabIndex={-1}
            aria-hidden="true"
            style={{ position: "absolute", left: -9999, width: 1, height: 1, opacity: 0 }}
          />
          <input
            type="password"
            name="fakepasswordremembered"
            autoComplete="new-password"
            tabIndex={-1}
            aria-hidden="true"
            style={{ position: "absolute", left: -9999, width: 1, height: 1, opacity: 0 }}
          />

          <div className={styles["user-box"]}>
            <input
              type="email"
              required
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Email</label>
          </div>

          <div className={styles["user-box"]}>
            <input
              type="password"
              required
              autoComplete="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>Password</label>
          </div>

          <div className={styles["btn-wrapper"]}>
            <button type="submit" className={styles["login-btn"]}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              ENTRAR
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;