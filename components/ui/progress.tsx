export function Progress({ value }: { value: number }) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div className="h-2 w-full rounded bg-zinc-800">
      <div className="h-2 rounded bg-emerald-500" style={{ width: `${clamped}%` }} />
    </div>
  );
}
