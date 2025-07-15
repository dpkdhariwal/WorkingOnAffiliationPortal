import { classrooms_info_to_be_filled, UPDATE_TRADEWISE_CLASSROOMS_DETAILS } from "../constants";
import * as Yup from "yup";


export const initialValues = {
  ...Object.fromEntries(
    classrooms_info_to_be_filled.map((item, index) => [
      `${item.tradeId}_classroomArea_${index}`,
      null,
    ])
  ),
  ...Object.fromEntries(
    classrooms_info_to_be_filled.map((item, index) => [
      `${item.tradeId}_classroom_${index}`,
      null,
    ])
  ),
};

export const validationSchema = Yup.object({
  ...Object.fromEntries(
    classrooms_info_to_be_filled.map((item, index) => [
      `${item.tradeId}_classroomArea_${index}`,
      Yup.number().required("Enter Available Area").min(0, "Area must be positive"),
    ])
  ),
  ...Object.fromEntries(
    classrooms_info_to_be_filled.map((item, index) => [
      `${item.tradeId}_classroom_${index}`,
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
    ])
  ),
});

export const TradeWiseClassroomReducer = (
  state = initialValues,
  action
) => {
  let { type, payload } = action;
  switch (type) {
    case UPDATE_TRADEWISE_CLASSROOMS_DETAILS:
      state = { ...state, ...payload };
      return state;
    default:
      return state;
  }
};
