export interface Patient {
    id: string;
    firstName: string;
    lastName: string;
    gender: string;
    allergies?: string;
    height?: string;
    weight?: number;
    lastIncome?: string;
    lastSubject?: string;
    bloodGroup?: number;
    socialNumber?: string;
    notes?: string;
    documents?: Array<{
        name: string,
        extension: string,
        uploadAt: string
    }>;
    treatments?: Array<{
        drug: number,
        repeat: number,
        duration: number,
    }>;
}
