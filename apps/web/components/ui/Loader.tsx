export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Spinner className="w-12 h-12 mb-4" />
      <p className="text-gray-700 font-medium">Loading...</p>
    </div>
  );
}

interface SpinnerProps {
  className?: string;
}

export const Spinner = ({ className }: SpinnerProps) => (
  <div
    className={`border-4 border-t-primary border-gray-200 rounded-full w-8 h-8 animate-spin ${className}`}
  ></div>
);
