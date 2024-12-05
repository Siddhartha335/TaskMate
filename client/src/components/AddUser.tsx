import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {ModalWrapper} from "./ModalWrapper";
import { DialogTitle } from "@headlessui/react";
import { Loader } from "./Loader";
import { toast } from "sonner";
import { useRegisterMutation } from "../redux/slices/api/authApiSlice";
import { useGetTeamListQuery, useUpdateUserMutation } from "../redux/slices/api/userApiSlice";
import { setCredentials } from "../redux/slices/authSlice";

const AddUser = ({ open, setOpen,isEditing, userData }:any) => {
  let defaultValues = isEditing && userData ? userData : {};
  const {user} = useSelector((state:any) => state.auth);
  const dispatch = useDispatch();

  const [addNewUser, {isLoading}] = useRegisterMutation();
  const [updateUser,{isLoading:isUpdating}] = useUpdateUserMutation();
  const {refetch} = useGetTeamListQuery();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const handleOnSubmit = async (data:any) => {
    try{
        if(userData) {
          const result = await updateUser({id:userData.id,...data}).unwrap();
          toast.success(result.message);
          if(userData.id === user.id) {
            dispatch(setCredentials({...result.user}));
          }
          refetch();
        } else {
          await addNewUser({
            ...data,
            password:data.email,
          }).unwrap();
          toast.success("New user added succesfully!")
          refetch();
        }
        setTimeout(() => {
          setOpen(false);
        }, 500);
    }catch(err){
      toast.error("Something went wrong!");
    }
  };
  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit(handleOnSubmit)}>
          <DialogTitle
            as='h2'
            className='text-base font-bold leading-6 text-gray-900 mb-4'
          >
            {isEditing ? "UPDATE PROFILE" : "ADD NEW USER"}
          </DialogTitle>
          <div className='mt-2 flex flex-col gap-6'>
            <div>
              <label htmlFor="name" className="block text-md font-medium text-gray-700">Full name</label>
              <input
                  type="text"
                  id="name"
                  placeholder="Full Name"
                  {...register("name",{
                    required:"Full name is required",
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"  
                />
                {errors.name && <p className="text-sm text-red-500 mt-1"> {errors.name.message as string}</p>}
              </div>

              <div>
              <label htmlFor="title" className="block text-md font-medium text-gray-700">Title</label>
              <input
                  type="text"
                  id="title"
                  placeholder="Title"
                  {...register("title",{
                    required:"Title is required"
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"  
                />
                {errors.title && <p className="text-sm text-red-500 mt-1"> {errors.title.message as string}</p>}
              </div>

              <div>
              <label htmlFor="email" className="block text-md font-medium text-gray-700">Email</label>
              <input
                  type="email"
                  id="email"
                  placeholder="Email Address"
                  {...register("email",{
                    required:"Email address is required",
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"  
                />
                {errors.email && <p className="text-sm text-red-500 mt-1"> {errors.email.message as string}</p>}
              </div>

              <div>
              <label htmlFor="role" className="block text-md font-medium text-gray-700">Role</label>
              <input
                  type="text"
                  id="role"
                  placeholder="Role"
                  {...register("role",{
                    required:"User role is required",
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"  
                />
                {errors.role && <p className="text-sm text-red-500 mt-1"> {errors.role.message as string}</p>}
              </div>
          </div>

          {isLoading || isUpdating ? (
            <div className='py-5'>
              <Loader />
            </div>
          ) : (
            <div className='py-3 mt-4 sm:flex sm:flex-row-reverse gap-2'>
                <button className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded text-sm">
                        Submit
                </button>
                <button className="bg-gray-600 hover:bg-gray-500 text-white py-2 px-4 rounded text-sm" onClick={() => setOpen(false)}>
                Cancel
                </button>
            </div>
          )}
        </form>
      </ModalWrapper>
    </>
  );
};

export default AddUser;