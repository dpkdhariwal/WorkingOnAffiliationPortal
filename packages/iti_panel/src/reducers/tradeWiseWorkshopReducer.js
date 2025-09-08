import { work_shop_info_to_be_filled, UPDATE_TRADEWISE_WORKSHOP_DETAILS, work_shop_list } from "affserver";
import * as Yup from "yup";

export const initialValues = {
  ...Object.fromEntries(
    work_shop_list().map((item, index) => [
      `${item.tradeId}_workshopArea_${index}`,
      null,
    ])
  ),
  ...Object.fromEntries(
    work_shop_list().map((item, index) => [
      `${item.tradeId}_workshop_${index}`,
      null,
    ])
  ),
};

export const validationSchema = Yup.object({
  ...Object.fromEntries(
    work_shop_list().map((item, index) => [
      `${item.tradeId}_workshopArea_${index}`,
      Yup.number().required("Enter Available Area").min(0, "Area must be positive"),
    ])
  ),
  ...Object.fromEntries(
    work_shop_list().map((item, index) => [
      `${item.tradeId}_workshop_${index}`,
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

export const TradeWiseWorkshopReducer = (
  state = initialValues,
  action
) => {
  let { type, payload } = action;
  switch (type) {
    case UPDATE_TRADEWISE_WORKSHOP_DETAILS:
      state = { ...state, ...payload };
      return state;
    default:
      return state;
  }
};
