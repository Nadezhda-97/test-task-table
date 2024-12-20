import { useEffect, useState } from "react";
import axios from "axios";
import sortUsers from "../utils/sortUsers";
import {
  InputContainer,
  Input,
  Button,
  Table,
  TableHeader,
  TableRow,
  TableCell,
  InfoBlock,
} from "../styles/myStyles";

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
      <InputContainer>
        <label>
          <Input
            type="text"
            placeholder="Параметр фильтрации"
            value={filterParam}
            onChange={(e) => setFilterParam(e.target.value)}
            autoFocus
          />
        </label>
        <Button type="button" onClick={handleFilter}>
          Найти
        </Button>
      </InputContainer>
      <Table>
        <thead>
          <tr>
            <TableHeader onClick={() => handleSort("id")}>
              id{getSortIcon("id")}
            </TableHeader>
            <TableHeader onClick={() => handleSort("firstName")}>
              Имя{getSortIcon("firstName")}
            </TableHeader>
            <TableHeader onClick={() => handleSort("lastName")}>
              Фамилия{getSortIcon("lastName")}
            </TableHeader>
            <TableHeader onClick={() => handleSort("email")}>
              Email{getSortIcon("email")}
            </TableHeader>
            <TableHeader onClick={() => handleSort("phone")}>
              Телефон{getSortIcon("phone")}
            </TableHeader>
          </tr>
        </thead>
        <tbody>
          {users.length === 0
            ? "Ничего не найдено"
            : users.map(user => (
            <TableRow key={user.id} onClick={() => setUser(user)}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.firstName}</TableCell>
              <TableCell>{user.lastName}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
        {user && (
          <InfoBlock>
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
          </InfoBlock>
        )}
    </div>
  );
};

export default DataTable;