import { requireUser } from '@/hooks/requiredUser';
import React from 'react';

const Orders = async() => {
   await requireUser();
  return (
    <div>
      Orders
    </div>
  );
}

export default Orders;
