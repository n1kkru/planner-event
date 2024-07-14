import { Table } from "./Table";
import { axis2D, index } from "./utils";
import { MonthCalendar, CalendarDay } from "./Calendar";
import clsx from "clsx";

export type CalendarCell = {
  value: string;
  date: Date | null;
  className: string;
};

export type CalendarMonthValue = [number, number];

export type CalendarMonthTable = {
  label: string,
  width: number,
  height: number,
  table: CalendarCell[]
};

export interface ICalendar {
  currentYear: number;
  currentMonth: number;
  currentMonthName: string;
  calendarDays: CalendarDay[];
  getWeek(day: number): number;
  getWeekDayName(day: number): string;
  prevMonth: ICalendar;
  nextMonth: ICalendar;
}

export class CalendarBuilder {
  static readonly WIDTH = 7;
  static readonly HEIGHT = 5;
  protected table: Table<CalendarCell>;
  
  constructor(protected calendar: ICalendar) {
    this.table = new Table<CalendarCell>(
      CalendarBuilder.WIDTH, 
      CalendarBuilder.HEIGHT, 
      this.onCellInit.bind(this));
  }

  getMonthTable(): CalendarMonthTable {
    return {
      label: this.getLabel(),
      width: CalendarBuilder.WIDTH,
      height: CalendarBuilder.HEIGHT,
      table: this.table.dump()
    }
  }

  protected getLabel(): string {
    return [
      this.calendar.currentMonthName,
    ].join(" ");
  }

  protected onCellInit(_: unknown, cellIndex?: number): CalendarCell {
    const [x, y] = axis2D(cellIndex!, CalendarBuilder.WIDTH);
    const days = this.calendar.calendarDays;

    const middleIndex = Math.floor((CalendarBuilder.WIDTH * CalendarBuilder.HEIGHT) / 2);
    let value = String(cellIndex || "");
    let className = "";
    let date: Date | null = null;

      const [day, isCurrentMonth] = days[index(x ,y , 7)];
      value = String(day);
      className = isCurrentMonth 
        ? 'day in-range' // дни в диапазоне выбранного месяца
        : 'day out-of-range'; // дни соседних месяцев

      // пользователь данных нашей таблицы не захочет сам вычислять дату,
      // здесь выполнить это вычисление удобнее
      if (isCurrentMonth) {
        date = new Date(
          this.calendar.currentYear, 
          this.calendar.currentMonth, 
          day
        );
      } else {
        date = (cellIndex! < middleIndex) ? new Date(
          this.calendar.prevMonth.currentYear, 
          this.calendar.prevMonth.currentMonth, 
          day
        ) : new Date(
          this.calendar.nextMonth.currentYear, 
          this.calendar.nextMonth.currentMonth, 
          day
        )
      
    }

    return {
      value,
      date,
      className
    };
  }
}