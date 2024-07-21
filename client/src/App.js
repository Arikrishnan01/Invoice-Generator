import React, { useState } from 'react';
import './App.css';
import InvoiceMain from './components/InvoiceMain';
import InvoiceView from './components/InvoiceView';

function App() {
  const [invoiceData, setInvoiceData] = useState({
    billTo: { name: '', doorNumber: '', street: '', city: '', district: '', zipCode: '', state: '' },
    shipTo: { name: '', doorNumber: '', street: '', city: '', district: '', zipCode: '', state: '' },
    date: '',
    items: [{ description: '', quantity: 1, price: 0 }],
    totalAmount: 0
  });

  const handleInvoiceSubmit = (data) => {
    setInvoiceData(data);
  };

  return (
    <div className="flex h-screen bg-gray-200">
      <div className="w-7/20 p-4">
        <InvoiceView invoiceData={invoiceData} />
      </div>
      <div className="w-13/20 mx-2 my-2">
        <InvoiceMain onSubmit={handleInvoiceSubmit} />
      </div>
    </div>
  );
}

export default App;
