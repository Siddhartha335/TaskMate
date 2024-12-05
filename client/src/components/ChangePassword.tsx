import { useDispatch } from "react-redux";
import {ModalWrapper} from "./ModalWrapper";
import { DialogTitle } from "@headlessui/react";
import { toast } from "sonner";
import { useRef, useState } from "react";
import { useChangePasswordMutation } from "../redux/slices/api/userApiSlice";
import { useLogoutMutation } from "../redux/slices/api/authApiSlice";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/slices/authSlice";

const ChangePassword = ({ open, setOpen }:any) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [changePassword, {isLoading}] = useChangePasswordMutation();
  const [logoutUser] = useLogoutMutation();

  const password1Ref = useRef<HTMLInputElement | null>(null);
  const password2Ref = useRef<HTMLInputElement | null>(null);

  const [error, setError] = useState<string>("");

  // Handle form submission
  const handleOnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate passwords using refs
    const password1 = password1Ref.current?.value || "";
    const password2 = password2Ref.current?.value || "";

    if (password1 !== password2) {
      setError("Passwords do not match");
      return;
    }

    if (password1.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setTimeout(async () => {
      // Simulate success response after "password change"
      try {
        const result = await changePassword({password:password1}).unwrap();
        toast.success(result.message);

        await logoutUser(undefined).unwrap();
        dispatch(logout());
        navigate("/login");

      } catch (error: any) {
        toast.error(error?.data?.message || error.message);
      }

      // Reset form fields
      if (password1Ref.current) password1Ref.current.value = "";
      if (password2Ref.current) password2Ref.current.value = "";
      
      setOpen(false); // Close the modal
    }, 1000);
  };

  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <form onSubmit={handleOnSubmit}>
          <DialogTitle as="h2" className="text-base font-bold leading-6 text-gray-900 mb-4">
            Change your password
          </DialogTitle>

          <div className="mt-2 flex flex-col gap-6">
            {/* New Password */}
            <div>
              <label htmlFor="password1" className="block text-md font-medium text-gray-700">
                New Password
              </label>
              <input
                type="password"
                id="password1"
                placeholder="New Password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                ref={password1Ref}
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="password2" className="block text-md font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                id="password2"
                placeholder="Confirm Password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                ref={password2Ref}
              />
            </div>

            {/* Error message */}
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>

          {/* Action Buttons */}
          <div className="py-3 mt-4 sm:flex sm:flex-row-reverse gap-2">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded text-sm"
            >
              {isLoading ? "Changing..." : "Change"}
            </button>
            <button
              className="bg-gray-600 hover:bg-gray-500 text-white py-2 px-4 rounded text-sm"
              onClick={() => setOpen(false)} // Close modal on cancel
            >
              Cancel
            </button>
          </div>
        </form>
      </ModalWrapper>
    </>
  );
};

export default ChangePassword;
