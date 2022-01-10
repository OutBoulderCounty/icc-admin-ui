import React from 'react';

import { Disclosure } from '@headlessui/react';
import {
    HomeIcon,
    MenuIcon,
    ClipboardIcon,
    LoginIcon,
    XIcon,
} from '@heroicons/react/outline';
import { Link } from 'react-router-dom';
import { useLocation, LinkProps } from 'react-router-dom';

import Button from './button';

import AuthConsumer from '../context/authContext';

type IconProps = {
    className?: string;
};

type navItem = {
    name: string;
    path: string;
    Icon: React.FC<IconProps>;
    className?: string;
    Link: React.FC<LinkProps>;
};

const navigationLoggedIn: navItem[] = [
    { name: 'Dashboard', path: '/', Icon: HomeIcon, Link },
    {
        name: 'Forms',
        path: '/forms',
        Icon: ClipboardIcon,
        Link,
    },
    { name: 'Update Account', path: '/account-update', Icon: HomeIcon, Link },
];

const navigationLoggedOut: navItem[] = [
    {
        name: 'Login / Signup',
        path: '/login',
        Icon: LoginIcon,
        Link,
    },
];

const NavItem: React.FC<navItem> = (item) => {
    const location = useLocation();
    const current = [window.location.pathname, location.pathname].includes(
        item.path
    );
    return (
        <item.Link
            to={item.path}
            className={`font-medium text-sm ${item.className} ${
                current
                    ? 'border-violet text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            }`}
        >
            <item.Icon className="mr-4 flex-shrink-0 h-6 w-6" />
            {item.name}
        </item.Link>
    );
};

const NavBar: React.FC = () => {
    const { authed, logout } = AuthConsumer();

    const loggedIn = authed;
    const items = loggedIn ? navigationLoggedIn : navigationLoggedOut;

    return (
        <Disclosure as="nav" className="bg-white shadow max-h-max">
            {({ open }) => (
                <>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            <div className="flex">
                                <div className="-ml-2 mr-2 flex items-center md:hidden">
                                    {/* Mobile menu button */}
                                    <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-violet-light">
                                        <span className="sr-only">
                                            Open main menu
                                        </span>
                                        {open ? (
                                            <XIcon
                                                className="block h-6 w-6"
                                                aria-hidden="true"
                                            />
                                        ) : (
                                            <MenuIcon
                                                className="block h-6 w-6"
                                                aria-hidden="true"
                                            />
                                        )}
                                    </Disclosure.Button>
                                </div>
                                <div className="flex-shrink-0 flex items-center">
                                    {/* TODO: update link with url for icc-ui page */}
                                    <a href="https://develop.inclusivecareco.org">
                                        <img
                                            className="hidden md:block h-8 w-auto"
                                            src="/color-horizontal1x.png"
                                            alt="Home Icon"
                                        />
                                    </a>
                                </div>
                                <div className="hidden md:ml-6 md:flex md:space-x-8">
                                    {items.map((item) => (
                                        <NavItem
                                            name={item.name}
                                            path={item.path}
                                            Icon={item.Icon}
                                            key={item.name}
                                            className="inline-flex items-center px-1 pt-1 border-b-2"
                                            Link={item.Link}
                                        />
                                    ))}
                                </div>
                            </div>
                            {loggedIn && (
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <Button
                                            color="violet"
                                            onClick={() => logout()}
                                        >
                                            Logout
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <Disclosure.Panel className="md:hidden border-t-2">
                        <div className="pt-2 pb-3 space-y-1">
                            {items.map((item) => (
                                <NavItem
                                    name={item.name}
                                    path={item.path}
                                    Icon={item.Icon}
                                    key={item.name}
                                    className="pl-3 pr-4 py-2 border-l-4 flex"
                                    Link={item.Link}
                                />
                            ))}
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    );
};

export type { navItem };
export default NavBar;
