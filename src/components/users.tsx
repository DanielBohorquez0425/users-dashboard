import { useEffect, useState } from "react";
import axios from "axios";

interface User {
  id: number;
  name: string;
  email: string;
}

function Users() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    axios.get<User[]>("http://127.0.0.1:8000/api/users/")
      .then(response => setUsers(response.data))
      .catch(error => console.error("Error al obtener los usuarios:", error));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Lista de Usuarios</h2>
      <ul className="space-y-2">
        {users.map(user => (
          <li key={user.id} className="p-2 border rounded-lg shadow-md">
            <p className="text-lg font-semibold">{user.name}</p>
            <p className="text-gray-500">{user.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Users;