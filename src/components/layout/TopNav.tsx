import { NavLink } from "react-router-dom";
import { ROUTES } from "@/lib/constants";

const TopNav = () => {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <h1 className="text-lg font-semibold text-slate-900">
          Deepvue Dashboard
        </h1>

        <nav className="flex items-center gap-2 rounded-full bg-slate-100 p-1">
          <NavLink
            to={ROUTES.WORKFLOWS}
            className={({ isActive }) =>
              `rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-[#1B1464] text-white"
                  : "text-slate-600 hover:text-slate-900"
              }`
            }
          >
            Workflows
          </NavLink>

          <NavLink
            to={ROUTES.RUNS}
            className={({ isActive }) =>
              `rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-[#1B1464] text-white"
                  : "text-slate-600 hover:text-slate-900"
              }`
            }
          >
            Runs
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default TopNav;
