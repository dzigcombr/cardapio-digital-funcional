import React from 'react';

interface HeaderProps {
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  return (
    <header className={`flex items-stretch gap-[40px_92px] ${className}`}>
      <div className="flex flex-col items-stretch">
        <h1 className="text-[rgba(60,47,47,1)] text-[45px] font-normal leading-none">
          Foodgo
        </h1>
        <p className="text-[rgba(106,106,106,1)] text-lg font-medium">
          Order your favourite food!
        </p>
      </div>
      <img
        src="https://api.builder.io/api/v1/image/assets/46e4896b41454ef4b14a371cd3a4a983/087f1297e9a841f8ad5567dea6b6c542f05fdc91?placeholderIfAbsent=true"
        alt="User profile"
        className="aspect-[1] object-contain w-[60px] shrink-0 rounded-[0px_0px_0px_0px]"
      />
    </header>
  );
};
