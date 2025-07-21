import { useState, useCallback } from 'react';

export function useStatusHistoryModal() {
  const [open, setOpen] = useState(false);
  const [order, setOrder] = useState(null);
  const [data, setData] = useState({ statusHistory: [], attachedDocuments: [], drivers: [] });

  const openModal = useCallback((order, shipments) => {
    setOrder(order);
    // Find and set data for the modal (can be replaced with API call in future)
    const shipment = shipments.find(s => s.orders.some(o => o.orderId === order.orderId));
    const targetOrder = shipment?.orders.find(o => o.orderId === order.orderId);
    setData({
      statusHistory: targetOrder?.statusHistory || [],
      attachedDocuments: targetOrder?.attachedDocuments || [],
      drivers: targetOrder?.drivers || [],
    });
    setOpen(true);
  }, []);

  const closeModal = useCallback(() => setOpen(false), []);

  return { open, order, data, openModal, closeModal };
} 