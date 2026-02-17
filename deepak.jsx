  +++++++++++++++++++++++
  import { debounce } from 'lodash';
------------
  const debouncedFetch = useMemo(
    () =>
      debounce(async (values, cb) => {
        try {
          const resp = await st.getExistingItiInfoByMisCode(values);
          const { status, msg } = resp.data
          if (status === true) {
            cb(resp.data, msg);
          }
          else {
            cb(null, msg);
          }
        } catch (err) {
          cb(null, err.message);
        }
      }, 800),
    []
  );

-------------
onSubmit = {(values, { setSubmitting }) => {
    // const toastId = toast.loading("Searching...");
    debouncedFetch(values, (data, errMsg) => {
        setSubmitting(false);
        if (data == null) {
            // toast.update(toastId, { render: errMsg, type: "error", isLoading: false, autoClose: 5000, });
            dbox.alert({
                title: "Alert",
                message: errMsg,
            }).then(() => {
                console.log("Deleted");
            });
            return;
        }
        // toast.update(toastId, { render: errMsg, type: "success", isLoading: false, autoClose: 5000, });
        onFetch(data.data);
        setIsVisible(false);
    });
}}
---------
+++++++++++++++++++++++++

+++++++++++++
------------
import { confirm } from "@/components/confirm/ConfirmService";

confirm({
      title: "Confirm",
      message: "Are you sure you want remove this application?",
      onConfirm: async () => {
        try {
          const resp = await st.removeMiscodefromfinalList(obj.itiInfo?.unique_id);
          const { data } = resp;
          if (data.status) {
            const newArr = finalList.filter((_, i) => i !== index);
            setFinalList(newArr);
            dbox.alert({ title: "Alert", message: data.msg, variant: "success" });
          }
          else {
            dbox.alert({ title: "Alert", message: data.msg, variant: "danger" });
          }
        } catch (error) {
          dbox.alert({ title: "Alert", message: error.message, variant: "danger" });
        }
      },
    });
