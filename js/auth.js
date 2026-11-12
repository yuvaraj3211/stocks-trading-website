const page = document.body.dataset.page;

function authPage() {
  const signup = page === "signup";
  document.getElementById("app").innerHTML = `
    <div class="auth-page">
      <div class="auth-brand"><a href="index.html" class="brand"><span class="brand-mark"><i class="bi bi-graph-up-arrow"></i></span> EquiTrade</a></div>
      <div class="auth-card">
        <div class="text-center mb-4">
          <h1>${signup ? "Create your account" : "Welcome back"}</h1>
          <p class="text-muted">${signup ? "Start exploring investing with a demo account." : "Log in to access your investment workspace."}</p>
        </div>
        <div id="authError" class="alert alert-danger d-none"></div>
        <form id="authForm">
          ${signup ? `<label class="form-label">Full name</label><input id="name" class="form-control mb-3" required minlength="2">` : ""}
          <label class="form-label">Email address</label>
          <input id="email" class="form-control mb-3" type="email" required>
          <label class="form-label">Password</label>
          <div class="input-group mb-3"><input id="password" class="form-control" type="password" required minlength="6"><button type="button" class="btn btn-outline-secondary" id="togglePassword"><i class="bi bi-eye"></i></button></div>
          ${signup ? `<label class="form-label">Confirm password</label><input id="confirm" class="form-control mb-3" type="password" required minlength="6">` : ""}
          <button class="btn btn-primary w-100 py-3">${signup ? "Create demo account" : "Log in"}</button>
        </form>
        <p class="text-center mt-4 mb-0">${signup ? "Already have an account?" : "New to EquiTrade?"} <a href="${signup ? "login.html" : "signup.html"}">${signup ? "Log in" : "Create an account"}</a></p>
        <p class="small text-muted text-center mt-3">Demo authentication only. Do not use real passwords.</p>
      </div>
    </div>`;

  document.getElementById("togglePassword").onclick = () => {
    const input = document.getElementById("password");
    input.type = input.type === "password" ? "text" : "password";
  };

  document.getElementById("authForm").onsubmit = e => {
    e.preventDefault();
    const error = document.getElementById("authError");
    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value;
    const users = getUsers();

    if (signup) {
      const name = document.getElementById("name").value.trim();
      const confirm = document.getElementById("confirm").value;
      if (password !== confirm) return showError("Passwords do not match.");
      if (users.some(user => user.email === email)) return showError("An account with this email already exists.");
      const user = {name,email,password};
      users.push(user);
      saveUsers(users);
      initializeAccount(user);
      location.href = "dashboard.html";
    } else {
      const user = users.find(item => item.email === email && item.password === password);
      if (!user) return showError("Incorrect email or password.");
      setSession(user);
      location.href = getQuery("next") || "dashboard.html";
    }

    function showError(message) {
      error.textContent = message;
      error.classList.remove("d-none");
    }
  };
}

authPage();
