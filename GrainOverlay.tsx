export function GrainOverlay() {
  const svgUri = `data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' result='noise'/%3E%3C/filter%3E%3Crect width='400' height='400' fill='%23000000' filter='url(%23noise)' opacity='0.3'/%3E%3C/svg%3E`;

  return (
    <div
      className="fixed inset-0 -z-10 pointer-events-none mix-blend-overlay opacity-30"
      style={{
        backgroundImage: `url("${svgUri}")`,
        backgroundSize: "400px 400px",
      }}
    />
  );
}
