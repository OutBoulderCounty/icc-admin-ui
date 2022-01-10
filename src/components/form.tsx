/**
 * TODO:
 * - [X] Cancel button functionality
 * - [ ] Utilize 'required' key on form elements
 * - [ ] Utilize 'position' key on form elements
 * - [ ]
 * - [ ]
 */

import React, { useEffect } from 'react';
import FormHeader from './formComponents/formHeader';
import FormTextArea from './formComponents/formTextArea';
import FormRadio from './formComponents/formRadio';
import FormText from './formComponents/formText';
import FormCheckboxes from './formComponents/formCheckboxes';
import FormNumber from './formComponents/formNumber';
import { saveForm, requiredInfoCheck } from '../utils';

const Form: React.FC<any> = ({ form, setIsLoading }) => {
    const [formData, setFormData] = React.useState(
        Object.fromEntries(
            form.elements.map((element: any) => [element.id, element])
        )
    );
    const [header, setHeader] = React.useState({ noData: true });


    useEffect(() => {
        localStorage.setItem('form' + form.name, JSON.stringify(formData));
    }, [formData, form.name]);

    if (form.elements[0].type === 'Header' && header.noData) {
        setHeader(form.elements[0]);
    }

    useEffect(() => {
        requiredInfoCheck();
    })


    const handleFormSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        (async () => {
            setIsLoading(true);
            try {
                await saveForm(Object.values(formData));
                window.location.href = '/forms';
            } catch (e) {
                alert(e);
            }
        })();
    };

    const handleCancelClick = (e: React.SyntheticEvent) => {
        e.preventDefault();
        window.location.href = '/forms';
    };

    return (
        <div className="max-w-7xl mx-auto px-4 pt-10 pb-10 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <form
                    className="space-y-8 divide-y divide-gray-200"
                    onSubmit={handleFormSubmit}
                >
                    <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
                        <div>
                            <FormHeader header={header} name={form.name} />
                            <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                                {Object.values(formData).map((element: any) => {
                                    if (element.type === 'Text Area') {
                                        return (
                                            <FormTextArea
                                                key={element.id}
                                                name={form.name}
                                                element={element}
                                                setFormData={setFormData}
                                            />
                                        );
                                    } else if (
                                        element.type === 'Radio Buttons'
                                    ) {
                                        return (
                                            <FormRadio
                                                key={element.id}
                                                name={form.name}
                                                element={element}
                                                setFormData={setFormData}
                                            />
                                        );
                                    } else if (element.type === 'Text') {
                                        return (
                                            <FormText
                                                key={element.id}
                                                name={form.name}
                                                element={element}
                                                setFormData={setFormData}
                                            />
                                        );
                                    } else if (element.type === 'Checkboxes') {
                                        return (
                                            <FormCheckboxes
                                                key={element.id}
                                                name={form.name}
                                                element={element}
                                                setFormData={setFormData}
                                            />
                                        );
                                    } else if (element.type === 'Number') {
                                        return (
                                            <FormNumber
                                                key={element.id}
                                                name={form.name}
                                                element={element}
                                                setFormData={setFormData}
                                            />
                                        );
                                    }
                                    return (
                                        <h1 key={element.id}>
                                            {element.type !== 'Header'
                                                ? 'ERROR!!!!!!  ' + element.type
                                                : ''}
                                        </h1>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="pt-5">
                        <div className="flex justify-end">
                            <button
                                type="button"
                                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-light"
                                onClick={handleCancelClick}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-violet hover:bg-violet-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-light"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Form;
