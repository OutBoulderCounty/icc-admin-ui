import React from 'react';

const FormNumber = ({ element, setFormData }: any) => {
  return (
    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
        <label
            htmlFor={element.id}
            className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
        >
            {element.label}
        </label>
        <div className="mt-1 sm:mt-0 sm:col-span-2">
            <div className="max-w-lg flex rounded-md shadow-sm">
                <input
                    type="number"
                    id={element.id}
                    className="flex-1 block w-full focus:ring-violet-light focus:border-violet-light min-w-0 rounded-md sm:text-sm border-gray-300"
                    value={element.value || ''}
                    onChange={(e) => setFormData((prev: any) => ({ ...prev, [element.id]: {...element, value: e.target.value} }))}
                />
            </div>
        </div>
    </div>
);
};

export default FormNumber;
