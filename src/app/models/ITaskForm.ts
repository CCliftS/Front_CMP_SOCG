export interface TaskInitialValues {
    name?: string;
    description?: string;
    origin?: number;
    investment?: number;
    type?: number;
    scope?: number;
    interaction?: number;
    priority?: number;
    state?: number;
    budget?: number;
    expenses?: number;
    startDate?: string;
    endDate?: string;
    risk?: number;
    finishDate?: string;
    faena?: number;
    beneficiary?: string;
    compliance?: boolean; 
}

export interface TaskDetails {
    id?: string;
    name?: string;
    description?: string;
    origin?: number;
    investment?: number;
    type?: number;
    scope?: number;
    interaction?: number;
    priority?: number;
    state?: number;
    budget?: number;
    expenses?: number;
    startDate?: string;
    endDate?: string;
    risk?: number;
    finishDate?: string;
    faenaId?: string | null;
    beneficiary?: number;
}

export interface Task {
    id?: string;
    name?: string;
    description?: string;
    origin?: number;
    compliance?: boolean;
    investment?: number;
    type?: number;
    scope?: number;
    interaction?: number;
    priority?: number;
    state?: number;
    budget?: number;
    expenses?: number;
    startDate?: string;
    endDate?: string;
    risk?: number;
    finishDate?: string;
    faena?: string | null;
    valley?: string | null;
    process?: string | null;
    beneficiary?: number;
}