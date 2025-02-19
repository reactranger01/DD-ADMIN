import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProductService } from '../ProductService';

export default function UserTable() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    ProductService.getProductsMini().then((data) => setProducts(data));
  }, []);

  return (
    <div className="w-full bg-white mx-8 border border-red-500">
      <div className="p-4 border border-red-500">
        <DataTable value={products} tableStyle={{ minWidth: '50rem' }}>
          <Column field="username" header="Username"></Column>
          <Column field="creditref" header="CreditRef"></Column>
          <Column field="balance" header="Balance"></Column>
          <Column field="exposure" header="Exposure"></Column>
          <Column field="exposure limit" header="Exposure limit"></Column>
          <Column field="avail.bal." header="Avail.Bal."></Column>
          <Column field="ref. P/L" header="Ref. P/L"></Column>
          <Column field="partnership" header="Partnership"></Column>
          <Column field="status" header="Status"></Column>
          <Column field="actions" header="Actions"></Column>
        </DataTable>
      </div>
    </div>
  );
}
