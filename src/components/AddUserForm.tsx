import { useState } from "react";
import { addUser } from "../services/api"; // Importar la función que hace el fetch

export function AddUserForm({ onUserAdded }: { onUserAdded: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addUser({ name, email, password });
    onUserAdded(); // Para refrescar la lista de usuarios
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 border p-4 rounded-md shadow">
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nombre" required className="rounded-lg border p-2 w-full focus-within:outline-none focus-within:border-black focus:rounded-lg" />
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Correo" required className="rounded-lg border p-2 w-full focus-within:outline-none focus-within:border-black focus:rounded-lg" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" required className="rounded-lg border p-2 w-full focus-within:outline-none focus-within:border-black focus:rounded-lg" />
      <button type="submit" className="bg-black text-white px-4 py-2 rounded">Añadir usuario</button>
    </form>
  );
}