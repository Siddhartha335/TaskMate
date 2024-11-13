function getInitials(fullname:string) {
    const names = fullname.split(" ");
    const initials = names.slice(0, 2).map((name) => name.charAt(0).toUpperCase());
    const initialStr = initials.join("");
    return initialStr;
}

export default getInitials;

export const TASK_TYPE:any = {
  todo: "bg-orange-600",
  "in progress": "bg-blue-600",
  completed: "bg-pink-600",
};

export const PRIOTITYSTYELS:any = {
  high: "text-red-600",
  medium: "text-yellow-600",
  low: "text-blue-600",
};

export const BGS:any = [
  "bg-orange-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-teal-500",
];

