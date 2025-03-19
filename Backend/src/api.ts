import axios from 'axios';
import { User, Stock, Order, Trade, OrderBook } from './types';

const API_BASE_URL = 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const loginUser = async (account: string): Promise<User> => {
  const response = await api.post('/users/login', { account });
  return response.data.user;
};

export const requestTokens = async (account: string, amount: number): Promise<User> => {
  const response = await api.post('/users/faucet', { account, amount });
  return response.data.user;
};

export const getStocks = async (): Promise<Stock[]> => {
  const response = await api.get('/stocks');
  return response.data;
};

export const placeOrder = async (order: Order) => {
  const response = await api.post('/orders', order);
  return response.data;
};

export const getOrderBook = async (): Promise<OrderBook> => {
  const response = await api.get('/orders/orderbook');
  return response.data;
};

export const getTrades = async (): Promise<Trade[]> => {
  const response = await api.get('/orders/trades');
  return response.data;
};