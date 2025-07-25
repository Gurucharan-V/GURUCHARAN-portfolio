import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null,
      errorInfo: null,
      errorCount: 0
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error caught by boundary:', error, errorInfo);
    }

    // Update state with error details
    this.setState(prevState => ({
      error,
      errorInfo,
      errorCount: prevState.errorCount + 1
    }));

    // You can also log the error to an error reporting service here
    // logErrorToService(error, errorInfo);
  }

  handleReset = () => {
    this.setState({ 
      hasError: false, 
      error: null, 
      errorInfo: null 
    });
  };

  render() {
    if (this.state.hasError) {
      // Check if error is happening too frequently
      if (this.state.errorCount > 3) {
        return (
          <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
            <div className="max-w-2xl w-full text-center space-y-6">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-red-500">
                Critical Error
              </h1>
              <p className="text-lg sm:text-xl text-gray-300">
                The application is experiencing repeated errors. Please refresh the page.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-white text-black font-medium rounded-lg 
                         hover:bg-gray-200 transition-colors duration-200
                         focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
              >
                Refresh Page
              </button>
            </div>
          </div>
        );
      }

      // Responsive error UI
      return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
          <div className="max-w-2xl w-full space-y-6">
            {/* Error Icon */}
            <div className="flex justify-center">
              <svg 
                className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 text-red-500" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
                />
              </svg>
            </div>

            {/* Error Message */}
            <div className="text-center space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                Oops! Something went wrong
              </h1>
              <p className="text-base sm:text-lg text-gray-400">
                We're sorry for the inconvenience. The application encountered an unexpected error.
              </p>
            </div>

            {/* Error Details (Development Only) */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-6 p-4 bg-gray-900 rounded-lg">
                <summary className="cursor-pointer text-sm font-medium text-gray-300 hover:text-white">
                  Error Details (Development Only)
                </summary>
                <div className="mt-4 space-y-2">
                  <p className="text-xs text-red-400 font-mono break-all">
                    {this.state.error.toString()}
                  </p>
                  {this.state.errorInfo && (
                    <pre className="text-xs text-gray-500 overflow-auto max-h-40">
                      {this.state.errorInfo.componentStack}
                    </pre>
                  )}
                </div>
              </details>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <button
                onClick={this.handleReset}
                className="px-6 py-3 bg-white text-black font-medium rounded-lg 
                         hover:bg-gray-200 transition-colors duration-200
                         focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black
                         min-h-[44px] touch-manipulation"
              >
                Try Again
              </button>
              <button
                onClick={() => window.location.href = '/'}
                className="px-6 py-3 bg-transparent text-white font-medium rounded-lg 
                         border border-white hover:bg-white hover:text-black 
                         transition-colors duration-200
                         focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black
                         min-h-[44px] touch-manipulation"
              >
                Go Home
              </button>
            </div>

            {/* Support Message */}
            <p className="text-center text-sm text-gray-500 mt-8">
              If this problem persists, please contact support or try again later.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Functional wrapper for easier use with hooks
export const withErrorBoundary = (Component, fallback) => {
  return (props) => (
    <ErrorBoundary fallback={fallback}>
      <Component {...props} />
    </ErrorBoundary>
  );
};

export default ErrorBoundary;