
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProductService } from './service/ProductService';
import { AppList } from './service/AppList';

import { useSelector, useDispatch } from "react-redux";

// import 'primeicons/primeicons.css';

// import 'primeflex/primeflex.css';
// import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';

import { GetSetAppAction } from "../../screens/action/getSetAppAction";

// import { getAppsByUserId } from "../../db/appList";
import { getAppListByUserId, getAppListByStateAssessor, getAppListByRdsde } from "../../db/users";


export const PrimeReactDT = () => {
  const [products, setProducts] = useState([]);
  const [appList, seAppList] = useState([]);

  const user = useSelector((state) => state.loginUserReducer);
  console.log(user);
  // const AppList = getAppsByUserId(user.id);
  useEffect(() => { console.log(AppList); })

  useEffect(() => {
    switch (user.userType) {
      case 'state_assessor':
        getAppListByStateAssessor(user.id).then((resp) => {
          console.log(resp.data);
          setProducts(resp.data);
          // data.sort((a, b) => a.stepNo - b.stepNo);
          // setProducts(data);
          // console.log(data);
        }).catch((error) => {
          console.log(error);
        });
        break;

      case 'rdsde':
        getAppListByRdsde(user).then((data) => {
          data.sort((a, b) => a.stepNo - b.stepNo);
          setProducts(data);
        });
        break;

      default:
        getAppListByUserId(user.id).then((resp) => {
          console.log(resp.data);
          // data.sort((a, b) => a.stepNo - b.stepNo);
          setProducts(resp.data);
        });
        break;
    }

    // ProductService.getProductsMini().then(data => setProducts(data));
  }, []);


  const statusBodyTemplate = (row) => {
    return <GetSetAppAction row={row} />;
  };

  const MisCodeBodyTemplate = (product) => {
    const name = product.proposedInstDetails?.pro_insti_details?.name_of_applicant_institute;
    return name ? name : <span>Not Filled</span>;
  };
  const InstNameBodyTemplate = (product) => {
    const v = product.proposedInstDetails?.pro_insti_details?.name_of_applicant_institute;
    return v ? v : <span>Not Filled</span>;
  };
  const CurrentStatusBodyTemplate = (product) => {
    const v = product.app_status;
    return v ? v : <span>Not Filled</span>;
  };

  const InstTypeBodyTemplate = (product) => {
    const v = product.proposedInstDetails?.pro_insti_details?.type_of_institute;
    return v ? v : <span>Not Filled</span>;
  };


  return (
    <div className="card">
      <DataTable value={products} tableStyle={{ minWidth: '50rem' }}>
        <Column field="appId" header="Application ID"></Column>
        <Column field="appId" header="MIS Code / Temp. Code" body={MisCodeBodyTemplate}></Column>
        <Column field="appId" header="Institute Name" body={InstNameBodyTemplate}></Column>
        <Column field="appId" header="Current status" body={CurrentStatusBodyTemplate}></Column>
        <Column field="appId" header="Institute Type" body={InstTypeBodyTemplate}></Column>
        <Column field="appId" header="Action" body={statusBodyTemplate}></Column>
      </DataTable>
    </div>
  );
}
