import { useState } from "react";
import { Link } from "react-router-dom";
import { CiMenuBurger } from "react-icons/ci";
import { RiCloseLine } from "react-icons/ri";

const Navbar = () => {
  const [dropDownState, setDropDownState] = useState(false);

  return (
    <nav className="container mx-auto flex items-center justify-between px-4 py-4">
      <Link to={"/"} className="text-3xl font-bold">
        Recipe Center
      </Link>

      <ul className="hidden items-center justify-between gap-10 md:flex">
        <NavLinks />
      </ul>
      <div className="relative flex transition-transform md:hidden">
        {!dropDownState ? (
          <CiMenuBurger
            onClick={() => setDropDownState(prev => !prev)}
            className="cursor-pointer text-2xl"
          />
        ) : (
          <RiCloseLine
            onClick={() => setDropDownState(prev => !prev)}
            className="cursor-pointer text-2xl"
          />
        )}
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
              className="group flex cursor-pointer flex-col px-6 py-2 md:p-0 hover:text-white md:hover:text-black relative"
              to={link.to}
            >
              {link.name}
              <span className="mt-[2px] h-[3px] w-[0px] rounded-full bg-dark-blue transition-all duration-300 group-hover:w-full hidden md:inline-block absolute -bottom-1"></span>
            </Link>
          </li>
        );
      })}
    </>
  );
}
