import React from 'react';
import { ExternalLink } from 'lucide-react';
import useAppStore from '../store';

const UPProfileCard: React.FC = () => {
  const { universalProfile } = useAppStore();

  if (!universalProfile) {
    return null;
  }

  // Format address for display
  const formatAddress = (address: string): string => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 shadow-lg border border-white/20 transition-all duration-300 hover:shadow-xl animate-fade-in">
      <div className="flex items-center gap-4">
        {/* Profile Avatar */}
        <div className="relative">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary-400">
            {universalProfile.avatar ? (
              <img 
                src={universalProfile.avatar} 
                alt={universalProfile.name || "Universal Profile"} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white font-bold text-xl">
                {(universalProfile.name || universalProfile.address).substring(0, 1).toUpperCase()}
              </div>
            )}
          </div>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success-500 rounded-full border-2 border-white flex items-center justify-center">
            <span className="text-white text-xs">✓</span>
          </div>
        </div>

        {/* Profile Info */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white">
            {universalProfile.name || "Universal Profile"}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-sm text-gray-300 font-mono">
              {formatAddress(universalProfile.address)}
            </p>
            <button 
              onClick={() => navigator.clipboard.writeText(universalProfile.address)}
              className="text-xs text-gray-400 hover:text-primary-400 transition-colors"
            >
              Copy
            </button>
          </div>
          {universalProfile.description && (
            <p className="text-sm text-gray-300 mt-2">{universalProfile.description}</p>
          )}
        </div>
      </div>

      {/* Social Links */}
      {universalProfile.links && universalProfile.links.length > 0 && (
        <div className="mt-4 pt-4 border-t border-white/10">
          <div className="flex flex-wrap gap-2">
            {universalProfile.links.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1 text-xs rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
              >
                <span>{link.title}</span>
                <ExternalLink size={12} />
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UPProfileCard;