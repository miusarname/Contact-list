import { useState, useEffect } from "react";

function App() {
  const [state, setState] = useState({
    name: "",
    number: "",
    email: "",
  });

  function addContact(e) {
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
      })
      .catch((err) => console.log("We have a error : " + err));
    e.preventDefault();
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
                        type="text"
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

        <div className="col s7"></div>
      </div>
    </div>
  );
}

export default App;
