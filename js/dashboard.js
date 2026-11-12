if (requireLogin()) {
  function dashboardRender() {
    const session = getSession(), portfolio = getPortfolio(), balance = getBalance();
    const rows = Object.entries(portfolio).map(([id,h]) => {
      const s = stockById(id), current = h.quantity*s.price, pnl = current-h.invested;
      return `<tr><td><a href="stock-details.html?id=${id}"><b>${s.symbol}</b><small>${s.name}</small></a></td><td>${h.quantity}</td><td>${money(h.invested/h.quantity)}</td><td>${money(current)}</td><td class="${pnl>=0?"positive":"negative"}">${signed(pnl)}</td></tr>`;
    }).join("") || `<tr><td colspan="5" class="empty">No holdings yet. Explore stocks to make your first demo trade.</td></tr>`;
    const invested = Object.values(portfolio).reduce((a,h)=>a+h.invested,0);
    const current = Object.entries(portfolio).reduce((a,[id,h])=>a+h.quantity*stockById(id).price,0);
    const pnl = current-invested, pct = invested ? pnl/invested*100 : 0;
    const recent = getOrders().slice(0,5).map(o=>`<div class="transaction"><span class="avatar ${o.type==="BUY"?"buy":"sell"}">${o.type[0]}</span><span><b>${o.type} ${stockById(o.stockId).symbol}</b><small>${o.quantity} shares · ${new Date(o.date).toLocaleDateString()}</small></span><strong>${money(o.total)}</strong></div>`).join("") || `<p class="empty">Your transactions will appear here.</p>`;

    layout(`<main class="container py-5">
      <div class="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4"><div><span class="eyebrow">Overview</span><h1>Good morning, ${session.name.split(" ")[0]}</h1><p class="text-muted mb-0">Here is your investment snapshot.</p></div><a href="stocks.html" class="btn btn-primary"><i class="bi bi-plus-lg"></i> New investment</a></div>
      <div class="row g-3 mb-4">
        <div class="col-md-3"><div class="metric-card"><span>Portfolio value</span><strong>${money(current)}</strong><small class="${pnl>=0?"positive":"negative"}">${signed(pct,"%")} overall</small></div></div>
        <div class="col-md-3"><div class="metric-card"><span>Total invested</span><strong>${money(invested)}</strong><small>Across ${Object.keys(portfolio).length} stocks</small></div></div>
        <div class="col-md-3"><div class="metric-card"><span>Total P/L</span><strong class="${pnl>=0?"positive":"negative"}">${signed(pnl)}</strong><small class="${pnl>=0?"positive":"negative"}">${signed(pct,"%")}</small></div></div>
        <div class="col-md-3"><div class="metric-card"><span>Available cash</span><strong>${money(balance)}</strong><small>Demo balance</small></div></div>
      </div>
      <div class="row g-4"><div class="col-lg-8"><div class="card-panel"><div class="d-flex justify-content-between"><h3>Portfolio performance</h3><span class="badge-soft">Illustrative</span></div><canvas id="performanceChart" height="110"></canvas></div></div><div class="col-lg-4"><div class="card-panel"><h3>Market overview</h3>${MARKET_INDICES.map(i=>`<div class="mini-row"><span>${i.name}</span><span>${i.value}<small class="${i.positive?"positive":"negative"}">${i.percent}</small></span></div>`).join("")}</div></div></div>
      <div class="row g-4 mt-1"><div class="col-lg-8"><div class="card-panel"><div class="d-flex justify-content-between mb-3"><h3>Holdings</h3><a href="portfolio.html">View all</a></div><div class="table-responsive"><table class="table align-middle"><thead><tr><th>Stock</th><th>Qty</th><th>Avg. price</th><th>Value</th><th>P/L</th></tr></thead><tbody>${rows}</tbody></table></div></div></div><div class="col-lg-4"><div class="card-panel"><h3>Recent transactions</h3>${recent}</div></div></div>
    </main>`, "dashboard");

    new Chart(document.getElementById("performanceChart"), {type:"line", data:{labels:["Jan","Feb","Mar","Apr","May","Jun","Jul"],datasets:[{data:[100,103,101,108,112,110,115],borderColor:"#16a36a",backgroundColor:"rgba(22,163,106,.12)",fill:true,tension:.4,pointRadius:0}]},options:{plugins:{legend:{display:false}},scales:{y:{display:false},x:{grid:{display:false}}}}});
  }
  dashboardRender();
}
