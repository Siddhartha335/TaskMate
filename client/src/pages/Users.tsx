import clsx from "clsx"
import moment from "moment";
import { summary } from "../assets/data";
import getInitials, { BGS } from "../utils";
import { useState } from "react";
import ConfirmatioDialog from "../components/Dialogs";
import { UserAction } from "../components/Dialogs";
import AddUser from "../components/AddUser";

export const Users = () => {

  const [openDialog,setOpenDialog] = useState(false);
  const [open,setOpen] = useState(false);
  const [openAction,setOpenAction] = useState(false);
  const [selected,setSelected] = useState(null);

  const deleteClick = (id) => {
    setSelected(id);
    setOpenDialog(true);
  }

  const editClick = (el) => {
    setSelected(el);
    setOpen(true)
  }

  const userActionHandler = () => {

  }

  const deleteHandler = () => {
  }

  return (
    <>
        <div className="flex items-center justify-between mb-4">
          <div>
              <h2 className={clsx("text-2xl font-semibold capitalize")}>Team Members</h2>
          </div>
          <div>
            <button className="py-2 px-4 text-white bg-blue-700 shadow-lg hover:bg-gray-800 border rounded-lg" onClick={()=> setOpen(true)}>
              + Add New User
            </button>
          </div> 
        </div>
        <div className="overflow-x-auto bg-white p-4 mt-8 rounded-lg shadow-md">
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
          {summary.users.map((user,index) => {
            return (
              <tr key={user._id} className="border-b text-sm">
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
                  <span className={user.isActive ? "text-green-500" : "text-red-500"}>
                    {user.isActive ? "Active" : "Inactive"}
                  </span>
                </td>

                {/* Created At */}
                <td className="px-4 py-2">
                  {moment(user.createdAt).fromNow()}
                </td>

                <td className="px-4 py-2">
                    <button className="text-blue-600 mr-2 hover:text-blue-500 sm:px-0 text-sm md:text-base" onClick={()=> editClick(user)}>Edit</button>
                    <button className="text-red-600 hover:text-red-500 sm:px-0 text-sm md:text-base" onClick={()=> deleteClick(user?._id)}>Delete</button>
                  </td>

              </tr>
            );
          })}
        </tbody>
      </table>
      <AddUser
        open={open}
        setOpen={setOpen}
        userData={selected}
        key={new Date().getTime().toString()}
      />

      <ConfirmatioDialog
        open={openDialog}
        setOpen={setOpenDialog}
        onClick={deleteHandler}
        msg={"Are you sure you want to delete this user?"}
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
