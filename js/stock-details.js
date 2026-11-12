if (requireLogin()) {
  const stock = stockById(getQuery("id")) || STOCKS[0];
  function renderDetails() {
    const watched = getWatchlist().includes(stock.id);
    layout(`<main class="container py-5">
      <a href="stocks.html" class="back-link"><i class="bi bi-arrow-left"></i> Back to stocks</a>
      <div class="row g-4 mt-2"><div class="col-lg-8"><div class="card-panel">
        <div class="d-flex justify-content-between flex-wrap gap-3"><div><span class="eyebrow">${stock.sector}</span><h1>${stock.name}</h1><p class="text-muted">${stock.symbol} · Demo price</p></div><div class="text-lg-end"><h2>${money(stock.price)}</h2><span class="${stock.percent>=0?"positive":"negative"}">${signed(stock.change)} (${signed(stock.percent,"%")})</span></div></div>
        <div class="chart-filters my-4">${["1D","1W","1M","6M","1Y"].map((x,i)=>`<button class="btn btn-sm ${i===2?"active":""}" data-range="${x}">${x}</button>`).join("")}</div><canvas id="stockChart" height="120"></canvas>
      </div></div><div class="col-lg-4"><div class="card-panel"><h3>Trade ${stock.symbol}</h3><p class="text-muted">${stock.description}</p><div class="detail-grid"><span>Market cap<b>${stock.cap}</b></span><span>52-week high<b>${money(stock.price*1.22)}</b></span><span>52-week low<b>${money(stock.price*.78)}</b></span><span>Sector<b>${stock.sector}</b></span></div><div class="d-flex gap-2 mt-4"><button class="btn btn-primary flex-fill trade" data-type="BUY">Buy</button><button class="btn btn-outline-danger flex-fill trade" data-type="SELL">Sell</button></div><button id="watch" class="btn btn-light w-100 mt-2"><i class="bi bi-star${watched?"-fill":""}"></i> ${watched?"Remove from":"Add to"} watchlist</button></div></div></div>
    </main>${modalMarkup()}`, "stocks");
    const values = Array.from({length:30},(_,i)=>stock.price*(.94 + i*.002 + Math.random()*.025));
    new Chart(document.getElementById("stockChart"),{type:"line",data:{labels:values.map((_,i)=>i+1),datasets:[{data:values,borderColor:"#174d3b",backgroundColor:"rgba(23,77,59,.1)",fill:true,tension:.35,pointRadius:0}]},options:{plugins:{legend:{display:false}},scales:{x:{display:false},y:{grid:{color:"#edf1ee"}}}}});
    document.querySelectorAll(".trade").forEach(b=>b.onclick=()=>openTrade(b.dataset.type,stock.id));
    document.getElementById("watch").onclick=()=>{let l=getWatchlist(),i=l.indexOf(stock.id);i>=0?l.splice(i,1):l.push(stock.id);saveWatchlist(l);renderDetails();toast(i>=0?"Removed from watchlist.":"Added to watchlist.");};
    document.querySelectorAll("[data-range]").forEach(b=>b.onclick=()=>{document.querySelectorAll("[data-range]").forEach(x=>x.classList.remove("active"));b.classList.add("active");});
    bindTradeModal(renderDetails);
  }
  renderDetails();
}
