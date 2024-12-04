import moment from "moment";

type UserTableProps = {
  data:any
}

export const UserTable = ({data}:UserTableProps) => {
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
          {data?.users.map((user:any,index:number) => {
            return (
              <tr key={index} className="border-b text-sm">
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
