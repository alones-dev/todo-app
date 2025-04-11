import React, { useEffect, useState } from 'react'
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import dayjs from 'dayjs';

interface WeekCalendarProps {
    onDateChange: (date: dayjs.Dayjs) => void;
}

const WeekCalendar = ({onDateChange}: WeekCalendarProps) => {
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [weekDays, setWeekDays] = useState<dayjs.Dayjs[]>([]);

    useEffect(() => {
        updateWeekDays(dayjs());
    }, [])

    const updateWeekDays = (date: dayjs.Dayjs) => {
        const startOfWeek = date.startOf('week').add(1, 'day');
        const days = Array.from({ length: 7 }, (_, i) => startOfWeek.add(i, 'day'));
        setWeekDays(days);
    }
    
    const handleChangeWeek = (direction: string) => {
        const newDate = direction === 'next' 
            ? selectedDate.add(1, 'week') 
            : selectedDate.subtract(1, 'week');
            
        updateWeekDays(newDate);
        setSelectedDate(newDate);
        onDateChange(newDate);
    }
    
    const getWeekMonthYear = () => {
        if (weekDays.length === 0) return '';
            
        const firstDay = weekDays[0];
        const lastDay = weekDays[6];
            
        if (firstDay.month() !== lastDay.month()) {
            if (firstDay.year() !== lastDay.year()) {
                return `${firstDay.format('MMM')} ${firstDay.year()} - ${lastDay.format('MMM')} ${lastDay.year()}`;
            }
            return `${firstDay.format('MMM')} - ${lastDay.format('MMM')} ${lastDay.year()}`;
        }
        
        return `${firstDay.format('MMMM')} ${firstDay.year()}`;
    }

    const handleDayClick = (day: dayjs.Dayjs) => {
        setSelectedDate(day);
        onDateChange(day); 
    };

    return (
        <div className="flex items-center justify-between mt-8 w-full">
            <button 
                onClick={() => handleChangeWeek('prev')}
                className="cursor-pointer text-gray-300 hover:text-white transition duration-200 sm:mt-12"
            >
                <FiChevronLeft size={24} />
            </button>

            <div className="flex-1 mx-2 space-y-4 items-center">
                <div className="text-center text-white text-lg font-semibold">
                    {getWeekMonthYear()}
                </div>

                <div className="flex gap-4 justify-center sm:hidden">
                    {weekDays.slice(0, 3).map((day) => {
                        const isSelected = day.isSame(selectedDate, 'day');
                        return (
                            <button
                                key={day.format('YYYY-MM-DD')}
                                            onClick={() => handleDayClick(day)}
                                            className={`cursor-pointer w-16 h-16 flex flex-col items-center justify-center rounded-md text-sm 
                                                ${isSelected ? 'border-2 border-[#3979e4] text-white' : 'text-gray-300 hover:text-white'} 
                                                bg-[#1f2937]`}
                                        >
                                            <div className="font-medium">{day.format('ddd')}</div>
                                            <div className="text-sm text-white">{day.format('D')}</div>
                                        </button>
                                    );
                                })}
                            </div>
                            
                            <div className="flex gap-4 justify-center mt-2 sm:hidden">
                                {weekDays.slice(3, 7).map((day) => {
                                    const isSelected = day.isSame(selectedDate, 'day');
                                    return (
                                        <button
                                            key={day.format('YYYY-MM-DD')}
                                            onClick={() => handleDayClick(day)}
                                            className={`cursor-pointer w-16 h-16 flex flex-col items-center justify-center rounded-md text-sm 
                                                ${isSelected ? 'border-2 border-[#3979e4] text-white' : 'text-gray-300 hover:text-white'} 
                                                bg-[#1f2937]`}
                                        >
                                            <div className="font-medium">{day.format('ddd')}</div>
                                            <div className="text-sm text-white">{day.format('D')}</div>
                                        </button>
                                    );
                                })}
                            </div>
                            
                            <div className="hidden sm:flex gap-4 justify-center">
                                {weekDays.map((day) => {
                                    const isSelected = day.isSame(selectedDate, 'day');
                                    return (
                                        <button
                                            key={day.format('YYYY-MM-DD')}
                                            onClick={() => handleDayClick(day)}
                                            className={`cursor-pointer w-16 h-16 flex flex-col items-center justify-center rounded-md text-sm 
                                                ${isSelected ? 'border-2 border-[#3979e4] text-white' : 'text-gray-300 hover:text-white'} 
                                                bg-[#1f2937]`}
                                        >
                                            <div className="font-medium">{day.format('ddd')}</div>
                                            <div className="text-sm text-white">{day.format('D')}</div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <button 
                            onClick={() => handleChangeWeek('next')}
                            className="cursor-pointer text-gray-300 hover:text-white transition duration-200 sm:mt-12"
                        >
                            <FiChevronRight size={24} />
                        </button>
                    </div>
    )
}

export default WeekCalendar