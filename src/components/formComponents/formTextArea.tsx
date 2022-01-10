import React from 'react';

function FormTextArea({ element, setFormData }: any) {
    return (
        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
            <label
                htmlFor={element.id}
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
                {element.label}
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
                <textarea
                    rows={3}
                    id={element.id}
                    className="max-w-lg shadow-sm block w-full focus:ring-violet-light focus:border-violet-light sm:text-sm border border-gray-300 rounded-md"
                    value={element.value || ''}
                    onChange={(e) => setFormData((prev: any) => ({ ...prev, [element.id]: {...element, value: e.target.value} }))}
                />
            </div>
        </div>
    );
}

export default FormTextArea;
