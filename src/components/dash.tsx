/**
 * TODO:
 * - [ ] Show current account status (approved, waiting approval)
 * - [ ] Show current account info for logged in user
 */

import React from 'react';
import { Dialog, Transition } from "@headlessui/react"
import {XIcon} from "@heroicons/react/outline"

const Home: React.FC = () => {
  return (
    <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          {/* Replace with your content */}
          <div className="py-4">
            <div className="border-4 border-dashed border-gray-200 rounded-lg h-96" />
          </div>
          {/* /End replace */}
        </div>
      </div>
    </main>
  )
}

const Dashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  // const [userIsAdmin] = React.useState(true);

  // if (userIsAdmin) {
    return (
      <div className="flex flex-grow bg-gray-100">
        <Transition.Root show={sidebarOpen} as={React.Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 flex z-40 md:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={React.Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>
            <Transition.Child
              as={React.Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div className="relative flex-1 flex flex-col max-w-xs w-full bg-gray-800">
                <Transition.Child
                  as={React.Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                  <div className="flex-shrink-0 flex items-center px-4">
                    <img
                      className="h-8 w-auto"
                      src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
                      alt="Workflow"
                    />
                  </div>
                </div>
              </div>
            </Transition.Child>
            <div className="flex-shrink-0 w-14">
              {/* Force sidebar to shrink to fit close icon */}
            </div>
          </Dialog>
        </Transition.Root>

        <div className="flex flex-col w-0 flex-1">
            <Home />
        </div>
      </div>
    )
  // }

  // const logoutFn = () => {
  //   console.log("should be logging out now")
  //   // TODO: logout
  //   return null
  // }

  // return (
  //   <>
  //     <Error message="User is not allowed to access the admin dashboard" />
  //     <div className="mx-auto max-w-lg">
  //       <div className="justify-around flex">
  //         <a href={process.env.REACT_APP_ICC_URL}>
  //           <Button color="violet">Go home</Button>
  //         </a>
  //         <Button color="violet" onClick={logoutFn}>
  //           Logout
  //         </Button>
  //       </div>
  //     </div>
  //   </>
  // )
}

export default Dashboard;
