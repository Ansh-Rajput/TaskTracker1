import { FaUser } from "react-icons/fa";

export const NavBar = () => {
  return (
    <nav className="flex justify-between items-center p-4 text-2xl shadow-md rounded-md">
      <h2 className="">Task Board</h2>
      <div className="rounded-full p-2 bg-white cursor-pointer">
        <FaUser />
      </div>
    </nav>
  );
};
