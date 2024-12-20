import { User, SortConfig } from "../types/myTypes";

const sortUsers = (users: User[], sortConfig: SortConfig): User[] =>
  users.sort((a: User, b: User) => {
    if (sortConfig.field === null) return 0;
    if (a[sortConfig.field] < b[sortConfig.field]) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (a[sortConfig.field] > b[sortConfig.field]) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });
    
export default sortUsers;