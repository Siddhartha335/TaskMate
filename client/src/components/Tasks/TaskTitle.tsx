import clsx from "clsx"
import { IoMdAdd } from "react-icons/io"

type TaskTitleProps = {
    label: string,
    className?: string
}
export const TaskTitle = ({label,className}:TaskTitleProps) => {
  return (
    <div className="w-full h-10 md:h-12 px-2 md:px-4 rounded bg-white flex items-center justify-between">
        <div className="flex items-center gap-2">
            <div className={clsx("w-4 h-4 rounded-full",className)} />
            <p className="text-sm md:text-base text-gray-600">{label}</p>
        </div>
        <button className="hidden md:block">
            <IoMdAdd className="text-lg text-black" />
        </button>
  </div>
  )
}
