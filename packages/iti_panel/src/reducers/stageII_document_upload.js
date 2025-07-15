import {
  geo_tagged_photo_of_machinery_tools_equipments as docs1,
  gst_invoices_for_major_machinery_purchase_and_payment_proof as docs2,
  UPDATE_STAGE_II_DOCUMENT_UPLOAD,
} from "../constants";
import * as Yup from "yup";

export const initialValues = {
  ...Object.fromEntries(
    docs1.map((item, index) => [
      `${item.tradeId}_mte_geo_tagged_photo_${index}`,
      null,
    ])
  ),
  ...Object.fromEntries(
    docs2.map((item, index) => [
      `${item.tradeId}_mte_gst_invoices_${index}`,
      null,
    ])
  ),
};

export const validationSchema = Yup.object({
  ...Object.fromEntries(
    docs1.map((item, index) => [
      `${item.tradeId}_mte_geo_tagged_photo_${index}`,
      Yup.mixed().required("Select Geo Taged Photo"),
    ])
  ),
  ...Object.fromEntries(
    docs1.map((item, index) => [
      `${item.tradeId}_mte_gst_invoices_${index}`,
      Yup.mixed().required("Select PDF File"),
    ])
  ),
});

export const stageII_document_Uploads_Reducer = (state = initialValues, action) => {
  let { type, payload } = action;
  switch (type) {
    case UPDATE_STAGE_II_DOCUMENT_UPLOAD:
      state = { ...state, ...payload };
      return state;
    default:
      return state;
  }
};
