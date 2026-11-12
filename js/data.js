const STOCKS = [
  {
    id:"reliance", name:"Reliance Industries", symbol:"RELIANCE", sector:"Energy",
    price:2942.35, change:42.15, percent:1.45, cap:"₹19.9T",
    description:"A diversified Indian enterprise with businesses across energy, retail, telecommunications and digital services."
  },
  {
    id:"tcs", name:"Tata Consultancy Services", symbol:"TCS", sector:"Technology",
    price:3890.20, change:-18.40, percent:-0.47, cap:"₹14.1T",
    description:"A global IT services, consulting and business solutions organisation from the Tata Group."
  },
  {
    id:"infosys", name:"Infosys", symbol:"INFY", sector:"Technology",
    price:1718.60, change:25.80, percent:1.52, cap:"₹7.1T",
    description:"A global leader in next-generation digital services and consulting."
  },
  {
    id:"hdfc-bank", name:"HDFC Bank", symbol:"HDFCBANK", sector:"Banking",
    price:1682.15, change:12.60, percent:0.75, cap:"₹12.8T",
    description:"One of India's largest private sector banks serving retail and corporate customers."
  },
  {
    id:"icici-bank", name:"ICICI Bank", symbol:"ICICIBANK", sector:"Banking",
    price:1245.80, change:-8.20, percent:-0.65, cap:"₹8.8T",
    description:"A diversified financial services group offering banking and investment products."
  },
  {
    id:"itc", name:"ITC Limited", symbol:"ITC", sector:"FMCG",
    price:465.25, change:4.75, percent:1.03, cap:"₹5.8T",
    description:"A diversified Indian company with leading businesses in FMCG, hotels, paperboards and agriculture."
  },
  {
    id:"wipro", name:"Wipro", symbol:"WIPRO", sector:"Technology",
    price:512.40, change:-6.10, percent:-1.18, cap:"₹2.7T",
    description:"A technology services and consulting company helping clients solve complex digital challenges."
  },
  {
    id:"tata-motors", name:"Tata Motors", symbol:"TATAMOTORS", sector:"Automobile",
    price:978.35, change:21.90, percent:2.29, cap:"₹3.6T",
    description:"An automobile manufacturer with passenger, commercial and electric vehicle businesses."
  },
  {
    id:"sbi", name:"State Bank of India", symbol:"SBIN", sector:"Banking",
    price:812.75, change:7.35, percent:0.91, cap:"₹7.3T",
    description:"India's largest public sector bank with a broad domestic and international presence."
  },
  {
    id:"airtel", name:"Bharti Airtel", symbol:"BHARTIARTL", sector:"Telecom",
    price:1435.60, change:16.70, percent:1.18, cap:"₹8.6T",
    description:"A leading telecommunications company providing mobile, broadband and digital services."
  }
];

const MARKET_INDICES = [
  {name:"NIFTY 50", value:"22,458.80", change:"+124.10", percent:"+0.56%", positive:true},
  {name:"SENSEX", value:"73,872.29", change:"+408.86", percent:"+0.56%", positive:true},
  {name:"BANK NIFTY", value:"47,832.15", change:"-82.40", percent:"-0.17%", positive:false}
];

const NEWS = [
  ["Market outlook","Indian benchmarks hold firm as investors assess earnings momentum and global cues.","Market Update"],
  ["Technology watch","Technology stocks remain in focus as demand for cloud and digital services grows.","Company News"],
  ["Policy monitor","Analysts expect infrastructure and manufacturing to remain important economic themes.","Economy"],
  ["Investor education","Diversification can help investors manage concentration risk over longer horizons.","Insights"],
  ["Banking sector","Financial stocks trade actively as credit growth remains a key market indicator.","Market Update"],
  ["Auto focus","Electric mobility and premiumisation continue to shape the automobile sector.","Company News"]
];
