import { ReactNode } from "react";
import { pointToString } from "../../lib/utils";
import clsx from "clsx";
import { Button } from "src/ui/Button";

type CellProps = {
  tag: keyof HTMLElementTagNameMap;
  x: number;
  y: number;
  className?: string;
  children: ReactNode;
  onClick: () => void;
};

export const Cell = ({ tag, x, y, className, children, onClick }: CellProps) => {
  const Tag = tag;
  return (
    <Button
      key={pointToString(x, y)}
      className={clsx("cell", className)}
      data-x={x}
      data-y={y}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};
