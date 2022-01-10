import React, { useEffect } from 'react';
import CheckEmailModal from './checkEmailModal';
import { LOCAL_STORAGE_SIGN_UP_INFO, updateUserInfo } from '../../utils';



const ProviderInfo: React.FC = () => {
    // const [image, setImage] = React.useState('');
    // const imageInput = React.useRef<HTMLInputElement>(null);
    const signUpInfo = JSON.parse(
        localStorage.getItem(LOCAL_STORAGE_SIGN_UP_INFO) || '{}'
    );
    const addressArray = signUpInfo.address?.split(';') || [];

    const [providerInfo, setProviderInfo] = React.useState({...signUpInfo, street: addressArray[0], city: addressArray[1], state: addressArray[2], zip: addressArray[3]});
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);

    useEffect(() => {
        localStorage.setItem(
            LOCAL_STORAGE_SIGN_UP_INFO,
            JSON.stringify({ ...providerInfo })
        );
    }, [providerInfo]);

    // const handleClickSelect = () => {
    //     if (imageInput.current) {
    //         imageInput.current.click();
    //     }
    // };

    // const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     if (event.target) {
    //         if (event.target.files && event.target.files[0]) {
    //             setImage(URL.createObjectURL(event.target.files[0]));
    //             console.log(image);
    //         }
    //     }
    // };

    const handleUserCreate = (e: React.SyntheticEvent) => {
        // TODO: LOADING INDICATOR
        e.preventDefault();
        (async () => {
            try {
              await updateUserInfo();
              window.location.href = '/';
            } catch (e) {
                alert(e);
            }
        })();
    };

    return (
        <div>
            <div className="max-w-7xl mx-auto px-4 pt-10 pb-10 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    <form
                        className="space-y-8 divide-y divide-gray-200"
                        onSubmit={handleUserCreate}
                    >
                        <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
                            <div>
                                <div>
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                                        Practice Information
                                    </h3>
                                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                        This information will be displayed
                                        publicly.
                                    </p>
                                </div>

                                <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                        <label
                                            htmlFor="practice_name"
                                            className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                                        >
                                            Practice Name
                                        </label>
                                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                                            <div className="max-w-lg flex rounded-md shadow-sm">
                                                <input
                                                    type="text"
                                                    name="practice_name"
                                                    id="practice_name"
                                                    autoComplete="practice_name"
                                                    className="flex-1 block w-full focus:ring-violet-light focus:border-violet-light min-w-0 rounded-md sm:text-sm border-gray-300"
                                                    value={
                                                        providerInfo.practice_name
                                                    }
                                                    onChange={(e) =>
                                                        setProviderInfo({
                                                            ...providerInfo,
                                                            practice_name:
                                                                e.target.value,
                                                        })
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                        <label
                                            htmlFor="specialty"
                                            className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                                        >
                                            Specialty
                                        </label>
                                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                                            <div className="max-w-lg flex rounded-md shadow-sm">
                                                <input
                                                    type="text"
                                                    name="specialty"
                                                    id="specialty"
                                                    autoComplete="specialty"
                                                    className="flex-1 block w-full focus:ring-violet-light focus:border-violet-light min-w-0 rounded-md sm:text-sm border-gray-300"
                                                    value={
                                                        providerInfo.specialty
                                                    }
                                                    onChange={(e) =>
                                                        setProviderInfo({
                                                            ...providerInfo,
                                                            specialty:
                                                                e.target.value,
                                                        })
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                        <label
                                            htmlFor="phone"
                                            className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                                        >
                                            Phone number
                                            <span
                                                className="text-violet-light font-bold"
                                                title="Required"
                                                aria-label="Required"
                                            >
                                                *
                                            </span>
                                        </label>
                                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                                            <input
                                                type="text"
                                                name="phone"
                                                id="phone"
                                                autoComplete="phone"
                                                className="max-w-lg block w-full shadow-sm focus:ring-violet-light focus:border-violet-light sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                                required
                                                value={providerInfo.phone}
                                                onChange={(e) =>
                                                    setProviderInfo({
                                                        ...providerInfo,
                                                        phone: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                        <label
                                            htmlFor="street-address"
                                            className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                                        >
                                            Street address
                                        </label>
                                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                                            <input
                                                type="text"
                                                name="street-address"
                                                id="street-address"
                                                autoComplete="street-address"
                                                className="block max-w-lg w-full shadow-sm focus:ring-violet-light focus:border-violet-light sm:text-sm border-gray-300 rounded-md"
                                                value={providerInfo.street || ''}
                                                onChange={(e) =>
                                                    setProviderInfo({
                                                        ...providerInfo,
                                                        street: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                        <label
                                            htmlFor="city"
                                            className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                                        >
                                            City
                                        </label>
                                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                                            <input
                                                type="text"
                                                name="city"
                                                id="city"
                                                autoComplete="address-level2"
                                                className="max-w-lg block w-full shadow-sm focus:ring-violet-light focus:border-violet-light sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                                value={providerInfo.city || ''}
                                                onChange={(e) =>
                                                    setProviderInfo({
                                                        ...providerInfo,
                                                        city: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                        <label
                                            htmlFor="state"
                                            className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                                        >
                                            State
                                        </label>
                                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                                            <input
                                                type="text"
                                                name="state"
                                                id="state"
                                                autoComplete="address-level1"
                                                className="max-w-lg block w-full shadow-sm focus:ring-violet-light focus:border-violet-light sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                                value={providerInfo.state || ''}
                                                onChange={(e) =>
                                                    setProviderInfo({
                                                        ...providerInfo,
                                                        state: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                        <label
                                            htmlFor="postal-code"
                                            className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                                        >
                                            ZIP / Postal code
                                        </label>
                                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                                            <input
                                                type="text"
                                                name="postal-code"
                                                id="postal-code"
                                                autoComplete="postal-code"
                                                className="max-w-lg block w-full shadow-sm focus:ring-violet-light focus:border-violet-light sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                                value={providerInfo.zip || ''}
                                                onChange={(e) =>
                                                    setProviderInfo({
                                                        ...providerInfo,
                                                        zip: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
                                <div>
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                                        Your Information
                                    </h3>
                                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                        A little bit about yourself.
                                    </p>
                                </div>
                                <div className="space-y-6 sm:space-y-5">
                                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                        <label
                                            htmlFor="first-name"
                                            className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                                        >
                                            First name
                                            <span
                                                className="text-violet-light font-bold"
                                                title="Required"
                                                aria-label="Required"
                                            >
                                                *
                                            </span>
                                        </label>
                                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                                            <input
                                                type="text"
                                                name="first-name"
                                                id="first-name"
                                                autoComplete="given-name"
                                                className="max-w-lg block w-full shadow-sm focus:ring-violet-light focus:border-violet-light sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                                required
                                                value={providerInfo.first_name}
                                                onChange={(e) =>
                                                    setProviderInfo({
                                                        ...providerInfo,
                                                        first_name:
                                                            e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                        <label
                                            htmlFor="last-name"
                                            className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                                        >
                                            Last name
                                            <span
                                                className="text-violet-light font-bold"
                                                title="Required"
                                                aria-label="Required"
                                            >
                                                *
                                            </span>
                                        </label>
                                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                                            <input
                                                type="text"
                                                name="last-name"
                                                id="last-name"
                                                autoComplete="family-name"
                                                className="max-w-lg block w-full shadow-sm focus:ring-violet-light focus:border-violet-light sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                                required
                                                value={providerInfo.last_name}
                                                onChange={(e) =>
                                                    setProviderInfo({
                                                        ...providerInfo,
                                                        last_name:
                                                            e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                        <label
                                            htmlFor="pronouns"
                                            className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                                        >
                                            Pronouns
                                            <span
                                                className="text-violet-light font-bold"
                                                title="Required"
                                                aria-label="Required"
                                            >
                                                *
                                            </span>
                                        </label>
                                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                                            <input
                                                type="text"
                                                name="pronouns"
                                                id="pronouns"
                                                autoComplete="family-name"
                                                className="max-w-lg block w-full shadow-sm focus:ring-violet-light focus:border-violet-light sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                                required
                                                value={providerInfo.pronouns}
                                                onChange={(e) =>
                                                    setProviderInfo({
                                                        ...providerInfo,
                                                        pronouns:
                                                            e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                    </div>

                                    {/* <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-center sm:border-t sm:border-gray-200 sm:pt-5">
                                        <label
                                            htmlFor="photo"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Photo
                                        </label>
                                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                                            <div className="flex items-center">
                                                <span className="h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                                                    {image && (
                                                        <img
                                                            src={image}
                                                            alt="Profile"
                                                        />
                                                    )}
                                                    {!image && (
                                                        <svg
                                                            className="h-full w-full text-gray-300"
                                                            fill="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                                        </svg>
                                                    )}
                                                </span>
                                                <button
                                                    type="button"
                                                    className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-light"
                                                    onClick={handleClickSelect}
                                                >
                                                    Change
                                                </button>
                                                <input
                                                    ref={imageInput}
                                                    style={{ display: 'none' }}
                                                    type="file"
                                                    accept=".png,.jpeg,.jpg,"
                                                    onChange={onImageChange}
                                                />
                                            </div>
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                        </div>

                        <div className="pt-5">
                            <div className="flex justify-end">
                                {/* <button
                                    type="button"
                                    className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-light"
                                >
                                    Cancel
                                </button> */}
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
            <CheckEmailModal
                setModalOpen={setModalOpen}
                modalOpen={modalOpen}
                modalType={'update'}
            />
        </div>
    );
};

export default ProviderInfo;
