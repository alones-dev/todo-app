"use client"

import React, { useState, useRef } from 'react';

interface AddTaskProps {
  onClose: () => void;
  onAddTask: (task: {
    title: string;
    date: Date;
    startTime: string;
    endTime: string;
    color: string;
  }) => void;
}

const AddTask = ({ onClose, onAddTask }: AddTaskProps) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('10:00');
  const [color, setColor] = useState('#3b82f6');
  const colorInputRef = useRef<HTMLInputElement>(null);

  const handleColorButtonClick = () => {
    colorInputRef.current?.click();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date) return;

    onAddTask({
      title,
      date,
      startTime,
      endTime,
      color,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative z-50 w-full max-w-md rounded-lg bg-[#1f2937] p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-semibold text-white">Add New Task</h2>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="title"
                className="mb-2 block text-sm font-medium text-gray-300"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="block w-full rounded-md border border-gray-600 bg-gray-700 p-2 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Task title"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Date
              </label>
              <input
                type="date"
                value={date?.toISOString().split('T')[0] || ''}
                onChange={(e) => setDate(new Date(e.target.value))}
                className="block w-full rounded-md border border-gray-600 bg-gray-700 p-2 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="startTime"
                  className="mb-2 block text-sm font-medium text-gray-300"
                >
                  Start Time
                </label>
                <input
                  type="time"
                  id="startTime"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="block w-full rounded-md border border-gray-600 bg-gray-700 p-2 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="endTime"
                  className="mb-2 block text-sm font-medium text-gray-300"
                >
                  End Time
                </label>
                <input
                  type="time"
                  id="endTime"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="block w-full rounded-md border border-gray-600 bg-gray-700 p-2 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                    Color
                </label>
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <button
                            type="button"
                            onClick={handleColorButtonClick}
                            className="h-10 w-10 rounded-md border-2 border-gray-600 shadow-sm transition-all hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-700"
                            style={{ backgroundColor: color }}
                            aria-label="Choose color"
                        />
                        <input
                            type="color"
                            ref={colorInputRef}
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                            className="absolute h-0 w-0 opacity-0"
                        />
                    </div>
                    <span className="text-sm text-gray-300">
                        {color.toUpperCase()}
                    </span>
                </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="text-sm font-medium text-red-500 hover:text-red-400 cursor-pointer transition-all duration-200"
            >
              Close
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white hover:bg-blue-600 transition-all duration-200 cursor-pointer rounded-md py-2 px-4 text-sm font-medium"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTask;