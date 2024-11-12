import moment from "moment";
import { summary } from "../assets/data"; // Assuming this contains the 'users' array

export const UserTable = () => {
  return (
    <div className="overflow-x-auto bg-white p-4 mt-8 rounded-lg shadow-md">
      <table className="w-full text-left">
        <thead className="border-b">
          <tr>
            <th className="px-4 py-2">Full Name</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Created At</th>
          </tr>
        </thead>
        

        <tbody>
          {summary.users.map((user) => {
            return (
              <tr key={user._id} className="border-b text-sm">
                <td className="px-4 py-2 font-semibold">{user.name}</td>

                <td className="px-4 py-2">
                  <span className={user.isActive ? "text-green-500" : "text-red-500"}>
                    {user.isActive ? "Active" : "Inactive"}
                  </span>
                </td>

                {/* Created At */}
                <td className="px-4 py-2">
                  {moment(user.createdAt).fromNow()}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
