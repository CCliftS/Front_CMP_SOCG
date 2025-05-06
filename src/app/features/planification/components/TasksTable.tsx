'use client';
import React from "react";
import { ValleysTasksTableColumns} from "@/constants/tableConstants";
import { ISubtask } from "@/app/models/ISubtasks";
import { usePlanification } from "../hooks/usePlanification";
import { taskOrigin, taskType, taskScope, taskInteraction, taskRisk } from "@/constants/infoTasks";
import { ZoomIn } from "lucide-react";

interface TasksTableProps {
    tasks: any[];
    subtasks: ISubtask[];
    selectedTaskId: string | null;
    onTaskClick: (taskId: string) => void;
    tableOption: string;
}

const TasksTable: React.FC<TasksTableProps> = ({
    tasks,
    subtasks,
    selectedTaskId,
    onTaskClick,
    tableOption,
}) => {


    const {getRemainingDays,formatDate,handleSeeInformation, setIsPopupOpen,setSelectedForm} = usePlanification();

    return (
        <div className="overflow-x-auto border border-[#041e3e] rounded-md">
            <table className="table-auto w-full ">
                <thead className="bg-[#2771CC]">
                    <tr className="text-sm text-white">
                        {(ValleysTasksTableColumns).map((column, index) => (
                            <th
                                key={index}
                                className="px-4 py-2 text-center font-medium truncate"
                            >
                                {column}
                            </th>
                        ))}
                        <th colSpan={11}></th>
                    </tr>
                </thead>
                <tbody className="bg-white text-xs truncate divide-y divide-[#041e3e]">
                    {tasks.map((task) => (
                        <React.Fragment key={task.id}>
                            <tr className={`${selectedTaskId === task.taskId ? "bg-white" : ""}`} >
                                <td 
                                    className="px-4 py-2 text-center cursor-pointer text-blue-700 font-semibold"
                                    onClick={() => onTaskClick(task.taskId)}
                                >{task.task.name}</td>
                                <td className="px-4 py-2 text-center">{taskOrigin[task.originId + 1]}</td>
                                <td className="px-4 py-2 text-center">{taskType[task.typeId + 1]}</td>
                                <td className="px-4 py-2 text-center">{taskScope[task.scopeId + 1]}</td>
                                <td className="px-4 py-2 text-center">{taskInteraction[task.interactionId + 1]}</td>
                                <td className="px-4 py-2 text-center">{taskRisk[task.riskId+1]}</td>
                                <td className="px-4 py-2 text-center">{task.budget ? task.budget : "-"}</td>
                                <td className="px-4 py-2 text-center">{task.startDate ? formatDate(task.startDate) : "-"}</td>
                                <td className="px-4 py-2 text-center">{task.endDate ? formatDate(task.endDate) : "-"}</td>
                                <td className="px-4 py-2 text-center">{getRemainingDays(task.startDate, task.endDate)}</td>
                                <td className="px-4 py-2 text-center">{task.finishDate ? formatDate(task.finishDate) : "-"}</td>
                                <td className="px-4 py-2 text-center">
                                    <ZoomIn 
                                        size={20} 
                                        color="#041e3e" 
                                        className="cursor-pointer"
                                        onClick={async () => {
                                            const taskInfo = await handleSeeInformation(task.taskId); 
                                            if (taskInfo) {
                                                setSelectedForm("Tarea");
                                                setIsPopupOpen(true); 
                                            }
                                        }}
                                    />
                                </td>
                            </tr>
                            {selectedTaskId === task.taskId &&
                                subtasks.filter((subtask) => subtask.taskId === task.taskId) 
                                    .map((subtask) => (
                                        <tr
                                            key={subtask.id}
                                            className="bg-gray-200"
                                        >
                                            <td className="px-4 py-2 text-center">{subtask.name}</td>
                                            <td className="px-4 py-2 text-center">{"-"}</td>
                                            <td className="px-4 py-2 text-center">{"-"}</td>
                                            <td className="px-4 py-2 text-center">{"-"}</td>
                                            <td className="px-4 py-2 text-center">{"-"}</td>
                                            <td className="px-4 py-2 text-center">{"-"}</td>
                                            <td className="px-4 py-2 text-center">{subtask.budget}</td>
                                            <td className="px-4 py-2 text-center">{formatDate(subtask.startDate)}</td>
                                            <td className="px-4 py-2 text-center">{formatDate(subtask.endDate)}</td>
                                            <td className="px-4 py-2 text-center">{getRemainingDays(subtask.startDate,subtask.endDate)}</td>
                                            <td className="px-4 py-2 text-center">{formatDate(subtask.finalDate)}</td>
                                            <td className="px-4 py-2 text-center">
                                                <ZoomIn 
                                                size={20} 
                                                color="#041e3e" 
                                                className="cursor-pointer"
                                                // onClick={() => onTaskClick(subtask.taskId)} MANDAR AL FORM CON EL details true
                                                />
                                            </td>
                                        </tr>
                                    ))}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
export default TasksTable;