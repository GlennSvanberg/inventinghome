// Simplified static overlay - no animations to prevent mobile flicker
export function RedCloudOverlay() {
  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {/* Simple static gradient overlay */}
      <div 
        className="absolute w-[500px] h-[500px] bg-red-500/5 rounded-full blur-[120px]"
        style={{ top: '5%', left: '-15%' }}
      />
      <div 
        className="absolute w-[500px] h-[500px] bg-red-500/5 rounded-full blur-[120px]"
        style={{ bottom: '5%', right: '-15%' }}
      />
    </div>
  )
}
