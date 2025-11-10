import React from 'react'
import { styled } from '../../styled-components'
import { Box } from '../Box'

export interface SkeletonProps {
  variant?: 'rect' | 'circle' | 'round'
  animation?: 'pulse' | 'wave'
  width?: string | number
  height?: string | number
  isDark?: boolean
  className?: string
}

export interface SkeletonV2Props extends SkeletonProps {
  isDataReady?: boolean
  children?: React.ReactNode
  wrapperProps?: any
  skeletonTop?: string
  skeletonLeft?: string
  mr?: string | number
  ml?: string | number
}

// Stellar UI styled Skeleton component
interface SkeletonBaseProps {
  variant?: 'rect' | 'circle' | 'round'
  animation?: 'pulse' | 'wave'
  isDark?: boolean
}

const SkeletonBase = styled(Box)<SkeletonBaseProps>`
  min-height: 20px;
  display: block;
  background-color: ${({ isDark }) => 
    isDark 
      ? 'var(--stellar-inputSecondary, var(--stellar-backgroundAlt))' 
      : 'var(--stellar-backgroundDisabled, #f0f0f0)'
  };
  overflow: hidden;
  position: relative;
  
  /* Variant-based border radius */
  border-radius: ${({ variant = 'rect' }: SkeletonBaseProps) => {
    switch (variant) {
      case 'circle': return '50%';
      case 'round': return 'var(--stellar-borderRadius-md)';
      case 'rect': 
      default: return 'var(--stellar-borderRadius-sm)';
    }
  }};
  
  /* Animation styles */
  ${({ animation = 'pulse' }: SkeletonBaseProps) => {
    if (animation === 'pulse') {
      return `
        animation: stellar-pulse 1.5s ease-in-out infinite;
        @keyframes stellar-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `;
    } else if (animation === 'wave') {
      return `
        background: linear-gradient(90deg, 
          var(--stellar-backgroundDisabled) 25%, 
          var(--stellar-backgroundAlt) 50%, 
          var(--stellar-backgroundDisabled) 75%
        );
        background-size: 200% 100%;
        animation: stellar-wave 2s infinite;
        @keyframes stellar-wave {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `;
    }
    return '';
  }};
`;

// Simple Skeleton wrapper
const SkeletonWrapper = styled(Box)`
  position: relative;
`;

const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'rect',
  animation = 'pulse',
  width,
  height,
  isDark = false,
  className,
  ...props
}) => {
  return (
    <SkeletonBase
      variant={variant}
      animation={animation}
      isDark={isDark}
      width={width}
      height={height}
      className={className}
      {...props}
    />
  )
}

export const SkeletonV2: React.FC<SkeletonV2Props> = ({
  variant = 'rect',
  animation = 'pulse',
  isDataReady = false,
  children,
  wrapperProps,
  skeletonTop = '0',
  skeletonLeft = '0',
  width,
  height,
  mr,
  ml,
  isDark = false,
  ...props
}) => {
  return (
    <SkeletonWrapper
      width={isDataReady ? 'auto' : width}
      height={isDataReady ? 'auto' : height}
      style={{
        marginRight: mr,
        marginLeft: ml,
      }}
      {...wrapperProps}
    >
      {isDataReady ? (
        <Box
          style={{
            opacity: 1,
            transition: 'opacity 0.3s ease-in-out',
          }}
        >
          {children}
        </Box>
      ) : (
        <Box
          style={{
            position: 'absolute',
            top: skeletonTop,
            left: skeletonLeft,
            opacity: 1,
            transition: 'opacity 0.3s ease-in-out',
          }}
        >
          <SkeletonBase
            variant={variant}
            animation={animation}
            isDark={isDark}
            width={width}
            height={height}
            {...props}
          />
        </Box>
      )}
    </SkeletonWrapper>
  )
}

export default Skeleton