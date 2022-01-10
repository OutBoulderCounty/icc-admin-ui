import React, { useEffect } from 'react';
import Disclaimer from './disclaimer';
import ProviderInfo from './providerInfo';
import StepTracker from './steps';

const SignUpProcess: React.FC = () => {
    const [signUpStep, setSignUpStep] = React.useState(1);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    return (
        <div>
            <StepTracker
                signUpStep={signUpStep}
                setSignUpStep={setSignUpStep}
            />

            {signUpStep === 1 && (
                <Disclaimer
                    signUpStep={signUpStep}
                    setSignUpStep={setSignUpStep}
                />
            )}
            {signUpStep === 2 && <ProviderInfo />}
        </div>
    );
};

export default SignUpProcess;
