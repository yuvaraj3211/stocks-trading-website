if (requireLogin()) {
  function renderWatchlist() {
    const list=getWatchlist();
    layout(`<main class="container py-5"><div class="mb-4"><span class="eyebrow">Keep watching</span><h1>Watchlist</h1><p class="text-muted">Save companies you want to follow.</p></div><div class="row g-3">${list.map(id=>{const s=stockById(id);return `<div class="col-md-6 col-lg-4"><div class="card-panel stock-watch"><div><span class="eyebrow">${s.sector}</span><h4>${s.symbol}</h4><p>${s.name}</p></div><strong>${money(s.price)}</strong><span class="${s.percent>=0?"positive":"negative"}">${signed(s.percent,"%")}</span><div class="mt-3 d-flex gap-2"><a class="btn btn-light flex-fill" href="stock-details.html?id=${s.id}">Details</a><button class="btn btn-outline-danger remove" data-id="${s.id}"><i class="bi bi-trash"></i></button></div></div></div>`}).join("") || `<div class="col-12"><div class="empty-panel"><i class="bi bi-star"></i><h3>Your watchlist is empty</h3><p>Save stocks from the Markets page to see them here.</p><a href="stocks.html" class="btn btn-primary">Explore stocks</a></div></div>`}</div></main>`, "watchlist");
    document.querySelectorAll(".remove").forEach(b=>b.onclick=()=>{saveWatchlist(getWatchlist().filter(x=>x!==b.dataset.id));renderWatchlist();toast("Removed from watchlist.");});
  } renderWatchlist();
}
