import React, { useState, useEffect } from 'react';
import { TrendingUp, DollarSign, BarChart } from 'lucide-react';
import { getStocks, getOrderBook, getTrades, placeOrder } from '../api';
import { Stock, Order, Trade, OrderBook, User } from '../types';
import { PriceChart } from './PriceChart';
import toast from 'react-hot-toast';

interface Props {
  user: User;
  onOrderPlaced: () => void;
  onLogout: () => void;
}

export const TradingInterface: React.FC<Props> = ({ user, onOrderPlaced, onLogout }) => {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [orderBook, setOrderBook] = useState<OrderBook>({ buyOrders: [], sellOrders: [] });
  const [trades, setTrades] = useState<Trade[]>([]);
  const [selectedStock, setSelectedStock] = useState<string>('');
  const [orderType, setOrderType] = useState<'buy' | 'sell'>('buy');
  const [price, setPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [stocksData, orderBookData, tradesData] = await Promise.all([
          getStocks(),
          getOrderBook(),
          getTrades()
        ]);
        setStocks(stocksData);
        setOrderBook(orderBookData);
        setTrades(tradesData);
      } catch (error) {
        console.error('Failed to fetch trading data:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  const handlePlaceOrder = async () => {
    try {
      setLoading(true);
      const order: Order = {
        ticker: selectedStock,
        type: orderType,
        price,
        quantity,
        trader: user.account
      };
      await placeOrder(order);
      toast.success('Order placed successfully');
      onOrderPlaced();
      setPrice(0);
      setQuantity(1);
    } catch (error) {
      console.error('Failed to place order:', error);
      toast.error('Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  const selectedStockData = stocks.find(s => s.ticker === selectedStock);

  return (
    <div className="space-y-6">
      {/* Header with account info, conversion rate, and Logout button */}
      <div className="flex justify-between items-center bg-dark-900 p-4 rounded-lg border border-dark-800">
        <div>
          <h1 className="text-2xl font-bold text-dark-100">Glass Token Trading Dashboard</h1>
          <p className="text-sm text-dark-300">Logged in as: {user.account}</p>
          <p className="text-xs text-dark-400">Conversion Rate: 1 GT = $10 USD</p>
        </div>
        <button
          onClick={onLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Logout
        </button>
      </div>

      {/* Market Overview */}
      <div className="bg-dark-900 p-4 rounded-lg border border-dark-800">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold flex items-center gap-2 text-dark-100">
            <TrendingUp className="w-5 h-5 text-blue-500" />
            Market Overview
          </h2>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {stocks.map((stock) => (
            <button
              key={stock._id}
              onClick={() => setSelectedStock(stock.ticker)}
              className={`p-4 rounded-lg transition-colors ${
                selectedStock === stock.ticker
                  ? 'bg-dark-800 border-2 border-blue-500'
                  : 'bg-dark-800 hover:bg-dark-700'
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="font-semibold text-dark-100">{stock.ticker}</span>
                <span className={`text-sm ${stock.price > 0 ? 'text-green-500' : 'text-red-500'}`}>
                  ${stock.price.toFixed(2)}
                </span>
              </div>
              <div className="text-sm text-dark-300 mt-1">{stock.name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Trading Area */}
      {selectedStock && selectedStockData && (
        <>
          {/* Chart and Order Book */}
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-8 grid grid-rows-2 gap-4">
              {/* Price Chart Area */}
              <div className="bg-dark-900 p-4 rounded-lg border border-dark-800">
                <h3 className="text-lg font-semibold mb-4 text-dark-100">
                  {selectedStockData.name} ({selectedStockData.ticker})
                </h3>
                <PriceChart stock={selectedStockData} />
              </div>

              {/* Recent Trades */}
              <div className="bg-dark-900 p-4 rounded-lg border border-dark-800">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-dark-100">
                  <BarChart className="w-5 h-5 text-blue-500" />
                  Recent Trades
                </h3>
                <div className="overflow-y-auto h-48">
                  <table className="w-full">
                    <thead className="bg-dark-800">
                      <tr>
                        <th className="px-4 py-2 text-left text-dark-200">Price</th>
                        <th className="px-4 py-2 text-left text-dark-200">Amount</th>
                        <th className="px-4 py-2 text-left text-dark-200">Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {trades
                        .filter(trade => trade.ticker === selectedStock)
                        .map((trade) => (
                          <tr key={trade._id} className="border-b border-dark-800">
                            <td className="px-4 py-2 text-dark-100">${trade.price.toFixed(2)}</td>
                            <td className="px-4 py-2 text-dark-100">{trade.quantity}</td>
                            <td className="px-4 py-2 text-dark-300">
                              {new Date(trade.timestamp).toLocaleTimeString()}
                            </td>
                          </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Order Book and Trading Form */}
            <div className="col-span-4 grid grid-rows-2 gap-4">
              {/* Order Book */}
              <div className="bg-dark-900 p-4 rounded-lg border border-dark-800">
                <h3 className="text-lg font-semibold mb-4 text-dark-100">Order Book</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <div className="text-green-500 font-semibold mb-2">Bids</div>
                    <div className="space-y-1">
                      {orderBook.buyOrders
                        .filter(order => order.ticker === selectedStock)
                        .sort((a, b) => b.price - a.price)
                        .slice(0, 5)
                        .map((order, idx) => (
                          <div key={idx} className="text-sm grid grid-cols-2 bg-dark-800 p-1 rounded">
                            <span className="text-green-500">${order.price.toFixed(2)}</span>
                            <span className="text-right text-dark-200">{order.quantity}</span>
                          </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-red-500 font-semibold mb-2">Asks</div>
                    <div className="space-y-1">
                      {orderBook.sellOrders
                        .filter(order => order.ticker === selectedStock)
                        .sort((a, b) => a.price - b.price)
                        .slice(0, 5)
                        .map((order, idx) => (
                          <div key={idx} className="text-sm grid grid-cols-2 bg-dark-800 p-1 rounded">
                            <span className="text-red-500">${order.price.toFixed(2)}</span>
                            <span className="text-right text-dark-200">{order.quantity}</span>
                          </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Trading Form */}
              <div className="bg-dark-900 p-4 rounded-lg border border-dark-800">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-dark-100">
                  <DollarSign className="w-5 h-5 text-blue-500" />
                  Place Order
                </h3>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <button
                      className={`flex-1 py-2 rounded-lg font-semibold transition-colors ${
                        orderType === 'buy'
                          ? 'bg-green-600 text-white'
                          : 'bg-dark-800 text-dark-200 hover:bg-dark-700'
                      }`}
                      onClick={() => setOrderType('buy')}
                    >
                      Buy
                    </button>
                    <button
                      className={`flex-1 py-2 rounded-lg font-semibold transition-colors ${
                        orderType === 'sell'
                          ? 'bg-red-600 text-white'
                          : 'bg-dark-800 text-dark-200 hover:bg-dark-700'
                      }`}
                      onClick={() => setOrderType('sell')}
                    >
                      Sell
                    </button>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-dark-200 mb-1">
                      Price (USD)
                    </label>
                    <input
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(Math.max(0, parseFloat(e.target.value)))}
                      className="w-full bg-dark-800 border border-dark-700 rounded-lg px-3 py-2 text-dark-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter price"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-dark-200 mb-1">
                      Quantity
                    </label>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
                      className="w-full bg-dark-800 border border-dark-700 rounded-lg px-3 py-2 text-dark-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter quantity"
                    />
                  </div>

                  <button
                    onClick={handlePlaceOrder}
                    disabled={loading || price <= 0 || quantity < 1}
                    className={`w-full py-2 rounded-lg font-semibold transition-colors ${
                      orderType === 'buy'
                        ? 'bg-green-600 hover:bg-green-700'
                        : 'bg-red-600 hover:bg-red-700'
                    } text-white disabled:bg-dark-700 disabled:cursor-not-allowed`}
                  >
                    {loading ? 'Processing...' : `Place ${orderType.toUpperCase()} Order`}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TradingInterface;
