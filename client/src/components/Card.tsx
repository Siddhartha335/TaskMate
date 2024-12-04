type CardProps = {
    stats:{
    _id:string,
    label:string,
    total:number,
    icon:JSX.Element,
    bg:string
  }[]
}
export const Card = ({stats}:CardProps) => {
  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div
          key={stat._id}
          className="px-4 md:p-3 rounded-lg shadow-lg bg-white flex flex-row-reverse items-center justify-between w-full h-32"
        >
          <div
            className={`flex items-center justify-center p-4 rounded-full text-white text-xl ${stat.bg} w-[40px] h-[40px]`}
          >
            <span>{stat.icon}</span>
          </div>

          <div className="mt-4">
            <div className="text-[16px] font-light">{stat.label}</div>
            <div className="text-xl font-bold my-1">{stat.total}</div>
            <div className="text-[14px] font-light ">110 last month</div>
          </div>
        </div>
      ))}
    </div>
  )
}
