'use client';
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import LoadingSpinner from "@/components/LoadingSpinner";
import TasksTable from "./components/Table/TasksTable";
import { usePlanification } from "./hooks/usePlanification";
import { useHooks } from "../hooks/useHooks";


export default function Planification() {
    const {
        toggleSidebar,
        loading,
        subTasks,
        isSidebarOpen,
        detailedTasks,
        taskState,         
        handleFilterClick, 
        activeFilter,      
    } = usePlanification();

    const { userRole } = useHooks();

    return (
        <div className="overflow-x-hidden">
            <Header toggleSidebar={toggleSidebar} isOpen={isSidebarOpen} data-test-id="header" />
            {loading ? (
                <div className="flex items-center justify-center" data-test-id="loading-spinner">
                    <LoadingSpinner />
                </div>
            ) : (
                <>
                    <div
                        className={`grid h-screen overflow-hidden ${
                            isSidebarOpen ? "grid-cols-[220px_1fr]" : "grid-cols-1"
                        }`}
                        style={{ height: "calc(100vh - 5rem)" }}
                    >
                        {isSidebarOpen && (
                            <aside
                                className={`border-r h-full ${
                                    isSidebarOpen
                                        ? "fixed top-[5rem] left-0 w-full h-[calc(100vh-5rem)] bg-white z-2000 sm:top-0 sm:left-0 sm:w-[220px] sm:relative sm:h-auto sm:bg-transparent"
                                        : ""
                                }`}
                                data-test-id="sidebar"
                            >
                                <Sidebar userRole={userRole} onNavClick={toggleSidebar} />
                            </aside>
                        )}
                        <main className="p-4 h-full overflow-y-auto bg-gray-50 font-[Helvetica]">
                            <div className="flex flex-col gap-4">
                                <h1 className="text-2xl font-bold">Planificación</h1>
                                <div className="">
                                    <div className="flex-1">
                                        <div className="bg-white rounded-lg shadow-md p-4">
                                            <TasksTable
                                                tasks={detailedTasks}
                                                subtasks={subTasks}
                                                taskStates={taskState}
                                                onFilterClick={handleFilterClick}
                                                activeFilter={activeFilter}
                                                data-test-id="tasks-table"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </>
            )}
        </div>
    );
}