import { useEffect, useState } from "react";
import { UserTable } from "./userTable";
import { AddUserForm } from "./AddUserForm";

interface User {
  id: string;
  name: string;
  email: string;
}

const UserDashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://127.0.0.1:8000/api/users/");
      if (!response.ok) throw new Error("Error al obtener los usuarios");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      setError("Error al cargar los usuarios");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUserAdded = async () => {
    setShowForm(false);
    fetchUsers();
  };

  if (loading) return <p className="text-center">Cargando usuarios...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-5 flex flex-col gap-5">
      <h1 className="text-xl md:text-3xl font-bold tracking-tight">Dashboard de usuarios</h1>

      <button
        onClick={() => setShowForm(!showForm)}
        className="bg-black text-white px-4 py-2 rounded w-full md:w-fit"
      >
        {showForm ? "Cerrar formulario" : "Agregar Usuario"}
      </button>

      {showForm && <AddUserForm onUserAdded={handleUserAdded} />}

      <UserTable
        users={users}
        currentPage={currentPage}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
        onPageSizeChange={setPageSize}
      />
    </div>
  );
};

export default UserDashboard;