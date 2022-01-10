/**
 * TODO:
 * - Get access to a form with multiple radio button elements to test
 * - Update state with the setFormData method
 */
import React from 'react'

function FormRadio({ element, setFormData }: any) {

  const updatedOptionList = (optionId: number) => [optionId]



  return (
    <div className="mb-4">
      <label className="text-base font-medium text-gray-900">{element.label}</label>
      {/* <p className="text-sm leading-5 text-gray-500">How do you prefer to receive notifications?</p> */}
      <fieldset className="mt-4">
        <legend className="sr-only">Radio button options for {element.label}</legend>
        <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
          {element.options.map((option: any) => (
            <div key={option.id} className="flex items-center">
              <input
                id={option.id}
                name={element.id}
                type="radio"
                defaultChecked={option.id === 1}
                className="focus:ring-violet-light h-4 w-4 text-violet border-gray-300"
                onChange={(e) => setFormData((prev: any) => ({ ...prev, [element.id]: {...element, option_ids: updatedOptionList(option.id)} }))}
              />
              <label htmlFor={option.id} className="ml-3 block text-sm font-medium text-gray-700">
                {option.name}
              </label>
            </div>
          ))}
        </div>
      </fieldset>
    </div>
  )
}

export default FormRadio;
