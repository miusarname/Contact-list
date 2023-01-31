import { useState, useEffect } from "react";

function App() {
  const [state, setState] = useState({
    name: "",
    number: "",
    email: "",
    contacts: [],
    _id: "",
  });

  useEffect(() => {
    fetchContacts();
  }, []);

  function fetchContacts() {
    fetch("api/contacts")
      .then((res) => res.json())
      .then((data) => {
        setState({ contacts: data });
        console.log(state.contacts);
      });
  }

  function editContact(id) {
    fetch("/api/contacts/" + id)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setState({
          name: data.name,
          number: data.number,
          email: data.email,
          _id: data._id,
        });
      });
  }

  function addContact(e) {
    if (state._id) {
      fetch("/api/contacts/" + state._id, {
        method: "PUT",
        body: JSON.stringify(state),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          M.toast({html:'Contact Modified'})
          setState({
            name: "",
            number: "",
            _id: "",
            email: "",
          });
          fetchContacts();
        });
    } else {
      fetch("/api/contacts", {
        method: "POST",
        body: JSON.stringify(state),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          M.toast({ html: "Contact saved" });
          setState({
            name: "",
            number: "",
            email: "",
          });
          fetchContacts();
        })
        .catch((err) => console.log("We have a error : " + err));
    }
    e.preventDefault();
  }

  function deleteContact(id) {
    if (
      confirm(
        "Are you sure to perform this action? once done it cannot be undone"
      )
    ) {
      fetch("/api/contacts/" + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          M.toast({ html: "Contact Deleted" });
          fetchContacts();
        });
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  }

  return (
    <div className="App">
      {/* Navbar */}
      <nav className="light-blue darken-4">
        <div className="container">
          <div className="nav-wrapper">
            <a href="#" className="brand-logo">
              Contact list
            </a>
          </div>
        </div>
      </nav>

      <div className="container">
        <div className="row">
          <div className="col s5">
            <div className="card">
              <div className="card-content">
                <form onSubmit={addContact}>
                  <div className="row">
                    <div className="input-field col s12">
                      <input
                        onChange={handleChange}
                        type="text"
                        value={state.name}
                        name="name"
                        placeholder="Name contact"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12">
                      <input
                        onChange={handleChange}
                        type="number"
                        value={state.number}
                        name="number"
                        placeholder="Number of contact"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12">
                      <input
                        onChange={handleChange}
                        type="email"
                        name="email"
                        value={state.email}
                        placeholder="Email of contact"
                      />
                    </div>
                  </div>
                  <button type="submit" className="btn light-blue darken-4">
                    Send
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="col s7">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Number</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {state.contacts?.map((contact) => {
                return (
                  <tr key={contact._id}>
                    <td>{contact.name}</td>
                    <td>{contact.number}</td>
                    <td>{contact.email}</td>
                    <td>
                      <button
                        onClick={() => {
                          deleteContact(contact._id);
                        }}
                        className="btn light-blue darken-4"
                      >
                        <i class="material-icons">delete</i>
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => {
                          editContact(contact._id);
                        }}
                        className="btn light-blue darken-4"
                      >
                        <i class="material-icons">border_color</i>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
