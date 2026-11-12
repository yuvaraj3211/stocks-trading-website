if (requireLogin()) {
  function renderStocks() {
    const query = (document.getElementById("stockSearch")?.value || "").toLowerCase();
    const sector = document.getElementById("sectorFilter")?.value || "";
    const sort = document.getElementById("sortFilter")?.value || "";
    let list = STOCKS.filter(s => (!query || `${s.name} ${s.symbol}`.toLowerCase().includes(query)) && (!sector || s.sector === sector));
    if (sort === "price") list.sort((a,b)=>b.price-a.price);
    if (sort === "change") list.sort((a,b)=>b.percent-a.percent);
    const watch = getWatchlist();

    document.getElementById("stockRows").innerHTML = list.map(s=>`
      <tr><td><a href="stock-details.html?id=${s.id}"><b>${s.symbol}</b><small>${s.name}</small></a></td><td>${s.sector}</td><td>${money(s.price)}</td><td class="${s.change>=0?"positive":"negative"}">${signed(s.change)}</td><td class="${s.percent>=0?"positive":"negative"}">${signed(s.percent,"%")}</td><td>${s.cap}</td><td class="text-end"><button class="icon-btn watchBtn" data-id="${s.id}" title="Watchlist"><i class="bi bi-star${watch.includes(s.id)?"-fill":""}"></i></button><a href="stock-details.html?id=${s.id}" class="btn btn-sm btn-light">View</a></td></tr>`).join("") || `<tr><td colspan="7" class="empty">No stocks match your search.</td></tr>`;

    document.querySelectorAll(".watchBtn").forEach(btn=>btn.onclick=()=>{
      const id=btn.dataset.id, list=getWatchlist(), index=list.indexOf(id);
      index>=0 ? list.splice(index,1) : list.push(id);
      saveWatchlist(list); renderStocks(); toast(index>=0?"Removed from watchlist.":"Added to watchlist.");
    });
  }

  layout(`<main class="container py-5"><div class="mb-4"><span class="eyebrow">Explore markets</span><h1>Stocks</h1><p class="text-muted">Illustrative demo prices, not live quotations.</p></div>
  <div class="card-panel mb-4"><div class="row g-3"><div class="col-lg-5"><div class="input-group"><span class="input-group-text"><i class="bi bi-search"></i></span><input id="stockSearch" class="form-control" placeholder="Search company or symbol"></div></div><div class="col-md-3"><select id="sectorFilter" class="form-select"><option value="">All sectors</option>${[...new Set(STOCKS.map(s=>s.sector))].map(s=>`<option>${s}</option>`).join("")}</select></div><div class="col-md-3"><select id="sortFilter" class="form-select"><option value="">Sort by</option><option value="price">Highest price</option><option value="change">Top daily change</option></select></div></div></div>
  <div class="card-panel"><div class="table-responsive"><table class="table align-middle market-table"><thead><tr><th>Company</th><th>Sector</th><th>Price</th><th>Change</th><th>% Change</th><th>Market cap</th><th></th></tr></thead><tbody id="stockRows"></tbody></table></div></div></main>`, "stocks");
  ["stockSearch","sectorFilter","sortFilter"].forEach(id=>document.getElementById(id).addEventListener("input",renderStocks));
  renderStocks();
}
