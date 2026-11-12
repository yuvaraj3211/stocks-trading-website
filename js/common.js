function money(value) {
  return "₹" + Number(value || 0).toLocaleString("en-IN", {
    maximumFractionDigits:2,
    minimumFractionDigits:2
  });
}

function signed(value, suffix="") {
  return `${Number(value) >= 0 ? "+" : ""}${Number(value).toFixed(2)}${suffix}`;
}

function stockById(id) {
  return STOCKS.find(stock => stock.id === id);
}

function isLoggedIn() {
  return !!getSession();
}

function requireLogin() {
  if (!isLoggedIn()) {
    location.href = "login.html?next=" + encodeURIComponent(location.pathname.split("/").pop());
    return false;
  }
  return true;
}

function nav(active) {
  const session = getSession();
  return `
  <nav class="navbar navbar-expand-lg navbar-light bg-white border-bottom sticky-top">
    <div class="container">
      <a class="navbar-brand brand" href="index.html">
        <span class="brand-mark"><i class="bi bi-graph-up-arrow"></i></span> EquiTrade
      </a>
      <button class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#mainNav">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="mainNav">
        <ul class="navbar-nav ms-auto align-items-lg-center gap-lg-2">
          <li><a class="nav-link ${active==="stocks"?"active":""}" href="stocks.html">Markets</a></li>
          <li><a class="nav-link ${active==="news"?"active":""}" href="news.html">News</a></li>
          ${
            session
            ? `<li><a class="nav-link ${active==="dashboard"?"active":""}" href="dashboard.html">Dashboard</a>
               <li><a class="nav-link ${active==="portfolio"?"active":""}" href="portfolio.html">Portfolio</a>
               <li><a class="nav-link ${active==="watchlist"?"active":""}" href="watchlist.html">Watchlist</a>
               <li><a class="nav-link ${active==="orders"?"active":""}" href="orders.html">Orders</a>
               <li class="nav-item dropdown">
                 <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#">
                   <i class="bi bi-person-circle"></i> ${session.name.split(" ")[0]}
                 </a>
                 <ul class="dropdown-menu dropdown-menu-end">
                   <li><a class="dropdown-item" href="profile.html">Profile</a></li>
                   <li><hr class="dropdown-divider"></li>
                   <li><button class="dropdown-item" id="logoutBtn">Log out</button></li>
                 </ul>
               </li>`
            : `<li><a class="btn btn-outline-primary ms-lg-2" href="login.html">Log in</a></li>
               <li><a class="btn btn-primary" href="signup.html">Get started</a></li>`
          }
        </ul>
      </div>
    </div>
  </nav>`;
}

function footer() {
  return `
  <footer class="footer mt-5">
    <div class="container py-5">
      <div class="row g-4">
        <div class="col-md-5">
          <div class="brand text-white mb-3"><span class="brand-mark"><i class="bi bi-graph-up-arrow"></i></span> EquiTrade</div>
          <p class="text-white-50">A simple, transparent and educational platform for exploring investing.</p>
        </div>
        <div class="col-6 col-md-2"><h6>Explore</h6><a href="stocks.html">Markets</a><a href="news.html">News</a></div>
        <div class="col-6 col-md-2"><h6>Account</h6><a href="login.html">Log in</a><a href="signup.html">Sign up</a></div>
        <div class="col-12 col-md-3"><h6>Disclaimer</h6><p class="small text-white-50">Demo prices are illustrative and are not live market quotations or investment advice.</p></div>
      </div>
      <hr class="border-secondary">
      <small class="text-white-50">© 2025 EquiTrade. Demo platform only.</small>
    </div>
  </footer>`;
}

function layout(content, active="") {
  document.getElementById("app").innerHTML = nav(active) + content + footer();
  document.getElementById("logoutBtn")?.addEventListener("click", () => {
    clearSession();
    location.href = "index.html";
  });
}

function toast(message, type="success") {
  const el = document.createElement("div");
  el.className = `toast-msg ${type}`;
  el.textContent = message;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 2800);
}

function getQuery(name) {
  return new URLSearchParams(location.search).get(name);
}

function modalMarkup() {
  return `
  <div class="modal fade" id="tradeModal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header"><h5 id="tradeTitle">Trade stock</h5><button class="btn-close" data-bs-dismiss="modal"></button></div>
        <form id="tradeForm">
          <div class="modal-body">
            <p id="tradeStockLabel" class="fw-semibold"></p>
            <input type="hidden" id="tradeType"><input type="hidden" id="tradeStock">
            <label class="form-label">Quantity</label>
            <input id="tradeQuantity" class="form-control" type="number" min="1" step="1" required>
            <div class="small text-muted mt-2" id="tradeEstimate"></div>
            <div class="alert alert-warning small mt-3 mb-0">This is a simulated transaction using demo funds.</div>
          </div>
          <div class="modal-footer"><button class="btn btn-light" data-bs-dismiss="modal">Cancel</button><button class="btn btn-primary">Confirm</button></div>
        </form>
      </div>
    </div>
  </div>`;
}

function openTrade(type, stockId) {
  const stock = stockById(stockId);
  if (!stock) return;
  document.getElementById("tradeType").value = type;
  document.getElementById("tradeStock").value = stockId;
  document.getElementById("tradeTitle").textContent = `${type} ${stock.symbol}`;
  document.getElementById("tradeStockLabel").textContent = `${stock.name} · ${money(stock.price)}`;
  document.getElementById("tradeQuantity").value = "";
  document.getElementById("tradeEstimate").textContent = "";
  new bootstrap.Modal("#tradeModal").show();
}

function bindTradeModal(refresh) {
  document.getElementById("tradeQuantity")?.addEventListener("input", e => {
    const stock = stockById(document.getElementById("tradeStock").value);
    document.getElementById("tradeEstimate").textContent = stock ? `Estimated value: ${money(stock.price * Number(e.target.value || 0))}` : "";
  });

  document.getElementById("tradeForm")?.addEventListener("submit", e => {
    e.preventDefault();
    const type = document.getElementById("tradeType").value;
    const id = document.getElementById("tradeStock").value;
    const quantity = Number(document.getElementById("tradeQuantity").value);
    const stock = stockById(id);

    if (!quantity || quantity < 1) return toast("Enter a valid quantity.", "error");

    const portfolio = getPortfolio();
    const holding = portfolio[id] || {quantity:0, invested:0};

    if (type === "BUY") {
      const total = quantity * stock.price;
      if (total > getBalance()) return toast("Insufficient demo cash.", "error");
      holding.invested += total;
      holding.quantity += quantity;
      portfolio[id] = holding;
      saveBalance(getBalance() - total);
    } else {
      if (quantity > holding.quantity) return toast("You cannot sell more shares than you own.", "error");
      const average = holding.invested / holding.quantity;
      holding.quantity -= quantity;
      holding.invested -= average * quantity;
      if (holding.quantity <= 0) delete portfolio[id];
      else portfolio[id] = holding;
      saveBalance(getBalance() + quantity * stock.price);
    }

    const orders = getOrders();
    orders.unshift({
      id:Date.now(),
      stockId:id,
      type,
      quantity,
      price:stock.price,
      total:quantity * stock.price,
      date:new Date().toISOString(),
      status:"Executed"
    });
    savePortfolio(portfolio);
    saveOrders(orders);
    bootstrap.Modal.getInstance(document.getElementById("tradeModal"))?.hide();
    toast(`${type} order executed successfully.`);
    refresh?.();
  });
}
