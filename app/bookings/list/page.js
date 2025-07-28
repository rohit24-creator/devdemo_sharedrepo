"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function BookingsTable() {
  const router = useRouter();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch("/bookingData.json")
      .then(res => res.json())
      .then(data => {
        // Convert the JSON object to an array of booking objects with id
        const bookingsArray = Object.entries(data).map(([id, booking]) => ({
          id,
          ...booking.generalInfo?.["General Info"], // flatten general info for table
          status: booking.financials?.Status || "",
        }));
        setBookings(bookingsArray);
      });
  }, []);

  const handleView = (id) => {
    router.push(`/orders/view/${id}`);
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6 text-[#162d56]">Bookings List</h2>
      <table className="min-w-full border border-gray-200 rounded-lg">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left">Booking ID</th>
            <th className="px-4 py-2 text-left">Product</th>
            <th className="px-4 py-2 text-left">Order Status</th>
            <th className="px-4 py-2 text-left">Customer ID</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id} className="border-t">
              <td className="px-4 py-2">{booking["Booking ID"]}</td>
              <td className="px-4 py-2">{booking["Product *"]}</td>
              <td className="px-4 py-2">{booking["Order Status"]}</td>
              <td className="px-4 py-2">{booking["Customer ID *"]}</td>
              <td className="px-4 py-2">{booking.status}</td>
              <td className="px-4 py-2">
                <button
                  className="px-4 py-1 bg-[#006397] text-white rounded hover:bg-[#005080] transition"
                  onClick={() => handleView(booking.id)}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 