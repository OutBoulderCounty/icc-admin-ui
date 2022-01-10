import React from 'react';

interface Props {
  signUpStep: number;
  setSignUpStep: (step: number) => void;
}

const steps = [
    { id: 1, name: 'About this resource' },
    { id: 2, name: 'Provider information' },
];

const StepTracker: React.FC<Props> = ({ signUpStep, setSignUpStep }) => {

    const handleChangeStep = (step: number) => {
        setSignUpStep(step);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
            <div className="max-w-3xl mx-auto">
                <nav aria-label="Progress">
                    <ol className="space-y-4 md:flex md:space-y-0 md:space-x-8">
                        {steps.map((step) => (
                            <li key={step.name} className="md:flex-1">
                                {step.id < signUpStep ? (
                                    <div
                                        onClick={() =>
                                            handleChangeStep(step.id)
                                        }
                                        className="cursor-pointer group pl-4 py-2 flex flex-col border-l-4 border-violet hover:border-violet-dark md:pl-0 md:pt-4 md:pb-0 md:border-l-0 md:border-t-4"
                                    >
                                        <span className="text-xs text-violet font-semibold tracking-wide uppercase group-hover:text-violet-dark">
                                            {step.id}
                                        </span>
                                        <span className="text-sm font-medium">
                                            {step.name}
                                        </span>
                                    </div>
                                ) : step.id === signUpStep ? (
                                    <div
                                        onClick={() =>
                                            handleChangeStep(step.id)
                                        }
                                        className="pl-4 py-2 flex flex-col border-l-4 border-violet md:pl-0 md:pt-4 md:pb-0 md:border-l-0 md:border-t-4"
                                        aria-current="step"
                                    >
                                        <span className="text-xs text-violet font-semibold tracking-wide uppercase">
                                            {step.id}
                                        </span>
                                        <span className="text-sm font-medium">
                                            {step.name}
                                        </span>
                                    </div>
                                ) : (
                                    <div className="group pl-4 py-2 flex flex-col border-l-4 border-gray-200 md:pl-0 md:pt-4 md:pb-0 md:border-l-0 md:border-t-4">
                                        <span className="text-xs text-gray-500 font-semibold tracking-wide uppercase">
                                            {step.id}
                                        </span>
                                        <span className="text-sm font-medium">
                                            {step.name}
                                        </span>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ol>
                </nav>
            </div>
        </div>
    );
};

export default StepTracker;
