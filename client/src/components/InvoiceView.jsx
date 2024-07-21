import React from 'react';
import jsPDF from 'jspdf';
import PropTypes from 'prop-types';

const InvoiceView = ({ invoiceData }) => {
  const {
    billTo = { name: '', doorNumber: '', street: '', city: '', district: '', zipCode: '', state: '' },
    shipTo = { name: '', doorNumber: '', street: '', city: '', district: '', zipCode: '', state: '' },
    items = [],
    totalAmount = 0
  } = invoiceData || {};

  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    doc.text('Invoice', 10, 10);

    // Bill To
    doc.text('Bill To:', 10, 20);
    doc.text(`Name: ${billTo.name || ''}`, 10, 30);
    doc.text(`Door Number: ${billTo.doorNumber || ''}`, 10, 40);
    doc.text(`Street: ${billTo.street || ''}`, 10, 50);
    doc.text(`City: ${billTo.city || ''}`, 10, 60);
    doc.text(`District: ${billTo.district || ''}`, 10, 70);
    doc.text(`Zip Code: ${billTo.zipCode || ''}`, 10, 80);
    doc.text(`State: ${billTo.state || ''}`, 10, 90);

    // Ship To
    doc.text('Ship To:', 10, 100);
    doc.text(`Name: ${shipTo.name || ''}`, 10, 110);
    doc.text(`Door Number: ${shipTo.doorNumber || ''}`, 10, 120);
    doc.text(`Street: ${shipTo.street || ''}`, 10, 130);
    doc.text(`City: ${shipTo.city || ''}`, 10, 140);
    doc.text(`District: ${shipTo.district || ''}`, 10, 150);
    doc.text(`Zip Code: ${shipTo.zipCode || ''}`, 10, 160);
    doc.text(`State: ${shipTo.state || ''}`, 10, 170);

    // Items
    doc.text('Items:', 10, 180);
    items.forEach((item, index) => {
      const yOffset = 190 + (index * 10);
      doc.text(`Description: ${item.description || ''}`, 10, yOffset);
      doc.text(`Quantity: ${item.quantity || 0}`, 60, yOffset);
      doc.text(`Price: ${item.price || 0}`, 100, yOffset);
    });

    doc.text(`Total Amount: ${totalAmount.toFixed(2) || 0}`, 10, 200);

    doc.save('invoice.pdf');
  };

  return (
    <div className="h-full p-4 bg-white shadow-md rounded overflow-auto">
      {/* Bill To */}
      <div className="flex justify-between mb-4">
        <div className="w-1/2 p-2">
          <h3 className="text-xl font-semibold mb-2">Bill To</h3>
          <p><strong>Name:</strong> {billTo.name || 'N/A'}</p>
          <p><strong>Door Number:</strong> {billTo.doorNumber || 'N/A'}</p>
          <p><strong>Street:</strong> {billTo.street || 'N/A'}</p>
          <p><strong>City:</strong> {billTo.city || 'N/A'}</p>
          <p><strong>District:</strong> {billTo.district || 'N/A'}</p>
          <p><strong>Zip Code:</strong> {billTo.zipCode || 'N/A'}</p>
          <p><strong>State:</strong> {billTo.state || 'N/A'}</p>
        </div>

        <div className="w-1/2 p-2">
          <h3 className="text-xl font-semibold mb-2">Ship To</h3>
          <p><strong>Name:</strong> {shipTo.name || 'N/A'}</p>
          <p><strong>Door Number:</strong> {shipTo.doorNumber || 'N/A'}</p>
          <p><strong>Street:</strong> {shipTo.street || 'N/A'}</p>
          <p><strong>City:</strong> {shipTo.city || 'N/A'}</p>
          <p><strong>District:</strong> {shipTo.district || 'N/A'}</p>
          <p><strong>Zip Code:</strong> {shipTo.zipCode || 'N/A'}</p>
          <p><strong>State:</strong> {shipTo.state || 'N/A'}</p>
        </div>
      </div>

      {/* Items */}
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2">Items</h3>
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Description</th>
              <th className="py-2 px-4 border-b">Quantity</th>
              <th className="py-2 px-4 border-b">Price</th>
              <th className="py-2 px-4 border-b">Total</th>
            </tr>
          </thead>
          <tbody>
            {items.length > 0 ? (
              items.map((item, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b">{item.description || 'N/A'}</td>
                  <td className="py-2 px-4 border-b">{item.quantity || 0}</td>
                  <td className="py-2 px-4 border-b">{item.price || 0}</td>
                  <td className="py-2 px-4 border-b">{(item.quantity * item.price).toFixed(2) || 0}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-2 px-4 border-b text-center">No items available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Total Amount */}
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2">Total Amount</h3>
        <p className="text-xl font-bold">{totalAmount.toFixed(2) || '0.00'}</p>
      </div>

      {/* Download PDF Button */}
      <div className="flex justify-center mt-4">
        <button
          onClick={handleDownloadPDF}
          className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-700"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
};

InvoiceView.propTypes = {
  invoiceData: PropTypes.shape({
    billTo: PropTypes.shape({
      name: PropTypes.string,
      doorNumber: PropTypes.string,
      street: PropTypes.string,
      city: PropTypes.string,
      district: PropTypes.string,
      zipCode: PropTypes.string,
      state: PropTypes.string
    }),
    shipTo: PropTypes.shape({
      name: PropTypes.string,
      doorNumber: PropTypes.string,
      street: PropTypes.string,
      city: PropTypes.string,
      district: PropTypes.string,
      zipCode: PropTypes.string,
      state: PropTypes.string
    }),
    date: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.shape({
      description: PropTypes.string,
      quantity: PropTypes.number,
      price: PropTypes.number
    })),
    totalAmount: PropTypes.number
  })
};

export default InvoiceView;
