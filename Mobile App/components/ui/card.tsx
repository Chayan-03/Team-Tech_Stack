import React from 'react';
import { View, ViewProps } from 'react-native';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';

interface CardProps extends ViewProps {
  className?: string;
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'outlined';
  size?: 'default' | 'sm' | 'lg';
}

const cardVariants = cva(
  'bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden',
  {
    variants: {
      variant: {
        default: 'bg-white',
        elevated: 'bg-white shadow-md',
        outlined: 'bg-white border-2 border-gray-300',
      },
      size: {
        default: 'p-4',
        sm: 'p-2',
        lg: 'p-6',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const Card = ({ 
  className, 
  children, 
  variant = 'default', 
  size = 'default', 
  ...props 
}: CardProps) => {
  return (
    <View 
      className={cn(cardVariants({ variant, size, className }))}
      {...props}
    >
      {children}
    </View>
  );
};

const CardHeader = ({ 
  className, 
  children, 
  ...props 
}: CardProps) => (
  <View 
    className={cn('flex-row justify-between items-center mb-3', className)}
    {...props}
  >
    {children}
  </View>
);

const CardTitle = ({ 
  className, 
  children, 
  ...props 
}: CardProps) => (
  <View 
    className={cn('text-xl font-bold text-gray-800', className)}
    {...props}
  >
    {children}
  </View>
);

const CardContent = ({ 
  className, 
  children, 
  ...props 
}: CardProps) => (
  <View 
    className={cn('', className)}
    {...props}
  >
    {children}
  </View>
);

const CardFooter = ({ 
  className, 
  children, 
  ...props 
}: CardProps) => (
  <View 
    className={cn('mt-4 border-t border-gray-200 pt-3', className)}
    {...props}
  >
    {children}
  </View>
);

export { Card, CardHeader, CardTitle, CardContent, CardFooter };