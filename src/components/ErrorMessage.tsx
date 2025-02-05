const ErrorMessage = ({ message }: { message: string }) => {
    return (
      <div className="relative min-h-screen w-full">
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <div className="relative h-full w-full bg-black [&>div]:absolute [&>div]:inset-0 [&>div]:bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] [&>div]:bg-[size:14px_24px]">
            <div></div>
          </div>
        </div>
        {/* Error Message Content */}
        <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
          <div className="max-w-md w-full bg-red-500/10 backdrop-blur-lg rounded-lg p-4 sm:p-6">
            <p className="text-base sm:text-lg md:text-xl font-semibold text-red-500 text-center">
              {message}
            </p>
          </div>
        </div>
      </div>
    );
  };
  
  export default ErrorMessage;
  