import { useState, useEffect, useCallback, useMemo } from "react";
import { HuascoValley, CopiapoValley, ElquiValley } from "@/constants/faenas";
import { taskOrigin, taskType, taskScope, taskInteraction, taskState, taskRisk, taskInvestment } from "@/constants/infoTasks";
import { Valleys } from "@/constants/valleys";

interface InitialValues {
    name?: string;
    description?: string;
    origin?: string;
    investment?: string;
    type?: string;
    scope?: string;
    interaction?: string;
    priority?: string;
    state?: string;
    budget?: string;
    expenses?: string;
    startDate?: string;
    endDate?: string;
    risk?: string;
    finishDate?: string;
    faena?: string;
}

export const useValleyTaskForm = (onSave: (task: any) => void, valley:string, initialValues?: InitialValues) => {
    const [formState, setFormState] = useState({
        name: initialValues?.name || "",
        description: initialValues?.description || "",
        origin: initialValues?.origin || "",
        investment: initialValues?.investment || "",
        type: initialValues?.type || "",
        scope: initialValues?.scope || "",
        interaction: initialValues?.interaction || "",
        priority: initialValues?.priority || "",
        state: initialValues?.state || "",
        budget: initialValues?.budget || "",
        expenses: initialValues?.expenses || "",
        startDate: initialValues?.startDate || "",
        endDate: initialValues?.endDate || "",
        finishDate: initialValues?.finishDate || "",
        risk: initialValues?.risk || "",
        faena: initialValues?.faena || "",
    });

    const [faenas, setFaenas] = useState<string[]>([]);

    const handleInputChange = useCallback((field: string, value: string) => {
        setFormState((prev) => ({ ...prev, [field]: value }));
    }, []);

    const handleSave = useCallback(() => {
        const taskDetails = {
            ...formState,
            valley: Valleys.findIndex((v) => v === valley) + 1,
            faena: faenas.findIndex((f) => f === formState.faena) + 1,
            risk: taskRisk.findIndex((r) => r === formState.risk) + 1,
            state: taskState.findIndex((s) => s === formState.state) + 1,
            interaction: taskInteraction.findIndex((i) => i === formState.interaction) + 1,
            scope: taskScope.findIndex((s) => s === formState.scope) + 1,
            type: taskType.findIndex((t) => t === formState.type) + 1,
            origin: taskOrigin.findIndex((o) => o === formState.origin) + 1,
            investment: taskInvestment.findIndex((i) => i === formState.investment) + 1,
        };
        onSave(taskDetails);
        setFormState({
            name: "",
            description: "",
            origin: "",
            investment: "",
            type: "",
            scope: "",
            interaction: "",
            priority: "",
            state: "",
            budget: "",
            expenses: "",
            startDate: "",
            endDate: "",
            finishDate: "",
            risk: "",
            faena: "",
        });
        setFaenas([]);
    }, [formState, onSave]);

    const handleValleySelect = useCallback((valley: string) => {
        switch (valley) {
            case "Valle de Copiapó":
                setFaenas(CopiapoValley);
                break;
            case "Valle del Huasco":
                setFaenas(HuascoValley);
                break;
            case "Valle del Elqui":
                setFaenas(ElquiValley);
                break;
            case "Transversal":
                setFaenas(["Transversal"]);
                break;
            default:
                setFaenas([]);
                break;
        }
    }, []);

    useEffect(() => {
        handleValleySelect(valley);
    },[valley]);


    const dropdownItems = useMemo(() => ({
        origin: taskOrigin,
        type: taskType,
        scope: taskScope,
        interaction: taskInteraction,
        state: taskState,
        risk : taskRisk,
        investment: taskInvestment
    }), []);

    return {
        formState,
        faenas,
        dropdownItems,
        handleInputChange,
        handleSave,
    };
};