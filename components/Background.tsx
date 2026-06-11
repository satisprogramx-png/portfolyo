export function Background() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="aurora aurora-1 bg-accent/25" />
      <div className="aurora aurora-2 bg-accent/15" />
      <div className="bg-grid absolute inset-0" />
    </div>
  );
}
