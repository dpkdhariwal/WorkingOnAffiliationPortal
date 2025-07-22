
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProductService } from './service/ProductService';

// import 'primeicons/primeicons.css';

// import 'primeflex/primeflex.css';
// import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';

import { GetSetAppAction } from "../../screens/action/getSetAppAction";

export const PrimeReactDT = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    ProductService.getProductsMini().then(data => setProducts(data));
  }, []);


  const statusBodyTemplate = (product) => {
    return <GetSetAppAction />;
  };

  return (
    <div className="card">
      <DataTable value={products} tableStyle={{ minWidth: '50rem' }}>
        <Column field="code" header="Application ID"></Column>
        <Column field="name" header="MIS Code / Temp. Code"></Column>
        <Column field="category" header="Institute Name"></Column>
        <Column field="category" header="Current status"></Column>
        <Column field="quantity" header="Institute Type"></Column>
        <Column field="quantity" header="Institute Type" body={statusBodyTemplate}></Column>
      </DataTable>
    </div>
  );
}
