import { useEffect, useState } from "react";
import sortUsers from "../utils/sortUsers";

const DataTable = () => {
  const [users, setUsers] = useState([]);
  const [filterParam, setFilterParam] = useState("");
  const [sortConfig, setSortConfig] = useState({
    field: null,
    direction: 'ascending',
  });

  const addUsers = async () => {
    try {
      const response = await fetch('http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFilter = () => {
    const filteredUsers = users.filter((user) => {
      const values = Object.values(user);
      return values
        .map((value) => 
          typeof value === 'string' ? value.toLowerCase() : value
        )
        .includes(filterParam.toLowerCase())
    });
    setUsers(filteredUsers);
  };

  const handleSort = (field) => {
    let direction = "ascending";

    if (sortConfig.field === field && sortConfig.direction === "ascending") {
      direction = "descending";
    }

    setSortConfig({ field, direction });
    const sortedUsers = sortUsers(users, sortConfig);
    setUsers(sortedUsers);
  };

  useEffect(() => {
    addUsers();
  }, [filterParam]);

  return (
    <div>
      <div>
        <label>
          <input
            type="text"
            placeholder="Параметр фильтрации"
            value={filterParam}
            onChange={(e) => setFilterParam(e.target.value)}
            autoFocus
          />
        </label>
        <button type="button" onClick={handleFilter}>
          Найти
        </button>
        <table>
          <thead>
            <tr>
              <th onClick={() => handleSort("id")}>id</th>
              <th onClick={() => handleSort("firstName")}>Имя</th>
              <th onClick={() => handleSort("lastName")}>Фамилия</th>
              <th onClick={() => handleSort("email")}>Email</th>
              <th onClick={() => handleSort("phone")}>Телефон</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;