"use client"

import React, { useState, useEffect } from 'react'
import { IoMdAddCircleOutline } from "react-icons/io";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import dayjs from 'dayjs';
import AddTask from './AddTask';
import EditTask from './EditTask';
import WeekCalendar from './WeekCalendar';

interface Task {
    id: string,
    title: string,
    completed: boolean,
    startTime: string,
    dueDate: dayjs.Dayjs,
    endTime: string,
    color: string
}

const TaskManager = () => {
    const [loading, setLoading] = useState(true);
    const [addTask, setAddTask] = useState(false);
    const [editTask, setEditTask] = useState(false);
    const [tasks, setTasks] = useState<Task[]>([])
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [taskChanged, setTaskChanged] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const res = await fetch("/api/getTasks")
                const data: Task[] = await res.json()
                setTasks(data);
            }
            catch (error) {
                console.log("Error fetch: ", error);
            } 
            finally {
                setLoading(false);
            }
        }

        fetchTasks();
    }, [taskChanged])

    const getTasksForSelectedDate = () => {
        return tasks.filter(task => 
            dayjs(task.dueDate).isSame(selectedDate, 'day')
        );
    };

    return (
        <div className='bg-[#101827]'>
            <div className='w-full min-h-screen items-center justify-center sm:items-start sm:justify-start flex flex-col mx-auto max-w-7xl pt-10'>
                <button 
                    onClick={() => setAddTask(true)}
                    className='flex items-center gap-2 bg-[#3c82f6] text-white px-7 py-3 rounded-lg cursor-pointer hover:bg-[#1e6df0] transition duration-200'
                >
                    <IoMdAddCircleOutline size={18} />
                    Add New Task
                </button>

                <WeekCalendar 
                    onDateChange={(date) => setSelectedDate(date)} 
                />

                <div className="w-full flex flex-col justify-center space-y-4 mt-16 mb-6 px-4">
                    {getTasksForSelectedDate().length > 0 ? (
                        getTasksForSelectedDate().map((task) => (
                            <div 
                                key={task.id} 
                                className={`w-full bg-[#1f2937] rounded-lg shadow-md overflow-hidden flex items-center ${task.completed ? 'opacity-60' : ''}`}
                            >
                                <div 
                                    className="h-20 w-1 flex-shrink-0" 
                                    style={{ backgroundColor: task.color }}
                                />
                                
                                <div className="flex-grow p-4 flex items-center justify-between">
                                    <div className="flex items-center">
                                        <input 
                                            type="checkbox" 
                                            checked={task.completed}
                                            className="mr-4 h-5 w-5 rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500"
                                            onChange={async (e) => {
                                                try {
                                                    const res = await fetch('/api/changeCompleted', {
                                                        method: 'PUT',
                                                        headers: {
                                                            'Content-Type': 'application/json',
                                                        },
                                                        body: JSON.stringify({
                                                            id: task.id,
                                                            completed: e.target.checked,
                                                        }),
                                                    });
                                                    if (!res.ok) {
                                                        throw new Error('Failed to update task');
                                                    }
                                                    setTaskChanged(prev => !prev);
                                                }
                                                catch (error) {
                                                    console.log("Error: ", error);
                                                }
                                            }}
                                        />
                                        <div className="flex flex-col">
                                            <span className="text-white text-lg">{task.title}</span>
                                            <span className="text-gray-400 text-sm">
                                                {task.startTime} - {task.endTime}
                                            </span>
                                        </div>  
                                    </div>
                                    
                                    <div className="flex space-x-3">
                                        <button 
                                            onClick={() => {
                                                setEditTask(true)
                                                setSelectedTask(task);
                                            }}
                                            className="text-gray-400 hover:text-gray-200 transition-colors cursor-pointer"
                                        >
                                            <FiEdit2 size={18} />
                                        </button>
                                        <button 
                                            className="text-gray-400 hover:text-red-400 transition-colors cursor-pointer"
                                            onClick={async () => {
                                                try {
                                                    const res = await fetch('/api/deleteTask', {
                                                        method: 'DELETE',
                                                        headers: {
                                                            'Content-Type': 'application/json',
                                                        },
                                                        body: JSON.stringify({ id: task.id }),
                                                    });

                                                    if (!res.ok) {
                                                        throw new Error('Failed to delete task');
                                                    }

                                                    setTaskChanged(prev => !prev);
                                                }
                                                catch (error) {
                                                    console.log("Error: ", error);
                                                }
                                            }}
                                        >
                                            <FiTrash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-gray-400 py-8">
                            {loading ? "Loading..." : "No tasks for this date."}
                        </div>
                    )}

                    
                </div>
            </div>

            {addTask && (
                <AddTask 
                    onClose={() => setAddTask(false)}
                    onAddTask={async (task) => {
                        try {
                            const res = await fetch('/api/addTask', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(task),
                            });

                            if (!res.ok) {
                                throw new Error('Failed to add task');
                            }

                            setAddTask(false);
                            setTaskChanged(prev => !prev);
                        }
                        catch (error) {
                            console.log("Error: ", error);
                        }
                    }}
                />
            )}

            {editTask && selectedTask && (
                <EditTask 
                    title={selectedTask.title}
                    date={new Date(selectedTask.dueDate.toString())}
                    startTime={selectedTask.startTime}
                    endTime={selectedTask.endTime}
                    color={selectedTask.color}
                    onClose={() => {
                        setEditTask(false)
                        setSelectedTask(null);
                    }}
                    onEditTask={async (task) => {
                        try {
                            const res = await fetch('/api/editTask', {
                                method: 'PUT',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    id: selectedTask.id,
                                    ...task
                                })
                            })

                            if (!res.ok) {
                                throw new Error('Failed to edit task');
                            }
                            setEditTask(false);
                            setSelectedTask(null);
                            setTaskChanged(prev => !prev);
                        }
                        catch (error) {
                            console.log("Error: ", error);
                        }
                    }}
                />
            )}
        </div>
    )
}

export default TaskManager