export interface User {
  _id: string;
  account: string;
  balance: number;
  stocks: Stock[];
}

export interface Stock {
  _id: string;
  name: string;
  ticker: string;
  price: number;
  lastUpdated: string;
}

export interface Order {
  ticker: string;
  type: 'buy' | 'sell';
  price: number;
  quantity: number;
  trader: string;
}

export interface Trade {
  _id: string;
  tradeId: string;
  ticker: string;
  price: number;
  quantity: number;
  buyTrader: string;
  sellTrader: string;
  timestamp: string;
}

export interface OrderBook {
  buyOrders: Order[];
  sellOrders: Order[];
}