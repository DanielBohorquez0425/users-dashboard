import { useState } from "react";

interface User {
  id: string;
  name: string;
  email: string;
}

interface UserTableProps {
  users: User[];
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

export function UserTable({ users, currentPage, pageSize, onPageChange, onPageSizeChange }: UserTableProps) {
  const [loadingDelete, setLoadingDelete] = useState<string | null>(null);
  const totalPages = Math.ceil(users.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedUsers = users.slice(startIndex, startIndex + pageSize);

  const deleteUser = async (id: string) => {
    if (!window.confirm("¿Estás seguro de que quieres eliminar este usuario?")) return;

    setLoadingDelete(id);

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/users/${id}/`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Error al eliminar el usuario");
      onPageChange(1);
    } catch (error) {
      alert("No se pudo eliminar el usuario.");
    } finally {
      setLoadingDelete(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Nombre</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.length > 0 ? (
              paginatedUsers.map((user) => (
                <tr key={user.id} className="border">
                  <td className="border text-[12px] md:text-[14px] max-w-[90px] p-2 font-medium">{user.name}</td>
                  <td className="border text-[12px] md:text-[14px] p-2 max-w-[160px] truncate">{user.email}</td>
                  <td className="border text-[12px] md:text-[14px] p-2 flex justify-center">
                    <button
                      onClick={() => deleteUser(user.id)}
                      className={`px-3 py-1 rounded transition ${
                        loadingDelete === user.id
                          ? "bg-gray-500 text-white cursor-not-allowed"
                          : "bg-black text-white"
                      }`}
                      disabled={loadingDelete === user.id}
                    >
                      {loadingDelete === user.id ? (
                        <span className="flex items-center">
                          <svg className="animate-spin h-4 w-4 mr-2 border-t-2 border-white rounded-full" viewBox="0 0 24 24"></svg>
                          Eliminando...
                        </span>
                      ) : (
                        <div className="flex items-center gap-1">
                          <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" > <path d="M4 7l16 0" /> <path d="M10 11l0 6" /> <path d="M14 11l0 6" /> <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /> <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /> </svg>
                          <span className="hidden md:flex">Eliminar</span>
                        </div>
                      )}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="h-24 text-center border">
                  No se encontraron resultados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-5 md:flex-row items-center justify-between">
        <div className="flex items-center space-x-2">
          <p className="text-sm">
            Mostrando <span className="font-medium">{paginatedUsers.length}</span> de <span className="font-medium">{users.length}</span> usuarios
          </p>
          <select
            value={pageSize.toString()}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="border rounded px-2 py-1"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <button onClick={() => onPageChange(1)} disabled={currentPage === 1} className="border rounded px-2 py-1">
            «
          </button>
          <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className="border rounded px-2 py-1">
            ‹
          </button>
          <span className="text-sm">Página {currentPage} de {totalPages || 1}</span>
          <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages || totalPages === 0} className="border rounded px-2 py-1">
            ›
          </button>
          <button onClick={() => onPageChange(totalPages)} disabled={currentPage === totalPages || totalPages === 0} className="border rounded px-2 py-1">
            »
          </button>
        </div>
      </div>
    </div>
  );
}