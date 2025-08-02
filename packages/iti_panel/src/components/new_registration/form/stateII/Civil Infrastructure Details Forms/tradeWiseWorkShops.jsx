import React, { useState } from "react";
import {
    Tab,
    Nav,
    Row,
    Col,
    Button,
    Card,
    Form as BForm,
    Table,
} from "react-bootstrap";
import { Formik, Form as FormikForm, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "react-circular-progressbar/dist/styles.css";
import ReqSign from "../../comp/requiredSign"; // Make sure this component exists and is exported correctly
import Swal from "sweetalert2";

import { validationSchema } from "../../../../../reducers/tradeWiseWorkshopReducer";

import { useSelector, useDispatch } from "react-redux";
import { work_shop_info_to_be_filled, UPDATE_TRADEWISE_WORKSHOP_DETAILS, work_shop_list, tradeList } from "../../../../../constants";
import { setTradewiseWorkShop, setCheckListTradewiseWorkShop, getTradewiseWorkShop } from "../../../../../db/users";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { WorkshopName } from "../../../../../constants";

export const TradeWiseWorkshops = ({ goNext }) => {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const appId = queryParams.get("appId");
    const authUser = useSelector((state) => state.loginUserReducer);


    const initialValues = useSelector((state) => state.TradeWiseWorkshopReducer);
    const [iniValue, setIniValue] = useState([]);

    const dispatch = useDispatch();

    const submit = (values) => {
        dispatch({ type: UPDATE_TRADEWISE_WORKSHOP_DETAILS, payload: values });
        goNext();
    };
    const [workShopList, setWorkShopList] = useState([]);


    const prepareToSave = (values) => {
        const input = values;
        setTradewiseWorkShop(values, authUser, appId);
        console.log(input);
        

        // const resultArray = Object.values(resultMap);
        // console.log(resultArray);

        // // setTradewiseWorkShop(resultArray, authUser, appId);


        // // Revers It
        // const output = {};
        // resultArray.forEach(item => {
        //     const { tradeId, index, workshopArea, workshop } = item;

        //     output[`${tradeId}_workshopArea_${index}`] = workshopArea;
        //     output[`${tradeId}_workshop_${index}`] = workshop;
        // });

        // console.log(output);

    };


    const prepare_initialValues = (workShopList) => {
        console.log(workShopList);
        const obj = {
            ...Object.fromEntries(
                workShopList.map((item, index) => {
                    const { area } = getSetFieldsName(item);
                    return [`${area}`, ''];
                })
            ),
            ...Object.fromEntries(
                workShopList.map((item, index) => {
                    const { photo } = getSetFieldsName(item);
                    return [`${photo}`, '']
                })
            ),
        };
        console.log(workShopList, obj);
        setIniValue(obj);
        return obj;
    }

    useEffect(() => {
        // let object = {};
        // tradeList.forEach((obj, i) => {
        //     console.log(i);
        //     const result = prepare_initialValues(obj, i);
        //     object = { ...object, ...result };
        //     console.log(object);
        // });

        // let check1 = tradeList.map((obj, i) => ({ ...obj, fields: prepare_initialValues(obj, i) }));
        // setWorkShopList(check1);
        // console.log(check1);


        // New Test 
        // let NewList = [];
        // tradeList.forEach((obj, i) => {
        //     let fieldsName = prepare_initialValues(obj, i);
        //     console.log(fieldsName);
        //     const {area, photo} = fieldsName;
        //     console.log(area, photo);
        //     for (const key in fieldsName) {
        //         console.log("key:", key);
        //         let newobj = { ...obj, Particulars:'workshop', field: { area,photo } }
        //         NewList.push(newobj);
        //     }
        // });
        // setWorkShopList(NewList);
    }, []);


    const loadData = async () => {
        console.log("Hellow")
        await setCheckListTradewiseWorkShop(authUser, appId);

        await getTradewiseWorkShop(appId).then((data) => {
            setWorkShopList(data);
            prepare_initialValues(data);

            // console.log(data);
        })

    }

    useEffect(() => {
        loadData();

    }, [])


    const validationSchema = (workShopList) => {
        console.log(workShopList);
        let obj = {
            ...Object.fromEntries(
                workShopList.map((item, index) => {
                    const { area } = getSetFieldsName(item);
                    console.log(area);
                    return [
                        `${area}`,
                        Yup.number().required("Enter Available Area").min(0, "Area must be positive"),
                    ];
                })
            ),
            ...Object.fromEntries(
                workShopList.map((item, index) => {
                    const { photo } = getSetFieldsName(item);

                    return [
                        `${photo}`,
                        Yup.mixed()
                            .required("Select Geo Taged File")
                            // .test("fileSize", "File too large", (value) =>
                            //   value ? value.size <= 1024 * 1024 * 5 : false
                            // )
                            .test("fileType", "Unsupported format", (value) =>
                                value
                                    ? ["image/jpeg", "image/png", "application/pdf"].includes(
                                        value.type
                                    )
                                    : false
                            ),
                    ]
                })
            ),
        };
        console.log(obj);
        return Yup.object(obj);
    }


    const getSetFieldsName = (item) => {
        const area = `area>${item.tradeId}>${item.workshop}`;
        const photo = `photo>${item.tradeId}>${item.workshop}`;
        return { area, photo };
    }


    return (
        <Formik
            enableReinitialize
            initialValues={iniValue}
            validationSchema={validationSchema(workShopList)}
            onSubmit={(values) => {
                prepareToSave(values);
                // submit(values)
            }}
        >
            {({ handleSubmit, setFieldValue }) => (
                <FormikForm onSubmit={handleSubmit}>
                    <Card>
                        <Card.Body>
                            <div className="table-responsive">
                                <Table className="text-nowrap">
                                    <thead>
                                        <tr>
                                            <th>Trade Name</th>
                                            <th>Particulars</th>
                                            <th>Required Area</th>
                                            <th>Available Area</th>
                                            <th>Upload Photo <ReqSign /></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {workShopList.map((item, index) => {

                                                console.log(item);

                                            let fields = getSetFieldsName(item);
                                            console.log(fields);


                                            return (
                                                <tr key={index}>
                                                    <td>{item.tradeInfo.tradeName}</td>
                                                    <td>{item.workshop}</td>
                                                    <td>{item.tradeInfo.WorkshopAreaRequirment} {item.tradeInfo.WorkshopAreaUnit}</td>
                                                    <td>
                                                        <Field
                                                            type="number"
                                                            name={fields.area}
                                                            as={BForm.Control}

                                                        />
                                                        <div className="text-danger">
                                                            <ErrorMessage name={fields.area} />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="file"
                                                            name={fields.photo}
                                                            className="form-control"
                                                            onChange={(event) => {
                                                                setFieldValue(
                                                                    fields.photo,
                                                                    event.currentTarget.files[0]
                                                                );
                                                            }}
                                                        />
                                                        <div className="text-danger">
                                                            <ErrorMessage
                                                                name={fields.photo}
                                                                component="div"
                                                                className="text-danger"
                                                            />
                                                        </div>
                                                    </td>
                                                </tr>
                                            );

                                        })}
                                    </tbody>
                                </Table>
                            </div>
                        </Card.Body>
                        <Card.Footer className="d-flex justify-content-end gap-2">
                            <Button type="submit">Save & Next</Button>
                        </Card.Footer>
                    </Card>
                </FormikForm>
            )}
        </Formik>
    );
};
