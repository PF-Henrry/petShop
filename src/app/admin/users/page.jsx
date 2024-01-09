"use client";
import React, { useState, useEffect } from "react";
import LayoutAdmin from "@/components/LayoutAdmin/LayoutAdmin";
import Image from "next/image";
import Modal from "react-modal";
import {
  Pencil,
  XCircle,
  FloppyDisk,
  Prohibit,
} from "@phosphor-icons/react/dist/ssr";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/users");
      if (!response.ok) {
        throw new Error("Error al obtener la lista de usuarios");
      }

      const data = await response.json();
      setUsers(data);
      setError(null);
    } catch (error) {
      console.error(error.message);
      setError(`No se encontraron coincidencias con ${searchTerm}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  const filteredUsers = users.filter((user) => {
    const userName = user.name.toLowerCase();
    const searchTermLower = searchTerm.toLowerCase();
    const searchWords = searchTermLower.split(" ");
    return searchWords.every((word) => userName.includes(word));
  });
  const sortedUsers = filteredUsers
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name));

  const openModal = async (user) => {
    try {
      const response = await fetch(`/api/users/${user._id}`);
      if (!response.ok) {
        throw new Error("Error al obtener los datos del usuario");
      }

      const userData = await response.json();
      const transformedUser = transformUserData(userData);

      setSelectedUser(transformedUser);
      setEditedUser(null);
      setIsEditing(false);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error al abrir el modal:", error);
    }
  };

  const transformUserData = (userData) => {
    if (userData.city) {
      userData.city = userData.city.name;
    }

    if (userData.province) {
      userData.province = userData.province.name;
    }

    return userData;
  };

  const closeModal = () => {
    setSelectedUser(null);
    setEditedUser(null);
    setIsEditing(false);
    setIsModalOpen(false);
  };

  const startEditing = () => {
    setIsEditing(true);
    setEditedUser({ ...selectedUser });
  };

  const handleInputChange = (field, value) => {
    setEditedUser({ ...editedUser, [field]: value });
  };

  const handleImageChange = (file) => {
    try {
      if (file) {
        const reader = new FileReader();

        reader.onload = (event) => {
          const imageUrl = event.target.result;
          setEditedUser({ ...editedUser, image: imageUrl });
        };

        reader.readAsDataURL(file);
      }
    } catch (error) {
      console.error("Error al cargar la imagen:", error);
    }
  };

  const deleteUser = async () => {
    try {
      const response = await fetch(`/api/users/${selectedUser._id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        closeModal();
        fetchUsers();
      } else {
        const data = await response.json();
        setError(data.mensaje);
      }
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      setError("Error al eliminar usuario");
    }
  };

  const saveChanges = async () => {
    try {
      const response = await fetch(`/api/users/${selectedUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ dataSinPass: editedUser }),
      });
      console.log("response cliente", response);

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Error al actualizar el usuario.");
      }

      setIsEditing(false);
      closeModal();
      fetchUsers();
      setEditedUser(null);
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
      setError(
        "Error al actualizar el usuario. Por favor, inténtalo de nuevo."
      );
    }
  };

  return (
    <LayoutAdmin>
      <div className="p-4">
        <h1 className="text-2xl font-semibold mb-4">Lista de Usuarios</h1>

        <input
          type="text"
          placeholder="Buscar por nombre"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border border-gray-300 rounded mb-4"
        />

        {isLoading && (
          <div className="flex items-center mb-4">
            <p className="mr-2 font-bold">Cargando...</p>
          </div>
        )}

        {error && <div className="mb-4 text-red-500">{error}</div>}

        {!isLoading && sortedUsers.length === 0 && !error && (
          <div className="mb-4">
            <p>No se encontraron coincidencias con {searchTerm}.</p>
          </div>
        )}

        {!isLoading && sortedUsers.length > 0 && (
          <ul>
            {sortedUsers.map((user) => (
              <li
                key={user._id}
                className="cursor-pointer p-2 rounded mb-2 transition-all duration-300 ease-in-out hover:bg-pink-100 hover:text-black"
                onClick={() => openModal(user)}
              >
                <span className="hover:font-bold">{user.name}</span>
              </li>
            ))}
          </ul>
        )}

        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Editar Usuario"
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            },
            content: {
              width: "500px",
              margin: "auto",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              background: "rgba(255, 255, 255, 0.95)",
              marginTop: "50px",
              border: "2px solid #FFB6C1",
            },
          }}
        >
          {selectedUser && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2>
                  {selectedUser.name} {selectedUser.lastname}
                </h2>
                <div className="flex items-center">
                  {isEditing ? (
                    <>
                      <button
                        className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                        onClick={saveChanges}
                      >
                        <FloppyDisk size={24} />
                      </button>
                      <button
                        className="bg-gray-500 text-white px-2 py-1 rounded"
                        onClick={() => setIsEditing(false)}
                      >
                        <Prohibit size={24} />
                      </button>
                      <button
                        className="bg-red-500 text-white px-2 py-1 rounded ml-2"
                        onClick={deleteUser}
                      >
                        Eliminar
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={startEditing}>
                        <Pencil size={24} />
                      </button>
                      <button onClick={closeModal}>
                        <XCircle size={24} />
                      </button>
                    </>
                  )}
                </div>
              </div>

              {isEditing ? (
                <>
                  <div className="mb-4">
                    <span className="font-bold block mb-2">Imagen:</span>
                    {editedUser.img && (
                      <Image
                        src={editedUser.img}
                        alt={`${selectedUser.name} ${selectedUser.lastname}`}
                        width={300}
                        height={300}
                        className="rounded-lg"
                      />
                    )}
                    <input
                      type="file"
                      onChange={(e) => handleImageChange(e.target.files[0])}
                      className={`border border-rosybrown rounded p-1 mb-2 ${
                        isEditing ? "bg-rosybrown-light" : ""
                      }`}
                    />
                  </div>

                  <label className="font-bold block mb-2">Nombre:</label>
                  <input
                    type="text"
                    value={editedUser.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className={`border border-rosybrown rounded p-1 mb-2 ${
                      isEditing ? "bg-rosybrown-light" : ""
                    }`}
                  />

                  <label className="font-bold block mb-2">Apellido:</label>
                  <input
                    type="text"
                    value={editedUser.lastname}
                    onChange={(e) =>
                      handleInputChange("lastname", e.target.value)
                    }
                    className={`border border-rosybrown rounded p-1 mb-2 ${
                      isEditing ? "bg-rosybrown-light" : ""
                    }`}
                  />

                  <label className="font-bold block mb-2">
                    Nombre de usuario:
                  </label>
                  <input
                    type="text"
                    value={editedUser.username}
                    onChange={(e) =>
                      handleInputChange("username", e.target.value)
                    }
                    className={`border border-rosybrown rounded p-1 mb-2 ${
                      isEditing ? "bg-rosybrown-light" : ""
                    }`}
                  />

                  <label className="font-bold block mb-2">Dirección:</label>
                  <input
                    type="text"
                    value={editedUser.adress}
                    onChange={(e) =>
                      handleInputChange("adress", e.target.value)
                    }
                    className={`border border-rosybrown rounded p-1 mb-2 ${
                      isEditing ? "bg-rosybrown-light" : ""
                    }`}
                  />

                  <label className="font-bold block mb-2">Ciudad:</label>
                  <input
                    type="text"
                    value={editedUser.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    className={`border border-rosybrown rounded p-1 mb-2 ${
                      isEditing ? "bg-rosybrown-light" : ""
                    }`}
                  />

                  <label className="font-bold block mb-2">Provincia:</label>
                  <input
                    type="text"
                    value={editedUser.province}
                    onChange={(e) =>
                      handleInputChange("province", e.target.value)
                    }
                    className={`border border-rosybrown rounded p-1 mb-2 ${
                      isEditing ? "bg-rosybrown-light" : ""
                    }`}
                  />

                  <label className="font-bold block mb-2">Rol:</label>
                  <input
                    type="text"
                    value={editedUser.role}
                    onChange={(e) => handleInputChange("role", e.target.value)}
                    className={`border border-rosybrown rounded p-1 mb-2 ${
                      isEditing ? "bg-rosybrown-light" : ""
                    }`}
                  />

                  <label className="font-bold block mb-2">Email:</label>
                  <input
                    type="text"
                    value={editedUser.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={`border border-rosybrown rounded p-1 mb-2 ${
                      isEditing ? "bg-rosybrown-light" : ""
                    }`}
                  />

                  <label className="font-bold block mb-2">Código Postal:</label>
                  <input
                    type="text"
                    value={editedUser.codeP}
                    onChange={(e) => handleInputChange("codeP", e.target.value)}
                    className={`border border-rosybrown rounded p-1 mb-2 ${
                      isEditing ? "bg-rosybrown-light" : ""
                    }`}
                  />

                  <label className="font-bold block mb-2">Token:</label>
                  <input
                    type="text"
                    value={editedUser.token}
                    onChange={(e) => handleInputChange("token", e.target.value)}
                    className={`border border-rosybrown rounded p-1 mb-2 ${
                      isEditing ? "bg-rosybrown-light" : ""
                    }`}
                  />

                  <label className="font-bold block mb-2">Activo:</label>
                  {isEditing ? (
                    <select
                      value={editedUser.active ? "Sí" : "No"}
                      onChange={(e) =>
                        handleInputChange("active", e.target.value === "Sí")
                      }
                      className={`border border-rosybrown rounded p-1 mb-2 ${
                        isEditing ? "bg-rosybrown-light" : ""
                      }`}
                    >
                      <option value="Sí">Sí</option>
                      <option value="No">No</option>
                    </select>
                  ) : (
                    <p>{selectedUser.active ? "Sí" : "No"}</p>
                  )}
                </>
              ) : (
                <>
                  <p>
                    <span className="font-bold">Imagen:</span>{" "}
                    {selectedUser.img && (
                      <Image
                        src={selectedUser.img}
                        alt={`${selectedUser.name} ${selectedUser.lastname}`}
                        width={300}
                        height={300}
                        className="rounded-lg"
                      />
                    )}
                  </p>
                  <p>
                    <span className="font-bold">Nombre:</span>{" "}
                    {selectedUser.name}
                  </p>
                  <p>
                    <span className="font-bold">Apellido:</span>{" "}
                    {selectedUser.lastname}
                  </p>
                  <p>
                    <span className="font-bold">Nombre de usuario:</span>{" "}
                    {selectedUser.username}
                  </p>
                  <p>
                    <span className="font-bold">Dirección:</span>{" "}
                    {selectedUser.adress}
                  </p>
                  <p>
                    <span className="font-bold">Ciudad:</span>{" "}
                    {selectedUser.city}
                  </p>
                  <p>
                    <span className="font-bold">Provincia:</span>{" "}
                    {selectedUser.province}
                  </p>
                  <p>
                    <span className="font-bold">Rol:</span> {selectedUser.role}
                  </p>
                  <p>
                    <span className="font-bold">Email:</span>{" "}
                    {selectedUser.email}
                  </p>
                  <p>
                    <span className="font-bold">Código Postal:</span>{" "}
                    {selectedUser.codeP}
                  </p>
                  <p>
                    <span className="font-bold">Token:</span>{" "}
                    {selectedUser.token}
                  </p>
                  <p>
                    <span className="font-bold">Activo:</span>{" "}
                    {selectedUser.active ? "Sí" : "No"}
                  </p>
                </>
              )}
            </div>
          )}
        </Modal>
      </div>
    </LayoutAdmin>
  );
};

export default UsersPage;
