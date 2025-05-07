import { Button } from "@/components/ui/button";
import { useValleyTaskForm } from "../hooks/useValleyTaskForm";

interface ValleySubtaskFormProps {
    onSave: any; // TODO: Define the type for the task object
    onCancel: () => void;
    isEditing?: boolean;
    valley: string;
}

export default function ValleySubtaskForm({ onSave, onCancel, isEditing, valley }: ValleySubtaskFormProps) {
    const {
        subtaskFormState,
        handleSubtaskInputChange,
        handleSaveSubtask,
    } = useValleyTaskForm(onSave, valley);

    return (
        <div data-test-id="subtask-form">
            <div className="mb-4 truncate">
                <label className="block text-sm font-medium mb-1">Nombre</label>
                <input
                    type="text"
                    value={subtaskFormState.name}
                    onChange={(e) => handleSubtaskInputChange("name", e.target.value)}
                    className="w-full border rounded px-3 py-2"
                    data-test-id="subtask-title-input"
                />
            </div>
            <div className="mb-4 truncate">
                <label className="block text-sm font-medium mb-1">Número</label>
                <input
                    type="number"
                    value={subtaskFormState.number}
                    onChange={(e) => handleSubtaskInputChange("number", e.target.value)}
                    className="w-full border rounded px-3 py-2"
                    data-test-id="subtask-number-input"
                />
            </div>
            <div className="mb-4 truncate">
                <label className="block text-sm font-medium mb-1">Descripción</label>
                <input
                    type="text"
                    value={subtaskFormState.description}
                    onChange={(e) => handleSubtaskInputChange("description", e.target.value)}
                    className="w-full border rounded px-3 py-2"
                    data-test-id="subtask-description-input"
                />
            </div>
            <div className="mb-4 truncate">
                <label className="block text-sm font-medium mb-1">Presupuesto</label>
                <input
                    type="number"
                    value={subtaskFormState.budget}
                    onChange={(e) => handleSubtaskInputChange("budget", e.target.value)}
                    className="w-full border rounded px-3 py-2"
                    data-test-id="subtask-budget-input"
                />
            </div>
            {/*TODO: CAMBIAR POR DROPDOWN*/}

            {/* <div className="mb-4 truncate">                                                                 
                <label className="block text-sm font-medium mb-1">Beneficiario</label>
                <input
                    type="text"
                    value={subtaskFormState.beneficiary}
                    onChange={(e) => handleSubtaskInputChange("beneficiary", e.target.value)}
                    className="w-full border rounded px-3 py-2"
                    data-test-id="subtask-beneficiary-input"
                />
            </div> */}

            <div className="mb-4 truncate">
                <label className="block text-sm font-medium mb-1">Fecha de Inicio</label>
                <input
                    type="date"
                    value={subtaskFormState.startDate}
                    onChange={(e) => handleSubtaskInputChange("startDate", e.target.value)}
                    className="w-full border rounded px-3 py-2"
                    data-test-id="subtask-start-date-input"
                />
            </div>
            <div className="mb-4 truncate">
                <label className="block text-sm font-medium mb-1">Fecha de Término</label>
                <input
                    type="date"
                    value={subtaskFormState.endDate}
                    onChange={(e) => handleSubtaskInputChange("endDate", e.target.value)}
                    className="w-full border rounded px-3 py-2"
                    data-test-id="subtask-end-date-input"
                />
            </div>
            {isEditing && (
            <>
            <div className="mb-4 truncate">
                <label className="block text-sm font-medium mb-1">Fecha de Finalización</label>
                <input
                    type="date"
                    value={subtaskFormState.finishDate}
                    onChange={(e) => handleSubtaskInputChange("finishDate", e.target.value)}
                    className="w-full border rounded px-3 py-2"
                    data-test-id="subtask-finish-date-input"
                />
            </div>
            <div className="mb-4 truncate">
                <label className="block text-sm font-medium mb-1">Gastos</label>
                <input
                    type="number"
                    value={subtaskFormState.expenses}
                    onChange={(e) => handleSubtaskInputChange("expenses", e.target.value)}
                    className="w-full border rounded px-3 py-2"
                    data-test-id="subtask-expense-input"
                />
            </div>
            <div className="mb-4 truncate">                                                  {/*TODO: CAMBIAR POR DROPDOWN*/}
                <label className="block text-sm font-medium mb-1">Estado</label>
                <input
                    type="number"
                    value={subtaskFormState.state}
                    onChange={(e) => handleSubtaskInputChange("state", e.target.value)}
                    className="w-full border rounded px-3 py-2"
                    data-test-id="subtask-state-input"
                />
            </div>
            </>
            )}
            <div className="mb-4 truncate">
                <label className="block text-sm font-medium mb-1">Prioridad</label>        {/*TODO: CAMBIAR POR DROPDOWN*/}
                <input
                    type="number"
                    value={subtaskFormState.priority}
                    onChange={(e) => handleSubtaskInputChange("priority", e.target.value)}
                    className="w-full border rounded px-3 py-2"
                    data-test-id="subtask-priority-input"
                />
            </div>
            <div className="flex justify-end space-x-2">
                <Button
                    variant="secondary"
                    onClick={onCancel}
                    className="bg-gray-200 hover:bg-gray-300 cursor-pointer"
                    data-test-id="cancel-button"
                >
                Cancelar
                </Button>
                <Button
                    variant="default"
                    onClick={handleSaveSubtask}
                    className="bg-[#0d4384] hover:bg-[#112339] text-white disabled:bg-[#747474c6]"
                    disabled={!subtaskFormState.name || !subtaskFormState.budget || !subtaskFormState.endDate || !subtaskFormState.startDate || !subtaskFormState. priority}
                    data-test-id="save-button"
                >
                Guardar
                </Button>
            </div>
        </div>
    );
}