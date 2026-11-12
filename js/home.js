const indexCards = MARKET_INDICES.map(index => `
  <div class="col-md-4"><div class="index-card">
    <div class="d-flex justify-content-between"><span>${index.name}</span><i class="bi bi-bar-chart-line"></i></div>
    <h3>${index.value}</h3><span class="${index.positive ? "positive" : "negative"}">${index.change} (${index.percent})</span>
  </div></div>`).join("");

const trending = STOCKS.slice(0,5).map(stock => `
  <a href="stock-details.html?id=${stock.id}" class="stock-row">
    <span><b>${stock.symbol}</b><small>${stock.name}</small></span>
    <span class="text-end"><b>${money(stock.price)}</b><small class="${stock.percent >= 0 ? "positive":"negative"}">${signed(stock.percent,"%")}</small></span>
  </a>`).join("");

layout(`
<header class="hero">
  <div class="container">
    <div class="row align-items-center g-5">
      <div class="col-lg-7">
        <span class="eyebrow">A clearer way to invest</span>
        <h1>Build your financial future, one decision at a time.</h1>
        <p class="lead">Explore stocks, understand your portfolio and practise investing with a transparent demo experience built for modern investors.</p>
        <div class="d-flex gap-3 flex-wrap"><a class="btn btn-primary btn-lg" href="signup.html">Start investing <i class="bi bi-arrow-right"></i></a><a class="btn btn-outline-dark btn-lg" href="stocks.html">Explore markets</a></div>
        <p class="small text-muted mt-4"><i class="bi bi-shield-check"></i> Demo platform · No real money involved</p>
      </div>
      <div class="col-lg-5"><div class="hero-visual"><div class="floating-value"><small>Portfolio value</small><strong>₹12,84,650</strong><span class="positive">+12.84%</span></div><div class="hero-chart"><i class="bi bi-graph-up-arrow"></i></div></div></div>
    </div>
  </div>
</header>
<section class="container py-5"><div class="section-heading"><span class="eyebrow">Market pulse</span><h2>Keep an eye on the market</h2></div><div class="row g-3">${indexCards}</div></section>
<section class="container py-5"><div class="row g-4"><div class="col-lg-7"><div class="card-panel"><div class="section-heading"><span class="eyebrow">Popular today</span><h3>Trending stocks</h3></div>${trending}</div></div><div class="col-lg-5"><div class="card-panel h-100"><div class="section-heading"><span class="eyebrow">Market movers</span><h3>Top gainers & losers</h3></div>${STOCKS.slice(5,9).map(s=>`<div class="mini-row"><span>${s.symbol}</span><span class="${s.percent>=0?"positive":"negative"}">${signed(s.percent,"%")}</span></div>`).join("")}</div></div></div></section>
<section class="soft-section"><div class="container py-5"><div class="section-heading text-center"><span class="eyebrow">Why EquiTrade</span><h2>Invest with more clarity</h2></div><div class="row g-4"><div class="col-md-4"><div class="feature-card"><i class="bi bi-lightning-charge"></i><h4>Simple by design</h4><p>Focused tools and clean information help you make sense of every decision.</p></div></div><div class="col-md-4"><div class="feature-card"><i class="bi bi-pie-chart"></i><h4>See the whole picture</h4><p>Track holdings, allocation, returns and transactions from one workspace.</p></div></div><div class="col-md-4"><div class="feature-card"><i class="bi bi-mortarboard"></i><h4>Learn as you go</h4><p>Use a risk-free simulated account to build confidence before investing.</p></div></div></div></div></section>`);
