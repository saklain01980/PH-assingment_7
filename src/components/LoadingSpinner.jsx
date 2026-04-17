export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="w-12 h-12 border-4 border-secondary/30 border-t-secondary rounded-full animate-spin"></div>
      <p className="text-text-muted mt-4 text-sm">Loading friends...</p>
    </div>
  )
}
