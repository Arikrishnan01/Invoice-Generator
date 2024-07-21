import React, { useState } from 'react';
import './style.css'; // Import the CSS file

const InvoiceMain = ({ onSubmit }) => {
  const [invoiceData, setInvoiceData] = useState({
    billTo: { name: '', doorNumber: '', street: '', city: '', district: '', zipCode: '', state: '' },
    shipTo: { name: '', doorNumber: '', street: '', city: '', district: '', zipCode: '', state: '' },
    date: '',
    items: [{ description: '', quantity: 1, price: 0 }],
    totalAmount: 0
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    const [section, key] = id.split('_');

    setInvoiceData((prevData) => {
      if (section === 'billTo' || section === 'shipTo') {
        return {
          ...prevData,
          [section]: { ...prevData[section], [key]: value }
        };
      } else {
        return { ...prevData, [id]: value };
      }
    });
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const items = [...invoiceData.items];
    items[index] = { ...items[index], [name]: value };
    setInvoiceData({ ...invoiceData, items });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const totalAmount = invoiceData.items.reduce((acc, item) => acc + (item.quantity * item.price), 0);
    const updatedData = { ...invoiceData, totalAmount };
    setInvoiceData(updatedData);
    onSubmit(updatedData); // Pass the data to InvoiceView
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl p-4 bg-white shadow-md rounded overflow-hidden form-container"
        style={{ maxHeight: '90vh' }}
      >
        <h2 className="text-2xl font-bold mb-4">Invoice Form</h2>

        {/* Billing Address */}
        <div className="flex flex-wrap -mx-2 mb-4">
          <div className="w-1/2 px-2">
            <h3 className="text-xl font-semibold mb-4">Billing Address</h3>
            <div className="flex flex-wrap -mx-2">
              {['name', 'doorNumber', 'street', 'city', 'district', 'zipCode', 'state'].map((field) => (
                <div key={field} className="w-1/3 px-2 mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`billTo_${field}`}>
                    {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id={`billTo_${field}`}
                    type="text"
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    onChange={handleChange}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Shipping Address */}
          <div className="w-1/2 px-2">
            <h3 className="text-xl font-semibold mb-4">Shipping Address</h3>
            <div className="flex flex-wrap -mx-2">
              {['name', 'doorNumber', 'street', 'city', 'district', 'zipCode', 'state'].map((field) => (
                <div key={field} className="w-1/3 px-2 mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`shipTo_${field}`}>
                    {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id={`shipTo_${field}`}
                    type="text"
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    onChange={handleChange}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Date */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">Date</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="date"
            type="date"
            onChange={handleChange}
          />
        </div>

        {/* Items */}
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-4">Items</h3>
          {invoiceData.items.map((item, index) => (
            <div key={index} className="flex flex-wrap -mx-2 mb-4">
              <div className="w-1/3 px-2 mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`item_${index}_description`}>Description</label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id={`item_${index}_description`}
                  type="text"
                  name="description"
                  value={item.description}
                  onChange={(e) => handleItemChange(index, e)}
                />
              </div>
              <div className="w-1/3 px-2 mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`item_${index}_quantity`}>Quantity</label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id={`item_${index}_quantity`}
                  type="number"
                  name="quantity"
                  value={item.quantity}
                  onChange={(e) => handleItemChange(index, e)}
                />
              </div>
              <div className="w-1/3 px-2 mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`item_${index}_price`}>Price</label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id={`item_${index}_price`}
                  type="number"
                  name="price"
                  value={item.price}
                  onChange={(e) => handleItemChange(index, e)}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Total Amount */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="totalAmount">Total Amount</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="totalAmount"
            type="text"
            value={invoiceData.totalAmount.toFixed(2)}
            readOnly
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded w-full shadow hover:bg-green-700"
        >
          Submit Invoice
        </button>
      </form>
    </div>
  );
};

export default InvoiceMain;
