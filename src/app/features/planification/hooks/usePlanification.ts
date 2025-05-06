import { useState, useEffect } from "react";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { CREATE_TASK, GET_TASK, GET_TASK_SUBTASKS } from "@/app/api/tasks";
import { CREATE_INFO_TASK, GET_INFO_TASK, GET_INFO_TASKS } from "@/app/api/infoTask";

export const usePlanification = () => {
    const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
    const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
    const [tableOption, setTableOption] = useState<string>("Tareas");
    const [selectedForm, setSelectedForm] = useState<string | null>(null);
    const [subTasks, setSubtasks] = useState<any[]>([]);
    const [createTask] = useMutation(CREATE_TASK);
    const [createInfoTask] = useMutation(CREATE_INFO_TASK);
    const {data,loading,error} = useQuery(GET_INFO_TASKS);
    const [getSubtasks, {data: dataSubtask, loading: loadingSubtask, error: errorSubtask}] = useLazyQuery(GET_TASK_SUBTASKS);
    const [getInfoTask, {data: dataInfo, loading: loadingInfo, error: errorInfo}] = useLazyQuery(GET_INFO_TASK);



    const handleAddTask = () => {
        setIsPopupOpen(true);
    };

    const handleCancel = () => {
        setIsPopupOpen(false);
        setSelectedForm(null);
    }

    const handleSaveTask = async (task: any) => {
        try {
            console.log("Saving task:", task);
    
            const { data } = await createTask({
                variables: {
                    input: {
                        name: task.name,
                        description: task.description,
                        valleyId: task.valley,
                        faenaId: task.faena,
                        statusId: 1,
                    },
                },
            });
    
            if (!data?.createTask?.id) {
                throw new Error("Task creation failed: ID is undefined.");
            }
    
            console.log("Task created successfully:", data.createTask.id);
    
            const { data: infoData } = await createInfoTask({
                variables: {
                    input: {
                        taskId: data.createTask.id,
                        originId: task.origin,
                        investmentId: task.investment,
                        typeId: task.type,
                        scopeId: task.scope,
                        interactionId: task.interaction,
                        riskId: task.risk,
                    },
                },
            });
    
            console.log("Info task created successfully:", infoData.createInfoTask);
        } catch (error) {
            console.error("Error saving task:", error);
        }
    
        setIsPopupOpen(false);
        setSelectedForm(null);
    };

    const handleOnTaskClick = (taskId: string) => {
        setSelectedTaskId((prev) => (prev === taskId ? null : taskId));
    };

    const toggleSidebar = () => {
        setIsSidebarOpen((prev) => !prev);
    };

    useEffect(() => {
        const fetchSubtasks = async () => {
            if (data?.infoTasks) {
                try {
                    const allSubtasks = await Promise.all(
                        data.infoTasks.map(async (infoTask: any) => {
                            const { data: subtaskData } = await getSubtasks({
                                variables: { id: infoTask.taskId },
                            });
                            return subtaskData?.taskSubtasks || []; 
                        })
                    );
    
                    const flattenedSubtasks = allSubtasks.flat();
    
                    setSubtasks(flattenedSubtasks);
                } catch (error) {
                    console.error("Error fetching subtasks:", error);
                }
            }
        };
    
        if (!loading && data?.infoTasks) {
            fetchSubtasks();
        }
    }, [data, loading, getSubtasks]);

    const getRemainingDays = (startDate: string, endDate: string) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffTime = Math.abs(end.getTime() - start.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    }

    const formatDate = (isoDate: string): string => {
        const date = new Date(isoDate);
    
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0"); 
        const day = String(date.getDate() +1 ).padStart(2, "0");
    
        return `${day}-${month}-${year}`; 
    };

    const tasksWithDetails = data?.infoTasks.map((task: any) => {
        const associatedSubtasks = subTasks.filter((subtask) => subtask.taskId === task.taskId);
    
        const totalBudget = associatedSubtasks.reduce((sum, subtask) => sum + (subtask.budget || 0), 0);
    
        const startDate = associatedSubtasks.length
            ? new Date(Math.min(...associatedSubtasks.map((subtask) => new Date(subtask.startDate).getTime())))
            : null;
    
        const endDate = associatedSubtasks.length
            ? new Date(Math.max(...associatedSubtasks.map((subtask) => new Date(subtask.endDate).getTime())))
            : null;
    
        const finishDate = associatedSubtasks.length
            ? new Date(Math.max(...associatedSubtasks.map((subtask) => new Date(subtask.finalDate).getTime())))
            : null;
    
        return {
            ...task,
            budget: totalBudget,
            startDate: startDate ? startDate.toISOString() : null,
            endDate: endDate ? endDate.toISOString() : null,
            finishDate: finishDate ? finishDate.toISOString() : null,
        };
    });

    const handleSeeInformation = async (taskId: string) => {
        try {
            const { data: infoData } = await getInfoTask({
                variables: { id: taskId },
            });
            if (infoData) {
                return infoData.infoTask;
            } else {
                console.warn("No data found for the given task ID:", taskId);
                return null;
            }
        }
        catch (error) {
            console.error("Error fetching task information:", error);
            return null;
        }
    };

    return {
        setTableOption,
        handleAddTask,
        handleSaveTask,
        handleOnTaskClick,
        toggleSidebar,
        createTask,
        getRemainingDays,
        setIsPopupOpen,
        setSelectedTaskId,
        setIsSidebarOpen,
        setSelectedForm,
        handleCancel,
        formatDate,
        handleSeeInformation,
        isPopupOpen,
        selectedTaskId,
        isSidebarOpen,
        tableOption,
        data,
        loading,
        error,
        subTasks,
        tasksWithDetails,
        selectedForm,
    };
};