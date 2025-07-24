// import React, { useEffect, Fragment, useState } from "react";
// import { Row, Col, Card, Form, InputGroup, Button } from "react-bootstrap";
// import { useSelector, useDispatch } from "react-redux";
// import Pageheader from "../../layouts/Pageheader";

// import { addFruit, getAllFruits, removeFruit } from "../../db/db";

// export const NewAppRegistration = () => {
//   const [fruits, setFruits] = useState([]);
//   const [newFruit, setNewFruit] = useState("");

//   useEffect(() => {
//     loadFruits();
//   }, []);

//   const loadFruits = async () => {
//     const all = await getAllFruits();
//     setFruits(all);
//   };

//   const handleAdd = async () => {
//     const fruit = { id: Date.now(), name: newFruit };
//     await addFruit(fruit);
//     setNewFruit("");
//     loadFruits();
//   };

//   const handleRemove = async (id) => {
//     await removeFruit(id);
//     loadFruits();
//   };

//   return (
//     <Fragment>
//       <Pageheader
//         mainheading={`New Application Stage-I Form`}
//         parentfolder="Dashboard"
//         activepage="New Registration"
//       />
//       <div>
//         <h2>Stored Fruits (IndexedDB)</h2>
//         <input
//           value={newFruit}
//           onChange={(e) => setNewFruit(e.target.value)}
//           placeholder="Add a fruit"
//         />
//         <button onClick={handleAdd}>Add</button>
//         <ul>
//           {fruits.map((f) => (
//             <li key={f.id}>
//               {f.name} <button onClick={() => handleRemove(f.id)}>Remove</button>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </Fragment>

//   );
// };




import { Row, Col, Card, Form, InputGroup, Button } from "react-bootstrap";

import { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Pageheader from "../../layouts/Pageheader";

export const NewAppRegistration = () => {
  const reg = useSelector((state) => state.reg);
  const [activeStep, setActiveStep] = useState(reg.steps[0]);

  const AppliInfo = useSelector((state) => state.AppliInfo);


  return (
    <Fragment>
      <Pageheader
        mainheading={`New Application Stage-I Form`}
        parentfolder="Dashboard"
        activepage="New Registration"
      />
      dfdfas
    </Fragment>
  );
};
