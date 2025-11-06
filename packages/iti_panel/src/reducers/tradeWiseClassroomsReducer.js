import { classrooms_info_to_be_filled, UPDATE_TRADEWISE_CLASSROOMS_DETAILS } from "affserver";
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
        .test("fileSize", "Invali FIles", (value) => {
          // ✅ Skip validation if it's a string (already uploaded path)
          if (typeof value === "string") return true;
          // ✅ Validate if it's a File object
          return value ? value.size <= 2 * 1024 * 1024 : true; // 2MB
        }),
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
