import { Component, type ErrorInfo, type ReactNode } from "react";
import Button from "./Button";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Page crashed:", error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-brand px-4 text-center">
          <h2 className="text-2xl font-bold">Something went wrong</h2>
          <p className="text-gray-700">
            This page failed to load. Please try again.
          </p>
          <Button title="Reload page" onClick={() => window.location.reload()} />
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;