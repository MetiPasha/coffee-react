const LoadingSpinner = () => (
  <div className="flex justify-center py-10" role="status" aria-label="Loading">
    <div className="h-10 w-10 animate-spin rounded-full border-4 border-amber-900 border-t-transparent" />
  </div>
);

export default LoadingSpinner;