import React, { useState } from "react";
import {
    FiBarChart,
    FiChevronsRight,
    FiDollarSign,
    FiGrid,
    FiBox,
    FiUser,
    FiUserPlus,
    FiSettings,
} from "react-icons/fi";

import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

const navItems = [
    { title: "Features", icon: FiGrid, path: "/home" },
    { title: "Create Invoice", icon: FiDollarSign, path: "/invoice" },
    { title: "Customer Registration", icon: FiUserPlus, path: "/customer-reg" },
    { title: "Customer Profile", icon: FiUser, path: "/customer-profile" },
    { title: "Inventory", icon: FiBox, path: "/inventory" },
    { title: "Profile", icon: FiSettings, path: "/profile" },
];


const Navbar = () => {
    const [open, setOpen] = useState(true);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();

    return (
        <>
            {/* Desktop Sidebar */}
            <motion.nav
                layout
                className="sticky top-0 hidden h-screen shrink-0 border-r border-slate-300 bg-white p-2 sm:block"
                style={{
                    width: open ? "225px" : "fit-content",
                }}
            >
                <TitleSection open={open} />
                <div className="space-y-1">
                    {navItems.map(({ icon: Icon, title, path }) => (
                        <Link to={path} key={title}>
                            <motion.div
                                layout
                                className={`relative flex h-10 w-full items-center rounded-md transition-colors ${location.pathname === path
                                    ? "bg-gray-200 text-black"
                                    : "text-slate-600 hover:bg-slate-100"
                                    }`}
                            >
                                <motion.div
                                    layout
                                    className="grid h-full w-10 place-content-center text-lg"
                                >
                                    <Icon />
                                </motion.div>
                                {open && (
                                    <motion.span
                                        layout
                                        initial={{ opacity: 0, y: 12 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.125 }}
                                        className="text-xs font-medium"
                                    >
                                        {title}
                                    </motion.span>
                                )}
                            </motion.div>
                        </Link>
                    ))}
                </div>
                <ToggleClose open={open} setOpen={setOpen} />
            </motion.nav>

            {/* Mobile Floating Logo */}
            <div className="sm:hidden fixed top-2 left-2 z-50">
                <div
                    onClick={() => setMobileMenuOpen((prev) => !prev)}
                    className="cursor-pointer"
                >
                    <Logo />
                </div>
            </div>

            {/* Mobile Dropdown Menu with Transition */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                            duration: 0.3,
                            ease: "easeInOut",
                        }}
                        className="sm:hidden fixed top-14 left-2 right-2 z-40 bg-white rounded shadow-md border border-gray-200 overflow-hidden"
                    >
                        <motion.div className="p-2 space-y-2">
                            {navItems.map(({ icon: Icon, title, path }) => (
                                <Link
                                    key={title}
                                    to={path}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors ${location.pathname === path
                                        ? "bg-gray-200 text-black"
                                        : "text-slate-600 hover:bg-slate-100"
                                        }`}
                                >
                                    <Icon className="text-lg" />
                                    <span>{title}</span>
                                </Link>
                            ))}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </>
    );
};

const TitleSection = ({ open }) => (
    <div className="mb-3 border-b border-slate-300 pb-3">
        <div className="flex cursor-pointer items-center justify-between rounded-md transition-colors hover:bg-slate-100">
            <div className="flex items-center gap-2">
                <Logo />
                {open && (
                    <motion.div
                        layout
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.125 }}
                    >
                        <span className="block text-sm font-semibold">Invoice Automation</span>
                    </motion.div>
                )}
            </div>
        </div>
    </div>
);

const Logo = () => (
    <motion.div
        layout
        className="grid size-10 shrink-0 place-content-center rounded-md bg-blue-400"
    >
        <svg
            width="24"
            height="auto"
            viewBox="0 0 50 39"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="fill-slate-50"
        >
            <path d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z" />
            <path d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z" />
        </svg>
    </motion.div>
);

const ToggleClose = ({ open, setOpen }) => (
    <motion.button
        layout
        onClick={() => setOpen((prev) => !prev)}
        className="absolute bottom-0 left-0 right-0 border-t border-slate-300 transition-colors hover:bg-slate-100"
    >
        <div className="flex items-center p-2">
            <motion.div layout className="grid size-10 place-content-center text-lg">
                <FiChevronsRight className={`transition-transform ${open && "rotate-180"}`} />
            </motion.div>
            {open && (
                <motion.span
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.125 }}
                    className="text-xs font-medium"
                >
                    Hide
                </motion.span>
            )}
        </div>
    </motion.button>
);

export default Navbar;
