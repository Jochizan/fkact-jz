import { useEffect, useState } from "react";

const initialState = {
  name: "",
  email: "",
  password: "",
};

const API = process.env.REACT_APP_API;

const Users = () => {
  const [form, setForm] = useState(initialState);
  const [users, setUsers] = useState([]);
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(API);
    if (!edit) {
      const response = await fetch(API + "/users", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await response.json();

      console.log(data);
    } else {
      const response = await fetch(`${API}/users/${id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await response.json();

      setEdit(false);
      console.log(data);
    }

    await getUsers();

    setForm(initialState);
  };

  const getUsers = async () => {
    const response = await fetch(API + "/users");
    const data = await response.json();
    //console.log(data);
    setUsers(data);
  };

  const deleteUser = async (id) => {
    const userResponse = window.confirm(
      "Esta seguro de eliminar el usuario con el id " + id
    );
    if (userResponse) {
      const response = await fetch(`${API}/users/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();

      console.log(data);

      await getUsers();
    }
  };

  const editUser = async (id) => {
    const response = await fetch(`${API}/user/${id}`);
    const data = await response.json();

    setId(id);
    setEdit(true);
    setForm(data);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="row">
      <div className="col-md-4">
        <form onSubmit={handleSubmit} className="card card-body">
          <div className="form-group">
            <label htmlFor="name" className="fw-normal">
              Nombres
            </label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              autoFocus
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="fw-normal">
              Email
            </label>
            <input
              type="text"
              name="email"
              className="form-control"
              placeholder="Correo"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="fw-normal">
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Contraseña"
              value={form.password}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary btn-block m-2">
            {edit ? "Actualizar" : "Crear Cuenta"}
          </button>
        </form>
      </div>
      <div className="col-md-8">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Password</th>
              <th>Operations</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td className="fw-normal">{user.name}</td>
                <td className="fw-normal">{user.email}</td>
                <td className="fw-normal">{user.password}</td>
                <td className="d-flex justify-content-center align-items-center">
                  <button
                    className="btn btn-warning btn-sm btn-block"
                    onClick={() => editUser(user._id)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-danger btn-sm btn-block"
                    onClick={() => deleteUser(user._id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
