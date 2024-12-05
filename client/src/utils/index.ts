function getInitials(fullname:string) {
    const names = fullname.split(" ");
    const initials = names.slice(0, 2).map((name) => name.charAt(0).toUpperCase());
    const initialStr = initials.join("");
    return initialStr;
}

export default getInitials;

export const TASK_TYPE:any = {
  TODO: "bg-orange-600",
  IN_PROGRESS: "bg-blue-600",
  COMPLETED: "bg-pink-600",
};

export const PRIOTITYSTYELS:any = {
  HIGH: "text-red-600",
  MEDIUM: "text-yellow-600",
  LOW: "text-blue-600",
};

export const BGS:any = [
  "bg-orange-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-teal-500",
];

