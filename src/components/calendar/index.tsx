import { CSSProperties, SyntheticEvent, useRef, useState } from "react";
import clsx from "clsx";
import { Button } from "../../ui/Button";
import { axis2D, fillArray, pointToString } from "../../lib/utils";
import {
  CalendarMonthTable,
  CalendarBuilder,
  CalendarCell,
} from "../../lib/CalendarBuilder";
import { MonthCalendar } from "../../lib/Calendar";
import React from "react";
import { Cell } from "./Cell";
import { ModalAuth } from "../ModalAuth/ModalAuth";
import { useDispatch } from "src/services/store";
import { eventsThunk } from 'src/services/slice';

export interface GridCSS extends CSSProperties {
  "--w": number;
  "--h": number;
}

interface CalendarProps {
  children?: (props: CalendarCell) => React.ReactNode;
}

export function Calendar({ children }: CalendarProps) {
  const dispatch = useDispatch();

  const rebuildCalendar = () => {
    const builder = new CalendarBuilder(instance.current);
    return builder.getMonthTable();
  };
  const instance = useRef<MonthCalendar>(new MonthCalendar());
  const [calendar, setCurrent] = useState<CalendarMonthTable>(rebuildCalendar);
  const [isModalActive, setModalActive] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const nextMonth = () => {
    instance.current.next();
    setCurrent(rebuildCalendar());
  };
  const prevMonth = () => {
    instance.current.prev();
    setCurrent(rebuildCalendar());
  };
  const cells: string[] = fillArray(calendar.width * calendar.height, "");
  const handleModalOpen = () => {
    setModalActive(true);
  };
  const handleModalClose = () => {
    setModalActive(false);
  };
  const onChangeEmail: React.ReactEventHandler<HTMLInputElement> = (e) => {
    setEmail(e.currentTarget.value);
  };
  const onChangePassword: React.ReactEventHandler<HTMLInputElement> = (e) => {
    setPassword(e.currentTarget.value);
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(eventsThunk());
  }

  return (
    <section className="calendar">
      <nav className="controls">
        <div className="logo">
          <img src={require('./logo.png')} alt="red collar" />
          <h1>red collar</h1>
          <h2>planner <span className="accent">event</span></h2>
        </div>
        <div className="navigate">
          <span className="current-date">{calendar.label}</span>
          <Button name="prev" className="arrow"  text="<" onClick={prevMonth} />
          <Button name="next" className="arrow" text=">" onClick={nextMonth} />
          <Button name="sign" className="sign" text="Войти" onClick={handleModalOpen}/>

        </div>
      </nav>

      <div className="layers">
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
                className={clsx("day", calendar.table[index].className)}
                onClick={handleModalOpen}
              >
                {children 
                  ? children(calendar.table[index])
                  : calendar.table[index].value}
              </Cell>
            );
          })}
        </form>
      </div>
      <div>
        {isModalActive && (
          <ModalAuth 
            email={email}
            password={password} 
            isOpen={isModalActive} 
            onClose={handleModalClose} 
            onChangeEmail={onChangeEmail}
            onChangePassword={onChangePassword}
            onSubmit={handleSubmit}
          /> 
        )}
      </div>
    </section>
  );
}
