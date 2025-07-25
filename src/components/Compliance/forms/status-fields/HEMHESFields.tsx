import { IDocumentList } from "@/app/models/IDocuments";
import DocumentPreview from "./DocumentsPreview";
import { ComplianceFormState, IComplianceMemo, IComplianceSolped } from "@/app/models/ICompliance";
import { FileText } from "lucide-react";

interface HemHesFieldsProps {
    formState: ComplianceFormState;
    cartaData?: IDocumentList;
    minutaData?: IDocumentList;
    memoData?: IComplianceMemo;
    solpedData?: IComplianceSolped; 
    handleInputChange: (field: keyof ComplianceFormState, value: boolean | string) => void;
}

export default function HemHesFields({ 
    formState, 
    cartaData, 
    minutaData, 
    memoData,
    solpedData,
    handleInputChange 
}: HemHesFieldsProps) {
    return (
        <div className="bg-gray-50 p-4 rounded-md border border-gray-200 mb-4">
            <h3 className="text-sm font-semibold text-gray-600 mb-3 flex items-center">
                <FileText className="h-4 w-4 mr-2" />
                HEM / HES
            </h3>
            <DocumentPreview 
                cartaData={cartaData} 
                minutaData={minutaData} 
                formState={{
                    ...formState,
                    hasMemo: formState.hasMemo ?? false,
                    hasHem: formState.hasHem ?? false,
                    hasHes: formState.hasHes ?? false,
                    hasSolped: formState.hasSolped ?? false
                }} 
                memoData={memoData} 
                solpedData={solpedData}
            />
            <div className="mb-4 mt-2 p-3 bg-gray-100 rounded-md">
                <h4 className="text-xs font-medium mb-2 text-gray-700">Registros</h4>
                <div className="flex space-x-4 mb-3">
                    <label className="inline-flex items-center">
                        <input
                            type="checkbox"
                            checked={formState.hasHem}
                            onChange={() => {
                                handleInputChange('hasHem', true);
                                handleInputChange('hasHes', false);
                            }}
                            className="form-checkbox h-4 w-4"
                        />
                        <span className="ml-2 text-xs">HEM</span>
                    </label>
                    <label className="inline-flex items-center">
                        <input
                            type="checkbox"
                            checked={formState.hasHes}
                            onChange={() => {
                                handleInputChange('hasHes', true);
                                handleInputChange('hasHem', false);
                            }}
                            className="form-checkbox h-4 w-4"
                        />
                        <span className="ml-2 text-xs">HES</span>
                    </label>
                </div>
                {(formState.hasHem || formState.hasHes) && (
                    <div className="mb-3">
                        <label className="block text-xs font-medium mb-1">
                            Número de {formState.hasHem ? "HEM" : "HES"}
                        </label>
                        <div className="flex items-center">
                            <input
                                type="number"
                                min={0}
                                value={formState.hesHemSap || ''}
                                onChange={(e) => handleInputChange('hesHemSap', e.target.value)}
                                className="w-full border rounded px-3 py-2 text-xs"
                                placeholder="Ingrese el número asociado a SAP"
                            />
                        </div>
                    </div>
                )}
                <div>
                    <label className="block text-xs font-medium mb-1">Proveedor</label>
                    <input
                        type="text"
                        value={formState.provider || ''}
                        onChange={(e) => handleInputChange('provider', e.target.value)}
                        className="w-full border rounded px-3 py-2 text-xs"
                        placeholder="Nombre del proveedor"
                    />
                </div>
            </div>
        </div>
    );
}