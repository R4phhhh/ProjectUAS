import React, { useState, useEffect } from "react";

const TransactionLogs = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    // Mengambil log transaksi yang disimpan di localStorage
    const savedLogs = JSON.parse(localStorage.getItem("transactionLogs") || "[]");
    setLogs(savedLogs);
  }, []);  

  return (
    <div className="container mt-4">
      <h2>Log Transaksi</h2>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Tanggal</th>
              <th>Items</th>
              <th>Total</th>
              <th>Pembayaran</th>
              <th>Kembalian</th>
            </tr>
          </thead>
          <tbody>
            {/* Jika tidak ada log, tampilkan pesan */}
            {logs.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center">
                  Tidak ada log transaksi.
                </td>
              </tr>
            ) : (
              // Jika ada log, tampilkan data log
              logs.map((log) => (
                <tr key={log.id}>
                  <td>{new Date(log.date).toLocaleString()}</td>
                  <td>
                    {log.items.map((item) => (
                      <div key={item.id}>
                        {item.name} x {item.quantity}
                      </div>
                    ))}
                  </td>
                  <td>Rp {log.total.toLocaleString()}</td>
                  <td>Rp {log.payment.toLocaleString()}</td>
                  <td>Rp {log.change.toLocaleString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionLogs;