import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'danger' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  style,
  className,
}) => {
  const baseStyle: React.CSSProperties = {
    border: 'none',
    borderRadius: '6px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontWeight: 600,
    transition: 'all 0.2s ease-in-out',
  };

  const sizeStyle: Record<string, React.CSSProperties> = {
    sm: { padding: '6px 10px', fontSize: '0.8rem' },
    md: { padding: '8px 14px', fontSize: '0.9rem' },
    lg: { padding: '10px 18px', fontSize: '1rem' },
  };

  const variantStyle: Record<string, React.CSSProperties> = {
    primary: {
      backgroundColor: '#0B3D91',
      color: '#ffffff',
    },
    danger: {
      backgroundColor: '#dc3545',
      color: '#ffffff',
    },
    outline: {
      backgroundColor: 'transparent',
      border: '2px solid #0B3D91',
      color: '#0B3D91',
    },
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={className}
      style={{
        ...baseStyle,
        ...sizeStyle[size],
        ...variantStyle[variant],
        opacity: disabled ? 0.6 : 1,
        ...style,
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.transform = 'scale(1.05)';
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
      }}
    >
      {children}
    </button>
  );
};

export default Button;
