import clsx from "clsx"
import moment from "moment";
import getInitials, { BGS } from "../utils";
import { useState } from "react";
import ConfirmatioDialog from "../components/Dialogs";
import { UserAction } from "../components/Dialogs";
import AddUser from "../components/AddUser";
import { useDeletedUserMutation, useGetTeamListQuery, useUserActionMutation } from "../redux/slices/api/userApiSlice";
import { Loader } from "../components/Loader";
import { toast } from "sonner";

export const Users = () => {

  const [openDialog,setOpenDialog] = useState(false);
  const [open,setOpen] = useState(false);
  const [openAction,setOpenAction] = useState(false);
  const [selected,setSelected] = useState<any>();
  const [isEditing, setIsEditing] = useState(false);

  const {data, isLoading,refetch} = useGetTeamListQuery();
  const [deleteUser] = useDeletedUserMutation();
  const [userAction] = useUserActionMutation();

  const deleteClick = (id:any) => {
    setSelected(id);
    setOpenDialog(!openDialog);
  }

  const editClick = (el:any) => {
    setSelected(el);
    setIsEditing(true);
    setOpen(!open)
  }

  const addClick = () => {
    setSelected(null);
    setIsEditing(false);
    setOpen(!open);
  }

  const userActionHandler = async() => {
    try {
      const result = await userAction({
        isActive: !selected.isActive,
        id: selected?.id
      });
      refetch();
      toast.success(result.data.message);
      setSelected(null);
      setTimeout(() => {
        setOpenAction(false);
      },500);
    } catch (error: any) {
      console.log(error);
      toast.error(error?.data?.message || error.message);
    }
  }

  const deleteHandler = async() => {
    try {
      const result = await deleteUser(selected);
      refetch();
      setSelected(null);
      setTimeout(() => {
        setOpenDialog(false);
      },500);
      toast.success(result.data.message); 
    } catch(error: any) {
      console.log(error);
      toast.error(error?.data?.message || error.message);
    }
  }

  const userStatusClick = async (el:any) => {
    setSelected(el);
    setOpenAction(true);
  }

  return (
    <>
        <div className="flex items-center justify-between mb-4">
          <div>
              <h2 className={clsx("text-2xl font-semibold capitalize")}>Team Members</h2>
          </div>
          <div>
            <button className="py-2 px-4 text-white bg-blue-700 shadow-lg hover:bg-gray-800 border rounded-lg" onClick={addClick}>
              + Add New User
            </button>
          </div> 
        </div>
        <div className="overflow-x-auto bg-white p-4 mt-8 rounded-lg shadow-md">
      {isLoading? <Loader /> : (
        <table className="w-full text-left">
        <thead className="border-b">
          <tr>
            <th className="px-4 py-2">Full Name</th>
            <th className="px-4 py-2">Role</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Created At</th>
          </tr>
        </thead>

        <tbody>
          {data?.map((user:any,index:any) => {
            return (
              <tr key={index} className="border-b text-sm">
                <td className="px-4 py-2 font-semibold">
                  <div className="flex flex-row gap-4 items-center">
                      <div className={clsx("w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1",BGS[ index % BGS?.length])} >
                          {getInitials(user?.name)}
                      </div>
                      <div>
                          <h2 className="line-clamp-1">{user?.name}</h2>
                      </div>
                  </div>
                  </td>

                <td className="px-4 py-2 font-semibold">{user.role}</td>

                <td className="px-4 py-2">
                  <button className={user.isActive ? "text-green-500" : "text-red-500"}
                    onClick={()=> userStatusClick(user)}>
                    {user.isActive ? "Active" : "Inactive"}
                  </button>
                </td>

                {/* Created At */}
                <td className="px-4 py-2">
                  {moment(user.createdAt).fromNow()}
                </td>

                <td className="px-4 py-2">
                    <button className="text-blue-600 mr-2 hover:text-blue-500 sm:px-0 text-sm md:text-base" onClick={()=> editClick(user)}>Edit</button>
                    <button className="text-red-600 hover:text-red-500 sm:px-0 text-sm md:text-base" onClick={()=> deleteClick(user?.id)}>Delete</button>
                  </td>

              </tr>
            );
          })}
        </tbody>
      </table>
      )}
      <AddUser
        open={open}
        setOpen={setOpen}
        userData={selected}
        isEditing={isEditing}
        key={new Date().getTime().toString()}
      />

      <ConfirmatioDialog
        open={openDialog}
        setOpen={setOpenDialog}
        onClick={deleteHandler}
      />

      <UserAction
        open={openAction}
        setOpen={setOpenAction}
        onClick={userActionHandler}
      />
    </div>
    </>
  )
}
