import { useEffect, useState } from "react";
import axios from "axios";
import sortUsers from "../utils/sortUsers";

const DataTable = () => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [filterParam, setFilterParam] = useState("");
  const [sortConfig, setSortConfig] = useState({
    field: null,
    direction: 'ascending',
  });

  const addUsers = async () => {
    try {
      const response = await axios.get('http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D');
      setUsers(response.data);
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

  const getSortIcon = (field) => {
    if (sortConfig.field === field) {
      return sortConfig.direction === "ascending" ? "▲" : "▼";
    }
    return "";
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
              <th onClick={() => handleSort("id")}>
                id{getSortIcon("id")}
              </th>
              <th onClick={() => handleSort("firstName")}>
                Имя{getSortIcon("firstName")}
              </th>
              <th onClick={() => handleSort("lastName")}>
                Фамилия{getSortIcon("lastName")}
              </th>
              <th onClick={() => handleSort("email")}>
                Email{getSortIcon("email")}
              </th>
              <th onClick={() => handleSort("phone")}>
                Телефон{getSortIcon("phone")}
              </th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0
              ? "Ничего не найдено"
              : users.map(user => (
              <tr key={user.id} onClick={() => setUser(user)}>
                <td>{user.id}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {user && (
          <div>
            <p>
              <strong>Идентификатор:</strong> {user.id}
            </p>
            <p>
              <strong>Имя:</strong> {user.firstName}
            </p>
            <p>
              <strong>Фамилия:</strong> {user.lastName}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Телефон:</strong> {user.phone}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataTable;