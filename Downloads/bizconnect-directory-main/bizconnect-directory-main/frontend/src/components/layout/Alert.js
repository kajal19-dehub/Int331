import React from 'react';
import { useSelector } from 'react-redux';
import { AlertCircle, CheckCircle, XCircle, Info } from 'lucide-react';

const Alert = () => {
  const alerts = useSelector(state => state.alert.alerts);

  if (!alerts || alerts.length === 0) return null;

  const getAlertIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-400" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-400" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-yellow-400" />;
      default:
        return <Info className="h-5 w-5 text-blue-400" />;
    }
  };

  const getAlertStyles = (type) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      default:
        return 'bg-blue-50 border-blue-200 text-blue-800';
    }
  };

  return (
    <div className="fixed top-20 right-4 z-50 space-y-2">
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className={`${getAlertStyles(alert.type)} border rounded-lg p-4 shadow-lg max-w-sm transition-all duration-300`}
        >
          <div className="flex items-start">
            {getAlertIcon(alert.type)}
            <div className="ml-3">
              <p className="text-sm font-medium">{alert.message}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Alert;