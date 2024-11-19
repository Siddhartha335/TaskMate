import { useForm } from "react-hook-form";
import { ModalWrapper } from "../ModalWrapper";
import { Dialog, DialogTitle } from "@headlessui/react";

const AddSubTask = ({ open, setOpen, id }:any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // const [addSbTask] = useCreateSubTaskMutation();

  const handleOnSubmit = async (data) => {
    // try {
    //   const res = await addSbTask({ data, id }).unwrap();
    //   toast.success(res.message);
    //   setTimeout(() => {
    //     setOpen(false);
    //   }, 500);
    // } catch (err) {
    //   console.log(err);
    //   toast.error(err?.data?.message || err.error);
    // }
  };

  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit(handleOnSubmit)} className=''>
          <DialogTitle
            as='h2'
            className='text-base font-bold leading-6 text-gray-900 mb-4'
          >
            ADD SUB-TASK
          </DialogTitle>
          <div className='mt-2 flex flex-col gap-6'>
            <div>
              <label htmlFor="title" className="block text-md font-medium text-gray-700">SubTask Title</label>
              <input
                  type="text"
                  id="title"
                  placeholder="Subtask title"
                  {...register("title",{
                    required:"Title is required",
                    minLength:{value:4, message:"Title must be at least 4 characters long"}
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"  
                />
                {errors.title && <p className="text-sm text-red-500 mt-1"> {errors.title.message as string}</p>}
            </div>

            <div className='flex items-center gap-4'>
            <div>
              <label htmlFor="date" className="block text-md font-medium text-gray-700">Date</label>
              <input
                  type="Date"
                  id="date"
                  placeholder="Task date"
                  {...register("date",{
                    required:"Date is required",
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"  
                />
                {errors.date && <p className="text-sm text-red-500 mt-1"> {errors.date.message as string}</p>}
              </div>
              <div>
              <label htmlFor="tag" className="block text-md font-medium text-gray-700">Tag</label>
              <input
                  type="text"
                  id="tag"
                  placeholder="Tag"
                  {...register("tag",{
                    required:"Title is required",
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"  
                />
                {errors.tag && <p className="text-sm text-red-500 mt-1"> {errors.tag.message as string}</p>}
              </div>
            </div>
          </div>
          <div className='py-3 mt-4 flex sm:flex-row-reverse gap-4'>
            <button className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded text-sm">
                    Submit
            </button>
            <button className="bg-gray-600 hover:bg-gray-500 text-white py-2 px-4 rounded text-sm" onClick={() => setOpen(false)}>
            Cancel
            </button> 
          </div>
        </form>
      </ModalWrapper>
    </>
  );
};

export default AddSubTask;