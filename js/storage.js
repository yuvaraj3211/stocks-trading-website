const STORAGE = {
  users:"equitrade_users",
  session:"equitrade_session",
  watchlist:"equitrade_watchlist",
  portfolio:"equitrade_portfolio",
  orders:"equitrade_orders",
  balance:"equitrade_balance",
  profile:"equitrade_profile"
};

function read(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
  catch { return fallback; }
}

function write(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function currentEmail() {
  return read(STORAGE.session, null)?.email || null;
}

function scoped(key) {
  const email = currentEmail();
  return email ? `${key}_${email.toLowerCase()}` : key;
}

function getSession() {
  return read(STORAGE.session, null);
}

function setSession(user) {
  write(STORAGE.session, user);
}

function clearSession() {
  localStorage.removeItem(STORAGE.session);
}

function getUsers() {
  return read(STORAGE.users, []);
}

function saveUsers(users) {
  write(STORAGE.users, users);
}

function getWatchlist() {
  return read(scoped(STORAGE.watchlist), []);
}

function saveWatchlist(list) {
  write(scoped(STORAGE.watchlist), list);
}

function getPortfolio() {
  return read(scoped(STORAGE.portfolio), {});
}

function savePortfolio(portfolio) {
  write(scoped(STORAGE.portfolio), portfolio);
}

function getOrders() {
  return read(scoped(STORAGE.orders), []);
}

function saveOrders(orders) {
  write(scoped(STORAGE.orders), orders);
}

function getBalance() {
  return read(scoped(STORAGE.balance), 1000000);
}

function saveBalance(balance) {
  write(scoped(STORAGE.balance), balance);
}

function getProfile() {
  const session = getSession() || {};
  return read(scoped(STORAGE.profile), {
    name:session.name || "",
    email:session.email || "",
    phone:"",
    city:"",
    risk:"Moderate"
  });
}

function saveProfile(profile) {
  write(scoped(STORAGE.profile), profile);
}

function initializeAccount(user) {
  setSession(user);
  saveWatchlist([]);
  savePortfolio({});
  saveOrders([]);
  saveBalance(1000000);
  saveProfile({
    name:user.name,
    email:user.email,
    phone:"",
    city:"",
    risk:"Moderate"
  });
}
