import AppLogoIcon from './app-logo-icon';
import { Church } from 'lucide-react';

export default function AppLogo() {
  return (
    <div className="flex items-center">
      <div className="p-2 bg-primary/10 rounded-full flex items-center justify-center">
        <Church className="h-6 w-6 text-primary" />
      </div>
      <div className="ml-2 text-left">
        <span className="truncate leading-tight font-semibold text-sm">
          ST Paulus Kwimi
        </span>
      </div>
    </div>
  );
}
