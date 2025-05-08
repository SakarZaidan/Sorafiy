import React from 'react';
import { Progress } from '@/components/ui/progress';

interface PasswordStrengthProps {
  password: string;
}

const PasswordStrength: React.FC<PasswordStrengthProps> = ({ password }) => {
  const calculateStrength = (password: string): number => {
    let strength = 0;
    
    // Length check
    if (password.length >= 8) strength += 20;
    
    // Character type checks
    if (/[A-Z]/.test(password)) strength += 20; // Uppercase
    if (/[a-z]/.test(password)) strength += 20; // Lowercase
    if (/[0-9]/.test(password)) strength += 20; // Numbers
    if (/[^A-Za-z0-9]/.test(password)) strength += 20; // Special characters
    
    return strength;
  };

  const getStrengthLabel = (strength: number): string => {
    if (strength === 0) return 'Very Weak';
    if (strength <= 20) return 'Weak';
    if (strength <= 40) return 'Fair';
    if (strength <= 60) return 'Good';
    if (strength <= 80) return 'Strong';
    return 'Very Strong';
  };

  const getStrengthColor = (strength: number): string => {
    if (strength <= 20) return 'text-destructive';
    if (strength <= 40) return 'text-orange-500';
    if (strength <= 60) return 'text-yellow-500';
    if (strength <= 80) return 'text-lime-500';
    return 'text-green-500';
  };

  const strength = calculateStrength(password);
  const label = getStrengthLabel(strength);
  const colorClass = getStrengthColor(strength);

  return (
    <div className="space-y-2">
      <Progress value={strength} className="h-1" />
      <p className={`text-xs ${colorClass}`}>{label}</p>
    </div>
  );
};

export default PasswordStrength;