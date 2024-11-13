import { TabList, TabGroup, Tab, TabPanels } from "@headlessui/react"
import clsx from "clsx"

interface TabsProps {
    tabs:{
        title:string,
        icon:JSX.Element
    }[],
    setSelected:React.Dispatch<React.SetStateAction<number>>,
    children:React.ReactNode
}
export const Tabs = ({tabs,setSelected,children}:TabsProps) => {
  return (
    <div className="w-full px-1 sm:px-0">
        <TabGroup>
            <TabList className="flex space-x-6 rounded-xl p-1" >
                {tabs.map((tab,index) => (
                    <Tab
                        key={index}
                        onClick={() => setSelected(index)}
                        className={({ selected }) => clsx(
                            "w-fit flex items-center outline-none gap-2 px-3 py-2.5 text-sm font-medium leading-5 bg-white", selected ? "text-blue-700 border-b-2 border-blue-700" : "text-gray-800 hover:text-blue-800"
                        )}>
                            {tab.icon}
                            <span>{tab.title}</span>
                        </Tab>
                ))}
            </TabList>
            <TabPanels className="w-full mt-2">
                {children}
            </TabPanels>
        </TabGroup>
    </div>
  )
}
