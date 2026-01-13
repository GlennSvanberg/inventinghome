// Simplified static overlay - no animations to prevent mobile flicker
export function RedCloudOverlay() {
  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {/* Industrial ambient glow */}
      <div
        className="absolute w-[520px] h-[520px] bg-primary/10 rounded-full blur-[140px]"
        style={{ top: '5%', left: '-15%' }}
      />
      <div
        className="absolute w-[520px] h-[520px] bg-primary/10 rounded-full blur-[140px]"
        style={{ bottom: '5%', right: '-15%' }}
      />
      <div
        className="absolute w-[420px] h-[420px] bg-emerald-400/5 rounded-full blur-[160px]"
        style={{ top: '35%', right: '10%' }}
      />
    </div>
  )
}
