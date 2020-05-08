import React from 'react';

type TButtonProps = {
  variant?: 'outline' | 'filled' | 'flat';
  size?: 'small' | 'medium' | 'large';
  colorScheme?: 'primary' | 'default' | 'error' | 'success' | 'warning';
};

export function Button({
  variant = 'flat',
  size = 'medium',
  colorScheme = 'default',
}: TButtonProps) {
  // const { variant = 'flat' } = props;
  return <div>Button</div>;
}
