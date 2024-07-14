import React, { HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  className: string;
  children?: ReactNode;
  name?: string;
  text?: string;
  type?: "button" | "submit" | "reset" | undefined;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ 
  className, 
  children,
  text,
  type,
  ...props
}, ref) => {
  return (<button 
    type={type}
    {...props} 
    ref={ref}
    className={clsx("button", className)}
    >
      {text ? text : children}
    </button>);
});
