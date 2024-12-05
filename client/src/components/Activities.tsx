import moment from "moment";
import React, { useState } from "react"
import {FaBug,FaThumbsUp,FaUser} from "react-icons/fa";
import { GrInProgress } from "react-icons/gr";
import { MdOutlineDoneAll, MdOutlineMessage } from "react-icons/md"
import { Loader } from "./Loader";
import { usePostTaskActivityMutation } from "../redux/slices/api/taskApiSlice";
import { toast } from "sonner";

const TASKTYPEICON:any = {
    COMMENTED: (
      <div className='w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center text-white'>
        <MdOutlineMessage size={20} />,
      </div>
    ),
    STARTED: (
      <div className='w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white'>
        <FaThumbsUp size={20} />
      </div>
    ),
    ASSIGNED: (
      <div className='w-6 h-6 flex items-center justify-center rounded-full bg-gray-500 text-white'>
        <FaUser size={14} />
      </div>
    ),
    BUG: (
      <div className='text-red-600'>
        <FaBug size={24} />
      </div>
    ),
    COMPLETED: (
      <div className='w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white'>
        <MdOutlineDoneAll size={24} />
      </div>
    ),
    IN_PROGRESS: (
      <div className='w-8 h-8 flex items-center justify-center rounded-full bg-violet-600 text-white'>
        <GrInProgress size={16} />
      </div>
    ),
  };

const act_types:string[] = [
    "STARTED",
    "COMPLETED",
    "IN_PROGRESS",
    "COMMENTED",
    "BUG",
    "ASSIGNED",
  ];
export const Activities = ({activities,id,refetch}:any) => {

    const [selected,setselected] = useState(act_types[0]);
    const [text,setText] = useState('');

    const [postActivity, {isLoading}] = usePostTaskActivityMutation();

    const handleSubmit = async(e:any) => {
      e.preventDefault();
      try {
        const activityData = {
          type:selected,
          activity:text 
        }
        const result = await postActivity({
          data:activityData,
          id:id
        }).unwrap();
        setText('');
        toast.success(result.message);
        refetch();
      } catch (error:any) {
        console.log(error);
        toast.error(error?.data?.message || error.message);
      }
    }

  return (
    <div className="w-full flex flex-col md:flex-row gap-10 2xl:gap-20 min-h-screen px-10 py-8 bg-white shadow rounded-md justify-between overflow-y-auto">
        <div className="w-full md:w-1/2">
            <h4 className="text-gray-600 font-semibold text-lg mb-5">Activities</h4>
            <div className="w-full">
                {activities.map((activity:any) => (
                    <div className=" flex space-x-4" key={activity.id}>
                        <div className="flex flex-col items-center flex-shrink-0">
                            <div className="w-10 h-10 flex items-center justify-center">
                                {TASKTYPEICON[activity.type]}
                            </div>

                            <div className="w-full flex items-center">
                                <div className="w-20 h-full bg-gray-700" />
                            </div>
                        </div>

                        <div className="flex flex-col gap-y-1 mb-8">
                            <p className="font-semibold">{activity?.by?.name}</p>

                            <div className="text-gray-500 space-y-2">
                                <span className="capitalize">{activity?.type}&nbsp;</span>
                                <span className="text-sm">{moment(activity?.date).fromNow()}</span>
                            </div>
                            <div className="text-gray-700">
                                {activity?.activity}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        {!isLoading ? (
                <form onSubmit={handleSubmit}>
                  <div className="w-full md:w-[90%]">
                <h4 className="text-gray-600 font-semibold text-lg mb-5">Add Activity</h4>
                <div className="flex items-center gap-3 flex-wrap">
                    {act_types.map((type) => (
                        <React.Fragment key={type}>
                            <input
                            type="checkbox"
                            id={type}
                            className="w-4 h-4"
                            checked={selected === type ? true : false}
                            onChange={() => setselected(type)}
                            />                        
                            <label className="text-gray-600" htmlFor={type}>{type}</label>
                        </React.Fragment>
                    ))}
                </div>
                <div className="mt-10">
                    <textarea
                    className="w-full h-40 p-3 border border-gray-400 rounded-md"
                    placeholder="Type ...."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                     />
                </div>
                <div>
                <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md mt-5" type="submit">Submit</button>
                </div>
            </div>
                </form>
        ): (
            <div className="w-full md:w-[40%]">
                <Loader />
            </div>
        )}
    </div>
  )
}
