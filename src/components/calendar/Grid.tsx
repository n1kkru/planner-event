import { CSSProperties, ReactNode } from "react";
import { axis2D, fillArray } from "../../lib/utils";
import clsx from "clsx";
import { Cell } from "./Cell";
import { GridCSS } from ".";
import { CalendarMonthTable } from "src/lib/CalendarBuilder";

type CellCallbackProps = {
  style?: CSSProperties;
  className?: string;
  children?: ReactNode;
};

type GridProps = {
  calendar: CalendarMonthTable;
  children(props: CellCallbackProps): ReactNode;
};


export const Grid = ({calendar, children }: GridProps) => {
  const cells: string[] = fillArray(100, "");
  const isHeader = (x: number, y: number) => x === 0 || y === 0;
  return (
    <form
      className={clsx("layer", "base")}
      style={
        {
          "--w": calendar.width,
          "--h": calendar.height,
        } as GridCSS
      }
    >
      {cells.map((_, index) => {
        const [x, y] = axis2D(index, calendar.width);
        return (
          <Cell
            tag="button"
            x={x}
            y={y}
            onClick={() => {}}
            className={clsx("day", calendar.table[index].className)}
          >
            { !isHeader(x, y) &&  children
              ? children(calendar.table[index])
              : calendar.table[index].value}
          </Cell>
        );
      })}
    </form>
)}