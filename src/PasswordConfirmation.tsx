import React, { useState, useRef, useEffect } from 'react';

export default function PasswordConfirmation() {
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [charWidths, setCharWidths] = useState<number[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const getCharBackgroundColor = (index: number): string => {
    if (index >= password.length) return 'bg-transparent';
    if (index >= confirmPassword.length) return 'bg-transparent';
    return password[index] === confirmPassword[index] ? 'bg-green-200' : 'bg-red-200';
  };

  useEffect(() => {
    if (inputRef.current) {
      const font = window.getComputedStyle(inputRef.current).font;
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      if (context) {
        context.font = font;
        const newCharWidths = password.split('').map(char => context.measureText(char).width);
        setCharWidths(newCharWidths);
      }
    }
  }, [password]);

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="flex flex-col gap-4 w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Enter password"
            className="w-full px-4 py-2 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent relative z-10"
          />
          <div className="absolute inset-0 flex items-center pointer-events-none z-0 px-4">
            {password.split('').map((_, index) => (
              <div
                key={index}
                className={`h-3/4 ${getCharBackgroundColor(index)} opacity-50`}
                style={{ width: `${charWidths[index]}px` }}
              />
            ))}
          </div>
        </div>
        <input
          type="text"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          placeholder="Confirm password"
          className="w-full px-4 py-2 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
}
