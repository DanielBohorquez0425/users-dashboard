export async function addUser(userData: { name: string; email: string; password: string }) {
    try {
      const response = await fetch("http://localhost:8000/api/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
  
      if (!response.ok) {
        throw new Error("Error al añadir usuario");
      }
  
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  }
  
  export async function fetchUsers() {
    try {
      const response = await fetch("http://localhost:8000/api/users/");
      return await response.json();
    } catch (error) {
      console.error("Error al obtener usuarios", error);
      return [];
    }
  }