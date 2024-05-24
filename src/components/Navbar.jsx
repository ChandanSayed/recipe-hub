import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [dropDownState, setDropDownState] = useState(false);

  return (
    <nav className="flex items-center justify-between px-4 py-2">
      <div className="scale-100 cursor-pointer rounded-2xl px-3 py-2 text-xl font-semibold transition-all duration-200 hover:scale-110">
        <h2>Logo</h2>
      </div>
      <ul className="hidden items-center justify-between gap-10 md:flex">
        <NavLinks />
      </ul>
      <div className="relative flex transition-transform md:hidden">
        <svg
          onClick={() => setDropDownState(prev => !prev)}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="cursor-pointer"
        >
          {" "}
          <line x1="4" x2="20" y1="12" y2="12" /> <line x1="4" x2="20" y1="6" y2="6" />
          <line x1="4" x2="20" y1="18" y2="18" />{" "}
        </svg>
        {dropDownState && (
          <ul className="z-10 gap-2 bg-dark-white absolute right-0 top-11 flex w-[200px] flex-col rounded-lg text-base">
            <NavLinks />
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

function NavLinks() {
  const links = [
    {
      name: "Home",
      to: "/"
    },
    {
      name: "Recipes",
      to: "/recipes"
    },
    {
      name: "Add Recipe",
      to: "/add-recipe"
    }
  ];
  return (
    <>
      {links.map((link, ind) => {
        return (
          <li
            key={ind}
            className="hover:bg-dark-blue md:hover:bg-transparent first-of-type:rounded-t-lg last-of-type:rounded-b-lg md:rounded-none"
          >
            <Link
              className="group flex cursor-pointer flex-col px-6 py-2 md:p-0 hover:text-white md:hover:text-black"
              to={link.to}
            >
              {link.name}
              <span className="mt-[2px] h-[3px] w-[0px] rounded-full bg-dark-blue transition-all duration-300 group-hover:w-full hidden md:inline-block"></span>
            </Link>
          </li>
        );
      })}
    </>
  );
}
