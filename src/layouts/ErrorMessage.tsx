import Button from "./Button";

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

const ErrorMessage = ({ message, onRetry }: ErrorMessageProps) => (
  <div className="flex flex-col items-center gap-3 py-10" role="alert">
    <p className="text-red-700 font-semibold">{message}</p>
    {onRetry && <Button title="Try again" onClick={onRetry} />}
  </div>
);

export default ErrorMessage;