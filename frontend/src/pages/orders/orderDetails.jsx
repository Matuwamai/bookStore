import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../base_url';

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [deliveryInfo, setDeliveryInfo] = useState({
    carrierName: '',
    driverName: '',
    driverContact: '',
    carRegistration: '',
    status: 'Processing'
  });

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/orders/order/${id}`);
        setOrder(response.data);
        // Initialize delivery info if it exists
        if (response.data.deliveryInfo) {
          setDeliveryInfo(response.data.deliveryInfo);
        }
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
        console.log(deliveryInfo)

    fetchOrder();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDeliveryInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleStatusChange = (e) => {
    setDeliveryInfo(prev => ({
      ...prev,
      status: e.target.value
    }));
  };

  const saveDeliveryInfo = async () => {
    try {
      const response = await axios.patch(`${BASE_URL}/orders/${id}`, {
        deliveryInfo: deliveryInfo
      });
      setOrder(response.data);
      setIsEditing(false);
    } catch (err) {
      console.error('Error updating delivery info:', err);
    }
  };

  if (loading) return <div className="text-center py-8">Loading order details...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  if (!order) return <div className="text-center py-8">Order not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <button 
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
      >
        &larr; Back to Orders
      </button>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h1 className="text-2xl font-bold">Order {order.id}</h1>
            <p className="text-gray-600">
              Placed on {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {isEditing ? (
              <select
                value={deliveryInfo.status}
                onChange={handleStatusChange}
                className="px-3 py-1 rounded-full text-sm border"
              >
                <option value="Processing">Processing</option>
                <option value="Dispatched">Dispatched</option>
                <option value="In Transit">In Transit</option>
                <option value="Delivered">Delivered</option>
              </select>
            ) : (
              <span className={`px-3 py-1 rounded-full text-sm ${
                deliveryInfo.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                deliveryInfo.status === 'In Transit' ? 'bg-yellow-100 text-yellow-800' :
                deliveryInfo.status === 'Dispatched' ? 'bg-blue-100 text-blue-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {deliveryInfo.status || 'Processing'}
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h2 className="text-lg font-semibold mb-2">Customer Information</h2>
            <div className="bg-gray-50 p-4 rounded">
              <p className="font-medium">{order.user?.name || 'N/A'}</p>
              <p className="text-gray-600">{order.user?.email || 'N/A'}</p>
              <p className="text-gray-600 mt-2">{order.deliveryContact}</p>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2 flex justify-between items-center">
              Delivery Information
              {!isEditing && (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="text-sm bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-800"
                >
                  Edit
                </button>
              )}
            </h2>
            <div className="bg-gray-50 p-4 rounded">
              {isEditing ? (
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Carrier Name</label>
                    <input
                      type="text"
                      name="carrierName"
                      value={deliveryInfo.carrierName}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border rounded p-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Driver Name</label>
                    <input
                      type="text"
                      name="driverName"
                      value={deliveryInfo.driverName}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border rounded p-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Driver Contact</label>
                    <input
                      type="text"
                      name="driverContact"
                      value={deliveryInfo.driverContact}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border rounded p-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Vehicle Registration</label>
                    <input
                      type="text"
                      name="carRegistration"
                      value={deliveryInfo.carRegistration}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border rounded p-2"
                    />
                  </div>
                  <div className="flex justify-end space-x-2 pt-2">
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={saveDeliveryInfo}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <p className="font-medium">Location: {order.deliveryLocation}</p>
                  {deliveryInfo.carrierName && (
                    <p className="mt-2">
                      <span className="font-medium">Carrier:</span> {deliveryInfo.carrierName}
                    </p>
                  )}
                  {deliveryInfo.driverName && (
                    <p>
                      <span className="font-medium">Driver:</span> {deliveryInfo.driverName}
                    </p>
                  )}
                  {deliveryInfo.driverContact && (
                    <p>
                      <span className="font-medium">Driver Contact:</span> {deliveryInfo.driverContact}
                    </p>
                  )}
                  {deliveryInfo.carRegistration && (
                    <p>
                      <span className="font-medium">Vehicle:</span> {deliveryInfo.carRegistration}
                    </p>
                  )}
                  {order.deliveryNotes && (
                    <p className="text-gray-600 mt-2">
                      <span className="font-medium">Notes:</span> {order.deliveryNotes}
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        <h2 className="text-lg font-semibold mb-2">Order Items</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 text-left">Item</th>
                <th className="py-2 px-4 text-left">Price</th>
                <th className="py-2 px-4 text-left">Quantity</th>
                <th className="py-2 px-4 text-left">Subtotal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {order.items?.map((item) => (
                <tr key={item.id}>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <div className="ml-4">
                        <p className="font-medium">{item.book?.title || 'Unknown Product'}</p>
                        <p className="text-gray-600 text-sm">SKU: {item.book?.id || 'N/A'}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">${item.book?.price?.toFixed(2) || '0.00'}</td>
                  <td className="py-3 px-4">{item.quantity}</td>
                  <td className="py-3 px-4">
                    ${((item.book?.price || 0) * item.quantity).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex justify-end">
          <div className="bg-gray-50 p-4 rounded w-full md:w-1/3">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Subtotal:</span>
              <span>
                {/* ${order.items?.reduce((sum, item) => sum + ((item.book?.price || 0) * item.quantity, 0).toFixed(2) || '0.00'} */}
              </span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Shipping:</span>
              <span>$0.00</span>
            </div>
            <div className="flex justify-between font-bold text-lg mt-4 pt-4 border-t">
              <span>Total:</span>
              <span>${order.total?.toFixed(2) || '0.00'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;