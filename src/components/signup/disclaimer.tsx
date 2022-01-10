import React from 'react';
import Button from '../button';
import { LOCAL_STORAGE_SIGN_UP_INFO } from '../../utils'

interface SignUpProps {
  signUpStep: number;
  setSignUpStep: (step: number) => void;
}

const Disclaimer: React.FC<SignUpProps> = ({ signUpStep, setSignUpStep }) => {
  const signUpInfo = JSON.parse(localStorage.getItem(LOCAL_STORAGE_SIGN_UP_INFO) || '{}');
  const [checked, setChecked] = React.useState<boolean>(signUpInfo.disclaimer || false);

  const handleSubmitDisclaimer = () => {
    signUpInfo.agreement_accepted = checked;
    localStorage.setItem(LOCAL_STORAGE_SIGN_UP_INFO, JSON.stringify(signUpInfo));
    setSignUpStep(signUpStep + 1);
  };

    return (
        <div className="relative py-16 bg-white overflow-hidden">
            <div className="hidden lg:block lg:absolute lg:inset-y-0 lg:h-full lg:w-full">
                <div
                    className="relative h-full text-lg max-w-prose mx-auto"
                    aria-hidden="true"
                ></div>
            </div>
            <div className="relative px-4 sm:px-6 lg:px-8">
                <div className="text-base max-w-prose mx-auto">
                    <h1>
                        <span className="block text-base text-center text-violet-lightest font-semibold tracking-wide uppercase">
                            Disclaimer
                        </span>
                        <span className="mt-2 block text-3xl text-center leading-8 font-semibold tracking-tight text-gray-900 sm:text-4xl">
                            Understanding this resource
                        </span>
                    </h1>
                    <p className="mt-8 text-base text-gray-500 leading-8">
                        Before you begin your submission to Inclusive Care
                        Colorado, here is some information that will help set
                        you up for success. Your profile will save any progress
                        you make on your submission and you’re welcome to come
                        back at a later date to finish.
                    </p>
                </div>
                <div className="mt-6 text-base prose prose-violet prose-lg text-gray-500 mx-auto">
                    <p className='text-base'>
                        Our questionnaire is designed to provide our users with
                        a fully transparent view of the responses that you
                        input. <strong>Please be aware</strong> that all your
                        responses will be visible for all users once they are
                        approved.
                    </p>
                    <p>
                        None of the questions on this form are mandatory and
                        you’re able to submit the form to return later and fill
                        it out in its entirety. We encourage you to fill out as
                        much as you are able to before submitting your
                        questionnaire as blank answers may be perceived by users
                        as an answer.
                    </p>
                    <p>
                        Users will be able to see the date in which you filled
                        out your latest version of the questionnaire and you
                        will receive periodic emails advising you to adjust your
                        answers to best reflect your dedication to providing
                        safe and affirming care.
                    </p>
                    <p>
                        It is paramount that you answer honestly and
                        transparently. We ask providers about their competence
                        with different communities and realize that not every
                        provider has expertise across all identities. You are
                        not required to have expertise across all LGBTQ
                        identities in order to be listed in this directory.
                    </p>
                    <p>
                        This resource is for providers that are willing and able
                        to provide safe and affirming care to the LGBTQ
                        communities. <strong>Please note</strong> that being
                        willing to provide care does not mean that you’re able
                        to provide the competent care needed. It’s advised you
                        have completed training with reputable providers.
                    </p>
                    <p>
                        Here are some things you can have on hand to speed up
                        the process of your submission.
                    </p>
                    <ul>
                        <li>
                            Copies of your paperwork - anything a patient might
                            need to sign or view.
                        </li>
                        <li>
                            Information about the training you and your staff
                            have received.
                        </li>
                        <li>A head shot.</li>
                    </ul>

                    <p>
                        You can follow this <a href='https://develop.inclusivecareco.org/glossary' target="blank">link</a> to find a
                        glossary of terms that we use throughout our
                        questionnaire.
                    </p>
                    {/* <p>
                    You can follow this link [link to resources] to find resources on providers for training in these areas. (Please be patient as we build our training resources out over time and please let us know if you’d like to submit a reputable provider)
                    </p> */}
                    <p id="comments-description" className="text-gray-500">
                        Please acknowledge here that you understand this
                        resource is solely designed to ease the stress on LGBTQ+
                        people searching for healthcare providers.
                    </p>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-3xl mx-auto flex justify-between">
                            <Checkbox setChecked={setChecked} checked={checked} />
                            <Button className="disabled:opacity-50 disabled:cursor-not-allowed" color="violet" disabled={!checked} onClick={handleSubmitDisclaimer}>Continue</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

type Props = {
  checked: boolean;
  setChecked: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Checkbox:React.FC<Props> = ({checked, setChecked}: Props) => {
    return (
        <fieldset className="space-y-5">
            <legend className="sr-only">Notifications</legend>
            <div className="relative flex items-start">
                <div className="flex items-center h-5">
                    <input
                        id="comments"
                        aria-describedby="comments-description"
                        name="comments"
                        type="checkbox"
                        checked={checked}
                        onChange={() => setChecked(prev => !prev)}
                        className="focus:ring-violet-light h-4 w-4 text-violet border-gray-300 rounded"
                    />
                </div>
                <div className="ml-3 text-sm">
                    <label
                        htmlFor="comments"
                        className="font-medium text-gray-700"
                    >
                        Acknowledged
                    </label>
                </div>
            </div>
        </fieldset>
    );
}

export default Disclaimer;
