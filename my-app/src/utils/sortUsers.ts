const sortUsers = (users, sortConfig) =>
  users.sort((a, b) => {
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