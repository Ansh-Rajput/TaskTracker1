import axios from "axios";
import { useCallback, useEffect } from "react";
import { IoLogInOutline } from "react-icons/io5";
import { useTaskStore } from "../store/taskStore";

export const NavBar = () => {
  const user = useTaskStore((state) => state.user);
  const setUser = useTaskStore((state) => state.setUser);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const loginWithGoogle = useCallback(() => {
    window.open(`${backendUrl}/auth/google/callback`, "_self");
  }, [backendUrl]);

  const logOut = async () => {
    await axios.get(`${backendUrl}/logout`, {
      withCredentials: true,
    });

    setUser(null);
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(`${backendUrl}/login/sucess`, {
          withCredentials: true,
        });
        setUser(response.data.user);
      } catch (error) {
        loginWithGoogle();
        console.log(error);
      }
    };
    getUser();
  }, [backendUrl, setUser, user, loginWithGoogle]);

  return (
    <nav className="flex justify-between items-center p-4 text-2xl shadow-md rounded-md">
      <h2 className="">Task Board</h2>
      <div
        className="rounded-full h-[40px] aspect-square relative bg-white cursor-pointer flex items-center justify-center"
        onClick={
          user && Object.keys(user).length > 0 ? logOut : loginWithGoogle
        }
      >
        {user && Object.keys(user).length > 0 ? (
          <img
            src={user?.image}
            alt="img"
            className="h-full aspect-square object-cover rounded-full"
          />
        ) : (
          <IoLogInOutline className="h-full" />
        )}
      </div>
    </nav>
  );
};
