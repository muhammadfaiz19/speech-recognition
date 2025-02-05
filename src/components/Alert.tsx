import {  useEffect } from 'react';
import { CheckCircle, X } from 'lucide-react';

type AlertType = 'success' | 'error';

interface AlertProps {
  message: string;
  type: AlertType;
  isVisible: boolean;
  onClose: () => void;
}

  const Alert = ({ message, type, isVisible, onClose }: AlertProps) => {
    useEffect(() => {
      if (isVisible) {
        const timer = setTimeout(() => {
          onClose();
        }, 3000);
  
        return () => clearTimeout(timer);
      }
    }, [isVisible, onClose]);
  
    if (!isVisible) return null;
  
    return (
      <div className="fixed top-4 right-4 left-4 sm:left-auto z-50 animate-fade-in">
        <div
          className={`px-3 sm:px-4 py-2 sm:py-3 rounded-lg shadow-lg backdrop-blur-md flex items-center gap-2 sm:gap-3 ${
            type === 'success' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'
          }`}
        >
          {type === 'success' && <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />}
          <p className="text-xs sm:text-sm font-medium flex-1">{message}</p>
          <button
            onClick={onClose}
            className="ml-1 sm:ml-2 hover:opacity-70 transition-opacity"
          >
            <X className="w-3 h-3 sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>
    );
  };
export default Alert;