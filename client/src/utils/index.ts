function getInitials(fullname:string) {
    const names = fullname.split(" ");
    const initials = names.slice(0, 2).map((name) => name.charAt(0).toUpperCase());
    const initialStr = initials.join("");
    return initialStr;
}

export default getInitials;

export const TASK_TYPE = {
  todo: "bg-blue-600",
  "in progress": "bg-yellow-600",
  completed: "bg-green-600",
};