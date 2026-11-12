if (requireLogin()) {
  function renderPortfolio() {
    const p=getPortfolio(), entries=Object.entries(p);
    const invested=entries.reduce((a,[,h])=>a+h.invested,0);
    const current=entries.reduce((a,[id,h])=>a+h.quantity*stockById(id).price,0);
    const pnl=current-invested, pct=invested?pnl/invested*100:0;
    const rows=entries.map(([id,h])=>{const s=stockById(id), value=s.price*h.quantity, gain=value-h.invested;return `<tr><td><a href="stock-details.html?id=${id}"><b>${s.symbol}</b><small>${s.name}</small></a></td><td>${h.quantity}</td><td>${money(h.invested/h.quantity)}</td><td>${money(s.price)}</td><td>${money(value)}</td><td class="${gain>=0?"positive":"negative"}">${signed(gain)}<small>${signed(gain/h.invested*100,"%")}</small></td><td><button class="btn btn-sm btn-outline-danger sell" data-id="${id}">Sell</button></td></tr>`}).join("") || `<tr><td colspan="7" class="empty">No holdings yet.</td></tr>`;
    layout(`<main class="container py-5"><div class="mb-4"><span class="eyebrow">Your investments</span><h1>Portfolio</h1></div><div class="row g-3 mb-4"><div class="col-md-4"><div class="metric-card"><span>Current value</span><strong>${money(current)}</strong></div></div><div class="col-md-4"><div class="metric-card"><span>Invested value</span><strong>${money(invested)}</strong></div></div><div class="col-md-4"><div class="metric-card"><span>Total returns</span><strong class="${pnl>=0?"positive":"negative"}">${signed(pnl)}</strong><small>${signed(pct,"%")}</small></div></div></div><div class="row g-4"><div class="col-lg-8"><div class="card-panel"><div class="table-responsive"><table class="table align-middle"><thead><tr><th>Stock</th><th>Qty</th><th>Avg. buy</th><th>Current</th><th>Value</th><th>P/L</th><th></th></tr></thead><tbody>${rows}</tbody></table></div></div></div><div class="col-lg-4"><div class="card-panel"><h3>Allocation</h3><canvas id="allocation" height="250"></canvas></div></div></div></main>${modalMarkup()}`, "portfolio");
    document.querySelectorAll(".sell").forEach(b=>b.onclick=()=>openTrade("SELL",b.dataset.id));
    bindTradeModal(renderPortfolio);
    if(entries.length)new Chart(document.getElementById("allocation"),{type:"doughnut",data:{labels:entries.map(([id])=>stockById(id).symbol),datasets:[{data:entries.map(([id,h])=>h.quantity*stockById(id).price),backgroundColor:["#174d3b","#16a36a","#78b89e","#f0b44d","#e5484d"]}]},options:{plugins:{legend:{position:"bottom"}}}});
  }
  renderPortfolio();
}
