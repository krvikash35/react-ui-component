import React, {
  useEffect,
  useRef,
  useState,
  forwardRef,
  Ref,
  HTMLAttributes,
} from 'react';
import styled, { keyframes } from 'styled-components';
import { useTheme, TTheme } from '../theme';
import { hexToRGB } from '../util';

type TButtonProps = {
  variant?: 'text' | 'outlined' | 'contained';
  size?: 'small' | 'medium' | 'large';
  colorScheme?: 'default' | 'primary' | 'danger';
  disabled?: boolean;
  children: React.ReactNode;
};

type TStyledButtonProps = Required<TButtonProps> & {
  th: TTheme;
  isHovered: boolean;
  isRipple: boolean;
};

type TRippleProps = {
  rippleConfig: { top: string; left: string; scale: number; bg: string };
};
const Ripple = styled.span<TRippleProps>`
  position: absolute;
  display: block;
  width: 1px;
  height: 1px;
  border-radius: 50%;
  transition: transform 3s;
  z-index: 1;
  top: ${p => p.rippleConfig.top};
  left: ${p => p.rippleConfig.left};
  background-color: ${p => p.rippleConfig.bg};
  animation: ${p => keyframes`
  from{
    transform: scale(1);
    opacity: 1;
  }
  to{
    transform: scale(${p.rippleConfig.scale});
    opacity: 0;
  }
  `}
    0.6s linear;
`;

const StyledButton = styled.button<TStyledButtonProps>`
  position: relative;
  overflow: hidden;
  font-size: 0.9rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ isHovered, variant, colorScheme, th }) =>
    (isHovered &&
      (variant === 'text' || variant === 'outlined') &&
      ((colorScheme === 'primary' && th.primaryLighter) ||
        (colorScheme === 'danger' && th.errorLighter) ||
        th.surfaceLighter)) ||
    (!isHovered &&
      variant === 'contained' &&
      ((colorScheme === 'primary' && th.primary) ||
        (colorScheme === 'danger' && th.error) ||
        th.surfaceLight)) ||
    (isHovered &&
      variant === 'contained' &&
      ((colorScheme === 'primary' && th.primaryDark) ||
        (colorScheme === 'danger' && th.errorDark) ||
        th.surfaceDark))};
  color: ${({ variant, colorScheme, th }) =>
    variant === 'text' || variant === 'outlined'
      ? (colorScheme === 'primary' && th.primary) ||
        (colorScheme === 'danger' && th.error) ||
        th.textOnSurface
      : (colorScheme === 'primary' && th.textOnPrimary) ||
        (colorScheme === 'danger' && th.textOnError) ||
        th.textOnSurface};
  border: ${({ variant }) => (variant === 'outlined' ? '1px' : '0px')} solid
    ${({ variant, colorScheme, th }) =>
      (variant === 'outlined' && colorScheme === 'primary' && th.primary) ||
      (colorScheme === 'danger' && th.error) ||
      (colorScheme === 'default' && th.surfaceDark)};
  outline: none;
  text-transform: uppercase;
  border-radius: 3px;
  padding: ${({ size }) =>
    (size === 'small' && '0.3rem 0.8rem') ||
    (size === 'large' && '0.7rem 1.2rem') ||
    '0.5rem 1rem'};
  font-size: ${({ size }) =>
    (size === 'small' && '0.6rem') ||
    (size === 'large' && '1.3rem') ||
    '0.9rem'};

  min-width: 50px;
  transition: all 0.25s;

  &:disabled {
    opacity: 0.5;
  }
  &:focus {
    box-shadow: 0 0 0 3px ${p => p.th.primaryLight};
  }
  body.usingMouse &:focus {
    box-shadow: none;
  }
`;

function Button1(
  {
    variant = 'text',
    size = 'medium',
    colorScheme = 'default',
    disabled = false,
    onClick,
    onMouseDown,
    onMouseUp,
    children,
    ...rest
  }: TButtonProps & HTMLAttributes<HTMLButtonElement>,
  ref: Ref<HTMLButtonElement>
) {
  const { theme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [isRipple, setIsRipple] = useState(false);
  let buttonRef = useRef<HTMLButtonElement>(null);
  const rippleRef = useRef<HTMLSpanElement>(null);
  const rippleConfig = useRef({
    top: '',
    left: '',
    scale: 0,
    bg: '',
  });

  if (ref) {
    //@ts-ignore
    ref.current = buttonRef.current;
  }

  const onMouseEnter = () => {
    setIsHovered(true);
  };

  const onMouseLeave = () => {
    setIsHovered(false);
  };

  const onBtnMouseDown = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (onMouseDown) {
      onMouseDown(e);
    }
    const { x, y, width, height } = buttonRef.current!.getBoundingClientRect();

    const left = e.clientX - x + 'px';
    const top = e.clientY - y + 'px';
    const scale = height > width ? 2 * height : 2 * width;
    const bg =
      (colorScheme === 'primary' && theme.primaryLight) ||
      (colorScheme === 'danger' && theme.errorLight) ||
      theme.surfaceLight;
    rippleConfig.current = {
      left,
      top,
      scale,
      bg: hexToRGB(bg, 0.3),
    };
    setIsRipple(false);
  };

  useEffect(() => {
    if (!isRipple) {
      setIsRipple(true);
    }
  }, [isRipple]);

  return (
    <StyledButton
      onClick={onClick}
      ref={buttonRef}
      colorScheme={colorScheme}
      variant={variant}
      size={size}
      th={theme}
      disabled={disabled}
      isHovered={isHovered}
      isRipple={isRipple}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseDown={onBtnMouseDown}
      {...rest}
    >
      {children}
      {isRipple && (
        <Ripple rippleConfig={rippleConfig.current} ref={rippleRef} />
      )}
    </StyledButton>
  );
}

export const Button = forwardRef(Button1);
