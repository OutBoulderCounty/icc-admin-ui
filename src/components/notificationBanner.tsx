/* This example requires Tailwind CSS v2.0+ */
import { SpeakerphoneIcon } from '@heroicons/react/outline';

const NotificationBanner = () => {

    return (
        <div className="inset-x-0 pb-2 sm:pb-5">
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div className="p-2 rounded-lg bg-violet-light shadow-lg sm:p-3">
                    <div className="flex items-center justify-between flex-wrap">
                        <div className="w-0 flex-auto flex items-center">
                            <span className="flex p-2 rounded-lg bg-violet-dark">
                                <SpeakerphoneIcon
                                    className="h-6 w-6 text-white"
                                    aria-hidden="true"
                                />
                            </span>
                            <p className="ml-3 font-medium text-white truncate">
                                <span className="md:hidden">
                                    Saving form responses...
                                </span>
                                <span className="hidden md:inline">
                                    Thank you! Saving your form responses. Please wait...
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotificationBanner;
