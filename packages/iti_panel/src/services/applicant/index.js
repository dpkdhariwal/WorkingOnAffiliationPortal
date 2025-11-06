import axios from 'axios';
import DeviceDetector from 'device-detector-js';
export const base_url = 'http://localhost:3000';
import * as cnf from "../config";
import { api } from '../auth/login';

import * as C from "affserver";
export const getError = (error) => {
  const message = error.message || 'Failed'
  return new Error(message)
}

export const startNewApp = async (values) => {
  const formData = new FormData();
  formData.append("data", JSON.stringify(values));
  return new Promise((resolve, reject) => {
    api.post("/applicant/startNewApp", formData).then((res) => { resolve(res) }).catch((error) => { reject(error) });
  })
};

export const saveParticularDetails = async (values, appId, particular) => {
  const formData = new FormData();
  formData.append("data", JSON.stringify(values));
  formData.append("appId", appId);
  formData.append("particular", particular);


  switch (particular) {
    case C.CIK.MULTIPURPOSE_HALL:
      values.multipurposehall.forEach((item, index, arr) => {
        const { document } = item
        if (document instanceof File) {
          formData.append(`multipurposehall[${index}].document`, document);
        }
      });
      break;

    case C.CIK.IT_LAB:
      values.it_lab.forEach((item, index, arr) => {
        const { document } = item
        if (document instanceof File) {
          formData.append(`it_lab[${index}].document`, document);
        }
      });
      break;

    case C.CIK.LIBRARY:
      values.library.forEach((item, index, arr) => {
        const { document } = item
        if (document instanceof File) {
          formData.append(`library[${index}].document`, document);
        }
      });
      break;
    case C.CIK.PLACEMENT_AND_COUNSELLING_ROOM:
      values.placement_n_counselling_room.forEach((item, index, arr) => {
        const { document } = item
        if (document instanceof File) {
          formData.append(`placement_n_counselling_room[${index}].document`, document);
        }
      });
      break;

    case C.CIC.ADMINISTRATIVE_AREA:
      values.administrative_areas.forEach((item, index, arr) => {
        const { document } = item
        if (document instanceof File) {
          formData.append(`administrative_areas[${index}].document`, document);
        }
      });
      break;


    default:
      break;
  }


  return new Promise((resolve, reject) => {
    api.post("/applicant/saveParticularDetails", formData).then((res) => { resolve(res) }).catch((error) => { reject(error) });
  })
};

export const saveTradewiseClassRoom = async (values, appId) => {
  const formData = new FormData();
  formData.append("data", JSON.stringify(values));
  formData.append("appId", appId);

  values.tradewise_classrooms.forEach((item, index, arr) => {
    const { document } = item
    if (document instanceof File) {
      formData.append(`tradewise_classrooms[${index}].document`, document);
    }
  });
  return new Promise((resolve, reject) => {
    api.post("/applicant/saveTradewiseClassRooms", formData).then((res) => { resolve(res) }).catch((error) => { reject(error) });
  })
};
export const saveTradewiseWorkShop = async (values, appId) => {
  const formData = new FormData();
  formData.append("data", JSON.stringify(values));
  formData.append("appId", appId);

  values.tradewise_workshop.forEach((item, index, arr) => {
    const { document } = item
    if (document instanceof File) {
      formData.append(`tradewise_workshop[${index}].document`, document);
    }
  });
  return new Promise((resolve, reject) => {
    api.post("/applicant/saveTradewiseWorkShop", formData).then((res) => { resolve(res) }).catch((error) => { reject(error) });
  })
};



export const saveElectricityDetails = async (values, appId) => {
  const formData = new FormData();
  formData.append("data", JSON.stringify(values));
  formData.append("appId", appId);


  if (typeof values.latest_electricity_bill_meter_sealing_report == 'object') {
    formData.append(
      "latest_electricity_bill_meter_sealing_report",
      values.latest_electricity_bill_meter_sealing_report
    );
  }
  if (typeof values.power_supply_back_power == 'object') {
    formData.append(
      "power_supply_back_power",
      values.power_supply_back_power
    );
  }
  if (typeof values.power_supply_purchase_related_documents == 'object') {
    formData.append(
      "power_supply_purchase_related_documents",
      values.power_supply_purchase_related_documents
    );
  }
  if (typeof values.fire_and_safety_certificate == 'object') {
    formData.append(
      "fire_and_safety_certificate",
      values.fire_and_safety_certificate
    );
  }

  return new Promise((resolve, reject) => {
    api.post("/applicant/saveElectricityDetails", formData).then((res) => { resolve(res) }).catch((error) => { reject(error) });
  })
};


export const saveDocumentNcompleteStageII = async (values, appId) => {
  const formData = new FormData();
  formData.append("data", JSON.stringify(values));
  formData.append("appId", appId);

  values.mte_photos_per_unit.forEach((item, index, arr) => {
    const { photo } = item
    if (photo instanceof File) {
      formData.append(`mte_photos_per_unit[${index}].photo`, photo);
    }
  });
  values.gst_invoices.forEach((item, index, arr) => {
    const { document } = item
    if (document instanceof File) {
      formData.append(`gst_invoices[${index}].document`, document);
    }
  });

  return new Promise((resolve, reject) => {
    api.post("/applicant/saveDocumentNcompleteStageII", formData).then((res) => { resolve(res) }).catch((error) => { reject(error) });
  })
};

export const saveAmenities = async (values, appId) => {
  const formData = new FormData();
  formData.append("data", JSON.stringify(values));
  formData.append("appId", appId);

  values.particulars_2.forEach((item, index, arr) => {
    const { document } = item
    // File 5
    if (document instanceof File) {
      formData.append(`particulars_2[${index}].document`, document);
    }
  });
  return new Promise((resolve, reject) => {
    api.post("/applicant/saveAmenities", formData).then((res) => { resolve(res) }).catch((error) => { reject(error) });
  })
};

export const saveSignageBoards = async (values, appId) => {
  const formData = new FormData();
  formData.append("data", JSON.stringify(values));
  formData.append("appId", appId);
  values.signage_boards.forEach((item, index, arr) => {
    const { document } = item
    if (document instanceof File) {
      formData.append(`signage_boards[${index}].document`, document);
    }
  });
  return new Promise((resolve, reject) => {
    api.post("/applicant/saveSignageBoards", formData).then((res) => { resolve(res) }).catch((error) => { reject(error) });
  })
};

export const saveItLabSpecifications = async (values, appId) => {
  const formData = new FormData();
  formData.append("data", JSON.stringify(values));
  formData.append("appId", appId);
  return new Promise((resolve, reject) => {
    api.post("/applicant/saveItLabSpecifications", formData).then((res) => { resolve(res) }).catch((error) => { reject(error) });
  })
};

export const saveMachineToolEquipmentQty = async (values, appId, trade_id, pagi) => {
  const formData = new FormData();
  formData.append("data", JSON.stringify(values));
  formData.append("pagi", JSON.stringify(pagi));
  formData.append("appId", appId);
  formData.append("trade_id", trade_id);
  return new Promise((resolve, reject) => {
    api.post("/applicant/saveMachineToolEquipmentQty", formData).then((res) => { resolve(res) }).catch((error) => { reject(error) });
  })
};
export const saveRemarksOnTradeWideMachineryToolEquipments = async (values, appId, step, pagi) => {
  const { assessment_id } = step;
  const formData = new FormData();
  formData.append("data", JSON.stringify(values));
  formData.append("pagi", JSON.stringify(pagi));
  formData.append("appId", appId);
  formData.append("assessment_id", assessment_id);
  return new Promise((resolve, reject) => {
    api.post("/applicant/saveRemarksOnTradeWideMachineryToolEquipments", formData).then((res) => { resolve(res) }).catch((error) => { reject(error) });
  })
};

export const setBuildingDetail = async (values, appId) => {
  const formData = new FormData();
  formData.append("data", JSON.stringify(values));
  formData.append("appId", appId);
  console.log(values);
  values.bld_plan_documents.forEach((item, index, arr) => {
    const { document, notarised_document } = item
    // File 6
    if (document instanceof File) {
      formData.append(`bld_plan_documents[${index}].document`, document);
    }
    if (notarised_document instanceof File) {
      formData.append(`bld_plan_documents[${index}].notarised_document`, notarised_document);
    }
  });

  values.bld_completion_cert.forEach((item, index, arr) => {
    const { document, notarised_document } = item
    // File 6
    if (document instanceof File) {
      formData.append(`bld_completion_cert[${index}].document`, document);
    }
    if (notarised_document instanceof File) {
      formData.append(`bld_completion_cert[${index}].notarised_document`, notarised_document);
    }
  });

  if (values.entrance_gate_photo_of_plot_with_signage_board instanceof File) {
    formData.append('entrance_gate_photo_of_plot_with_signage_board', values.entrance_gate_photo_of_plot_with_signage_board);
  }
  if (values.front_view_photo_of_building instanceof File) {
    formData.append('front_view_photo_of_building', values.front_view_photo_of_building);
  }
  if (values.side_view_photo_of_building instanceof File) {
    formData.append('side_view_photo_of_building', values.side_view_photo_of_building);
  }







  return new Promise((resolve, reject) => {
    api.post("/applicant/setBuildingDetail", formData).then((res) => { resolve(res) }).catch((error) => { reject(error) });
  })
};
export const landInfo = async (appId) => {
  const formData = new FormData();
  formData.append("appId", appId);
  return new Promise((resolve, reject) => {
    api.post("/applicant/landInfo", formData).then((res) => { resolve(res) }).catch((error) => { reject(error) });
  })
};
export const setEntityDetails = async (values, appId) => {
  const formData = new FormData();
  formData.append("data", JSON.stringify(values));
  formData.append("appId", appId);
  return new Promise((resolve, reject) => {
    api.post("/applicant/setEntityDetails", formData).then((res) => { resolve(res) }).catch((error) => { reject(error) });
  })
};

export const api_getAppListByUserId = async (userId) => {
  console.log(userId);
  const formData = new FormData();
  formData.append("userId", userId);
  return new Promise((resolve, reject) => {
    api.post("/applicant/getAppListByUserId", formData).then((res) => { resolve(res) }).catch((error) => { reject(error) });
  })
}
export const api_getAppListByStateUser = async (userId) => {
  console.log(userId);
  const formData = new FormData();
  formData.append("userId", userId);
  return new Promise((resolve, reject) => {
    api.post("/state/getAppListByStateUser", formData).then((res) => { resolve(res) }).catch((error) => { reject(error) });
  })
}

export const ap_getDbEntityDetails = async (appId) => {
  const formData = new FormData();
  formData.append("appId", appId);
  return new Promise((resolve, reject) => {
    api.post("/applicant/getDbEntityDetails", formData).then((res) => { resolve(res) }).catch((error) => { reject(error) });
  })
}

export const getBuildingDetail = async (appId) => {
  const formData = new FormData();
  formData.append("appId", appId);
  return new Promise((resolve, reject) => {
    api.post("/applicant/getBuildingDetail", formData).then((res) => { resolve(res) }).catch((error) => { reject(error) });
  })
}


export const setProposedInstDetails = async (step, values, appId) => {
  const formData = new FormData();
  console.log(values);
  formData.append("step", JSON.stringify(step));
  formData.append("data", JSON.stringify(values));
  formData.append("appId", appId);
  if (typeof values.Falls_Under_Hill_Area_Hill__Supporting_Doc == 'object') {
    formData.append(
      "Falls_Under_Hill_Area_Hill__Supporting_Doc",
      values.Falls_Under_Hill_Area_Hill__Supporting_Doc
    );
  }

  if (typeof values.Falls_Under_Border_District__Supporting_Doc == 'object') {
    formData.append(
      "Falls_Under_Border_District__Supporting_Doc",
      values.Falls_Under_Border_District__Supporting_Doc
    );
  }
  return new Promise((resolve, reject) => {
    api.post("/applicant/setProposedInstDetails", formData).then((res) => { resolve(res) }).catch((error) => { reject(error) });
  })
};
export const getProposedInstDetailsAutoFill = async (appId) => {
  const formData = new FormData();
  formData.append("appId", appId);
  return new Promise((resolve, reject) => {
    api.post("/applicant/getProposedInstDetailsForAutoFill", formData).then((res) => { resolve(res) }).catch((error) => { reject(error) });
  })
};

export const getInstLandDetails = async (appId) => {
  const formData = new FormData();
  formData.append("appId", appId);
  return new Promise((resolve, reject) => {
    api.post("/applicant/getInstLandDetails", formData).then((res) => { resolve(res) }).catch((error) => { reject(error) });
  })
};


export const getStage1FormFlow = async (appId) => {
  const formData = new FormData();
  formData.append("appId", appId);
  return new Promise((resolve, reject) => {
    api.post("/applicant/getStage1FormFlow", formData).then((res) => { resolve(res) }).catch((error) => { reject(error) });
  })
};

export const getStage2FormFlow = async (appId) => {
  const formData = new FormData();
  formData.append("appId", appId);
  return new Promise((resolve, reject) => {
    api.post("/applicant/getStage2FormFlow", formData).then((res) => { resolve(res) }).catch((error) => { reject(error) });
  })
};


export const setInstTradeDetails = async (values, appId, step) => {
  const formData = new FormData();
  formData.append("step", JSON.stringify(step));
  formData.append("data", JSON.stringify(values));
  formData.append("appId", appId);
  return new Promise((resolve, reject) => {
    api.post("/applicant/setInstTradeDetails", formData).then((res) => { resolve(res) }).catch((error) => { reject(error) });
  })
};

export const getInstTradeDetails = async (appId) => {
  const formData = new FormData();
  formData.append("appId", appId);
  return new Promise((resolve, reject) => {
    api.post("/applicant/getInstTradeDetails", formData).then((res) => { resolve(res) }).catch((error) => { reject(error) });
  })
};
export const getFilledTrades = async (appId) => {
  const formData = new FormData();
  formData.append("appId", appId);
  return new Promise((resolve, reject) => {
    api.post("/applicant/getFilledTrades", formData).then((res) => { resolve(res) }).catch((error) => { reject(error) });
  })
};



export const setInstLandDetails = async (values, appId, step) => {
  const formData = new FormData();
  formData.append("step", JSON.stringify(step));
  formData.append("data", JSON.stringify(values));
  formData.append("appId", appId);
  return new Promise((resolve, reject) => {
    api.post("/applicant/setInstLandDetails", formData).then((res) => { resolve(res) }).catch((error) => { reject(error) });
  })
};

export const getTradewiseWorkShop = async (appId) => {
  const formData = new FormData();
  formData.append("appId", appId);
  return new Promise((resolve, reject) => {
    api.post("/applicant/getTradewiseWorkShop", formData).then((res) => { resolve(res) }).catch((error) => { reject(error) });
  })
};

export const getITLabSpecifications = async (appId) => {
  const formData = new FormData();
  formData.append("appId", appId);
  return new Promise((resolve, reject) => {
    api.post("/applicant/getITLabSpecifications", formData).then((res) => { resolve(res) }).catch((error) => { reject(error) });
  })
};

export const getAmenities = async (appId) => {
  const formData = new FormData();
  formData.append("appId", appId);
  return new Promise((resolve, reject) => {
    api.post("/applicant/getAmenities", formData).then((res) => { resolve(res) }).catch((error) => { reject(error) });
  })
};

export const setAsExemptedStageII = async (values, appId) => {
  const formData = new FormData();
  formData.append("data", JSON.stringify(values));
  formData.append("appId", appId);
  return new Promise((resolve, reject) => {
    api.post("/applicant/setAsExemptedStageII", formData).then((res) => { resolve(res) }).catch((error) => { reject(error) });
  })
};
export const getAppStatus = async (appId) => {
  const formData = new FormData();
  formData.append("appId", appId);
  return new Promise((resolve, reject) => {
    api.post("/general/getAppStatus", formData).then((res) => { resolve(res) }).catch((error) => { reject(error) });
  })
};

export const getDocuments = async (appId) => {
  const formData = new FormData();
  formData.append("appId", appId);
  return new Promise((resolve, reject) => {
    api.post("/applicant/getDocuments", formData).then((res) => { resolve(res) }).catch((error) => { reject(error) });
  })
};

export const getElectricityDetails = async (appId) => {
  const formData = new FormData();
  formData.append("appId", appId);
  return new Promise((resolve, reject) => {
    api.post("/applicant/getElectricityDetails", formData).then((res) => { resolve(res) }).catch((error) => { reject(error) });
  })
};



export const getSignageBoards = async (appId) => {
  const formData = new FormData();
  formData.append("appId", appId);
  return new Promise((resolve, reject) => {
    api.post("/applicant/getSignageBoards", formData).then((res) => { resolve(res) }).catch((error) => { reject(error) });
  })
};



export const getStatusFillingMte = async (appId) => {
  const formData = new FormData();
  formData.append("appId", appId);
  return new Promise((resolve, reject) => {
    api.post("/applicant/getStatusFillingMte", formData).then((res) => { resolve(res) }).catch((error) => { reject(error) });
  })
};
export const getMachineryToolEquipments = async (appId, tradeId, pagination) => {
  const formData = new FormData();
  formData.append("appId", appId);
  formData.append("tradeId", tradeId);
  formData.append("pagination", JSON.stringify(pagination));
  return new Promise((resolve, reject) => {
    api.post("/applicant/getMachineryToolEquipments", formData).then((res) => { resolve(res) }).catch((error) => { reject(error) });
  })
};
export const getTradeWideMachineryToolEquipments = async (appId, tradeId, pagination) => {
  const formData = new FormData();
  formData.append("appId", appId);
  formData.append("tradeId", tradeId);
  formData.append("pagination", JSON.stringify(pagination));
  return new Promise((resolve, reject) => {
    api.post("/applicant/getTradeWideMachineryToolEquipments", formData).then((res) => { resolve(res) }).catch((error) => { reject(error) });
  })
};


export const getTradewiseClassRooms = async (appId) => {
  const formData = new FormData();
  formData.append("appId", appId);
  return new Promise((resolve, reject) => {
    api.post("/applicant/getTradewiseClassRooms", formData).then((res) => { resolve(res) }).catch((error) => { reject(error) });
  })
};

export const getParticulars = async (appId, particular) => {
  const formData = new FormData();
  formData.append("appId", appId);
  formData.append("particular", particular);
  return new Promise((resolve, reject) => {
    api.post("/applicant/getParticulars", formData).then((res) => { resolve(res) }).catch((error) => { reject(error) });
  })
};




export const getFeeInfo = async (appId) => {
  const formData = new FormData();
  formData.append("appId", appId);
  return new Promise((resolve, reject) => {
    api.post("/applicant/getFeeInfo", formData).then((res) => { resolve(res) }).catch((error) => { reject(error) });
  })
};


export const setAsExemptedStageI = async (values, step, appId) => {
  const formData = new FormData();
  formData.append("step", JSON.stringify(step));
  formData.append("data", JSON.stringify(values));
  formData.append("appId", appId);
  return new Promise((resolve, reject) => {
    api.post("/applicant/setAsExemptedStageI", formData).then((res) => { resolve(res) }).catch((error) => { reject(error) });
  })
};

export const setUploadDocumentStageI = async (values, step, appId) => {
  const formData = new FormData();
  formData.append("step", JSON.stringify(step));
  formData.append("data", JSON.stringify(values));
  formData.append("appId", appId);

  if (values.doc_of_registration_cert_of_applicant_org instanceof File) {
    formData.append('doc_of_registration_cert_of_applicant_org', values.doc_of_registration_cert_of_applicant_org);
  }

  if (values.doc_iti_resolution instanceof File) {
    formData.append('doc_iti_resolution', values.doc_iti_resolution);
  }

  if (values.doc_of_authorized_signatory instanceof File) {
    formData.append('doc_of_authorized_signatory', values.doc_of_authorized_signatory);
  }

  if (values.doc_of_land_earmarking instanceof File) {
    formData.append('doc_of_land_earmarking', values.doc_of_land_earmarking);
  }

  values.id_proof_scp.forEach((item, index, arr) => {
    const { id_proof_doc } = item
    // File 5
    if (id_proof_doc instanceof File) {
      formData.append(`id_proof_scp[${index}].document`, id_proof_doc);
    }
  });

  values.onwed_land_documents.forEach((item, index, arr) => {
    const { land_documents, land_notarised_documents } = item
    // File 6
    if (land_documents instanceof File) {
      formData.append(`onwed_land_documents[${index}].document`, land_documents);
    }
    if (land_notarised_documents instanceof File) {
      formData.append(`land_notarised_documents[${index}].notarised_document`, land_notarised_documents);

    }
  });


  values.lease_deed_documents.forEach((item, index, arr) => {
    const { documents, notarised_documents } = item;

    if (documents instanceof File) {
      formData.append(`lease_deed_documents[${index}].document`, documents);
    }

    if (notarised_documents instanceof File) {
      formData.append(`lease_deed_documents[${index}].notarised_document`, notarised_documents);
    }
  });


  values.land_conversion_certificate.forEach((item, index, arr) => {
    const { documents, notarised_documents } = item
    if (documents instanceof File) {
      formData.append(`land_conversion_certificate[${index}].document`, documents);
    }
    if (notarised_documents instanceof File) {
      formData.append(`land_conversion_certificate[${index}].notarised_document`, documents);
    }
  });

  if (values.id_proof_docs_of_authorized_signatory instanceof File) {
    formData.append('id_proof_docs_of_authorized_signatory', values.id_proof_docs_of_authorized_signatory);
  }


  return new Promise((resolve, reject) => {
    api.post("/applicant/setUploadDocumentStageI", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((res) => { resolve(res) }).catch((error) => { reject(error) });
  })
};


export const save_reply_stage_I_verifications = async (values, step, appId) => {
  const formData = new FormData();
  formData.append("data", JSON.stringify(values));
  formData.append("step", JSON.stringify(step));
  formData.append("appId", appId);


  // Setting Up Land Documents Fiiles
  console.log(values);

  if ("onwed_land_documents" in values) {
    values?.onwed_land_documents.forEach((item, index, arr) => {
      const { land_documents, land_notarised_documents } = item
      // File 6
      if (land_documents instanceof File) {
        formData.append(`onwed_land_documents[${index}].land_documents`, land_documents);
      }
      if (land_notarised_documents instanceof File) {
        formData.append(`onwed_land_documents[${index}].land_notarised_documents`, land_notarised_documents);
      }
    });


  }


  if ("lease_deed_documents" in values) {
    values.lease_deed_documents.forEach((item, index, arr) => {
      const { document, notarised_document } = item;
      if (document instanceof File) {
        formData.append(`lease_deed_documents[${index}].document`, document);
      }
      if (notarised_document instanceof File) {
        formData.append(`lease_deed_documents[${index}].notarised_document`, notarised_document);
      }
    });
  }

  if ("doc_of_registration_cert_of_applicant_org" in values) {
    if (values.doc_of_registration_cert_of_applicant_org instanceof File) {
      formData.append('doc_of_registration_cert_of_applicant_org', values.doc_of_registration_cert_of_applicant_org);
    }
  }


  if ("doc_iti_resolution" in values) {
    if (values.doc_iti_resolution instanceof File) {
      formData.append('doc_iti_resolution', values.doc_iti_resolution);
    }
  }

  if ("doc_of_authorized_signatory" in values) {
    if (values.doc_of_authorized_signatory instanceof File) {
      formData.append('doc_of_authorized_signatory', values.doc_of_authorized_signatory);
    }
  }


  if ("doc_of_land_earmarking" in values) {
    if (values.doc_of_land_earmarking instanceof File) {
      formData.append('doc_of_land_earmarking', values.doc_of_land_earmarking);
    }
  }

  if ("id_proof_scp" in values) {
    values.id_proof_scp.forEach((item, index, arr) => {
      const { id_proof_doc } = item
      // File 5
      if (id_proof_doc instanceof File) {
        formData.append(`id_proof_scp[${index}].document`, id_proof_doc);
      }
    });
  }

  // values.onwed_land_documents.forEach((item, index, arr) => {
  //   const { land_documents, land_notarised_documents } = item
  //   // File 6
  //   if (land_documents instanceof File) {
  //     formData.append(`onwed_land_documents[${index}].document`, land_documents);
  //   }
  //   if (land_notarised_documents instanceof File) {
  //     formData.append(`land_notarised_documents[${index}].notarised_document`, land_notarised_documents);

  //   }
  // });


  // values.lease_deed_documents.forEach((item, index, arr) => {
  //   const { documents, notarised_documents } = item;

  //   if (documents instanceof File) {
  //     formData.append(`lease_deed_documents[${index}].document`, documents);
  //   }

  //   if (notarised_documents instanceof File) {
  //     formData.append(`lease_deed_documents[${index}].notarised_document`, notarised_documents);
  //   }
  // });

  if ("land_conversion_certificate" in values) {
    values.land_conversion_certificate.forEach((item, index, arr) => {
      const { documents, notarised_documents } = item
      if (documents instanceof File) {
        formData.append(`land_conversion_certificate[${index}].document`, documents);
      }
      if (notarised_documents instanceof File) {
        formData.append(`land_conversion_certificate[${index}].notarised_document`, documents);
      }
    });
  }

  if ("id_proof_docs_of_authorized_signatory" in values) {
    if (values.id_proof_docs_of_authorized_signatory instanceof File) {
      formData.append('id_proof_docs_of_authorized_signatory', values.id_proof_docs_of_authorized_signatory);
    }
  }


  ////

  return new Promise((resolve, reject) => { api.post("/applicant/save_reply_stage_I_verifications", formData, { headers: { "Content-Type": "multipart/form-data", }, }).then((res) => { resolve(res) }).catch((error) => { reject(error) }); })
};


export const save_revised_tool_qty = async (appId, values, step) => {
  const formData = new FormData();
  formData.append("data", JSON.stringify(values));
  formData.append("step", JSON.stringify(step));
  formData.append("appId", appId);
  return new Promise((resolve, reject) => { api.post("/applicant/save_revised_tool_qty", formData, { headers: { "Content-Type": "multipart/form-data", }, }).then((res) => { resolve(res) }).catch((error) => { reject(error) }); })
};

export const save_reply_stage_II_verifications = async (appId, values, step) => {
  const formData = new FormData();
  formData.append("data", JSON.stringify(values));
  formData.append("step", JSON.stringify(step));
  formData.append("appId", appId);

  // Building Details Files
  if ("bld_plan_documents" in values) {
    values.bld_plan_documents.forEach((item, index, arr) => {
      const { document, notarised_document } = item
      // File 6
      if (document instanceof File) {
        formData.append(`bld_plan_documents[${index}].document`, document);
      }
      if (notarised_document instanceof File) {
        formData.append(`bld_plan_documents[${index}].notarised_document`, notarised_document);
      }
    });
  }
  if ("bld_completion_cert" in values) {
    values.bld_completion_cert.forEach((item, index, arr) => {
      const { document, notarised_document } = item
      // File 6
      if (document instanceof File) {
        formData.append(`bld_completion_cert[${index}].document`, document);
      }
      if (notarised_document instanceof File) {
        formData.append(`bld_completion_cert[${index}].notarised_document`, notarised_document);
      }
    });
  }
  if ("entrance_gate_photo_of_plot_with_signage_board" in values) {
    if (values.entrance_gate_photo_of_plot_with_signage_board instanceof File) {
      formData.append('entrance_gate_photo_of_plot_with_signage_board', values.entrance_gate_photo_of_plot_with_signage_board);
    }
  }
  if ("front_view_photo_of_building" in values) {
    if (values.front_view_photo_of_building instanceof File) {
      formData.append('front_view_photo_of_building', values.front_view_photo_of_building);
    }
  }
  if ("side_view_photo_of_building" in values) {
    if (values.side_view_photo_of_building instanceof File) {
      formData.append('side_view_photo_of_building', values.side_view_photo_of_building);
    }
  }


  // Civil Infram Files
  console.log(values);
  if ("REVISED_WORKSHOPS" in values) {
    if (values.REVISED_WORKSHOPS.document instanceof File) {
      formData.append('REVISED_WORKSHOPS.document', values.REVISED_WORKSHOPS.document);
    }
  }
  if ("REVISED_CLASSROOMS" in values) {
    if (values.REVISED_CLASSROOMS.document instanceof File) {
      formData.append('REVISED_CLASSROOMS.document', values.REVISED_CLASSROOMS.document);
    }
  }
  if ("REVISED_MULTIPURPOSE_HALL" in values) {
    if (values.REVISED_MULTIPURPOSE_HALL.document instanceof File) {
      formData.append('REVISED_MULTIPURPOSE_HALL.document', values.REVISED_MULTIPURPOSE_HALL.document);
    }
  }
  if ("REVISED_IT_LAB" in values) {
    if (values.REVISED_IT_LAB.document instanceof File) {
      formData.append('REVISED_IT_LAB.document', values.REVISED_IT_LAB.document);
    }
  }
  if ("REVISED_LIBRARY" in values) {
    if (values.REVISED_LIBRARY.document instanceof File) {
      formData.append('REVISED_LIBRARY.document', values.REVISED_LIBRARY.document);
    }
  }
  if ("REVISED_PLACEMENT_AND_COUNSELLING_ROOM" in values) {
    if (values.REVISED_PLACEMENT_AND_COUNSELLING_ROOM.document instanceof File) {
      formData.append('REVISED_PLACEMENT_AND_COUNSELLING_ROOM.document', values.REVISED_PLACEMENT_AND_COUNSELLING_ROOM.document);
    }
  }
  if ("REVISED_PRINCIPAL_ROOM" in values) {
    if (values.REVISED_PRINCIPAL_ROOM.document instanceof File) {
      formData.append('REVISED_PRINCIPAL_ROOM.document', values.REVISED_PRINCIPAL_ROOM.document);
    }
  }
  if ("REVISED_RECEPTION_CUM" in values) {
    if (values.REVISED_RECEPTION_CUM.document instanceof File) {
      formData.append('REVISED_RECEPTION_CUM.document', values.REVISED_RECEPTION_CUM.document);
    }
  }
  if ("REVISED_STAFF_ROOM" in values) {
    if (values.REVISED_STAFF_ROOM.document instanceof File) {
      formData.append('REVISED_STAFF_ROOM.document', values.REVISED_STAFF_ROOM.document);
    }
  }
  if ("REVISED_ADMINISTRATIVE_HALL_SECTION" in values) {
    if (values.REVISED_ADMINISTRATIVE_HALL_SECTION.document instanceof File) {
      formData.append('REVISED_ADMINISTRATIVE_HALL_SECTION.document', values.REVISED_ADMINISTRATIVE_HALL_SECTION.document);
    }
  }

  // Amenites
  if ("REVISED_FIRST_AID_ROOM" in values) {
    if (values.REVISED_FIRST_AID_ROOM.document instanceof File) {
      formData.append('REVISED_FIRST_AID_ROOM.document', values.REVISED_FIRST_AID_ROOM.document);
    }
  }
  if ("REVISED_LIBRARY_AND_READING_ROOM" in values) {
    if (values.REVISED_LIBRARY_AND_READING_ROOM.document instanceof File) {
      formData.append('REVISED_LIBRARY_AND_READING_ROOM.document', values.REVISED_LIBRARY_AND_READING_ROOM.document);
    }
  }
  if ("REVISED_PLAYGROUND" in values) {
    if (values.REVISED_PLAYGROUND.document instanceof File) {
      formData.append('REVISED_PLAYGROUND.document', values.REVISED_PLAYGROUND.document);
    }
  }
  if ("REVISED_DRINKING_WATER_FACILITY" in values) {
    if (values.REVISED_DRINKING_WATER_FACILITY.document instanceof File) {
      formData.append('REVISED_DRINKING_WATER_FACILITY.document', values.REVISED_DRINKING_WATER_FACILITY.document);
    }
  }
  if ("REVISED_AVAILABILITY_OF_STAIRCASES" in values) {
    if (values.REVISED_AVAILABILITY_OF_STAIRCASES.document instanceof File) {
      formData.append('REVISED_AVAILABILITY_OF_STAIRCASES.document', values.REVISED_AVAILABILITY_OF_STAIRCASES.document);
    }
  }
  if ("REVISED_TOILETS_WATER_CLOSETS" in values) {
    if (values.REVISED_TOILETS_WATER_CLOSETS.document instanceof File) {
      formData.append('REVISED_TOILETS_WATER_CLOSETS.document', values.REVISED_TOILETS_WATER_CLOSETS.document);
    }
  }
  if ("REVISED_GENERAL_PARKING_DETAILS" in values) {
    if (values.REVISED_GENERAL_PARKING_DETAILS.document instanceof File) {
      formData.append('REVISED_GENERAL_PARKING_DETAILS.document', values.REVISED_GENERAL_PARKING_DETAILS.document);
    }
  }


  // Signage Boards
  if ("REVISED_SIGNAGE_BOARD_ON_PLOT_ENTRANCE" in values) {
    if (values.REVISED_SIGNAGE_BOARD_ON_PLOT_ENTRANCE.document instanceof File) {
      formData.append('REVISED_SIGNAGE_BOARD_ON_PLOT_ENTRANCE.document', values.REVISED_SIGNAGE_BOARD_ON_PLOT_ENTRANCE.document);
    }
  }
  if ("REVISED_SIGNAGE_BOARD_ON_INSTITUTE_BUILDING" in values) {
    if (values.REVISED_SIGNAGE_BOARD_ON_INSTITUTE_BUILDING.document instanceof File) {
      formData.append('REVISED_SIGNAGE_BOARD_ON_INSTITUTE_BUILDING.document', values.REVISED_SIGNAGE_BOARD_ON_INSTITUTE_BUILDING.document);
    }
  }
  if ("REVISED_SIGNAGE_BOARDS" in values) {
    if (values.REVISED_SIGNAGE_BOARDS.document instanceof File) {
      formData.append('REVISED_SIGNAGE_BOARDS.document', values.REVISED_SIGNAGE_BOARDS.document);
    }
  }
  if ("REVISED_TRADE_DETAILS_BOARD" in values) {
    if (values.REVISED_TRADE_DETAILS_BOARD.document instanceof File) {
      formData.append('REVISED_TRADE_DETAILS_BOARD.document', values.REVISED_TRADE_DETAILS_BOARD.document);
    }
  }
  if ("REVISED_STAFF_DETAILS_BOARD" in values) {
    if (values.REVISED_STAFF_DETAILS_BOARD.document instanceof File) {
      formData.append('REVISED_STAFF_DETAILS_BOARD.document', values.REVISED_STAFF_DETAILS_BOARD.document);
    }
  }
  if ("REVISED_EXIT_BOARD" in values) {
    if (values.REVISED_EXIT_BOARD.document instanceof File) {
      formData.append('REVISED_EXIT_BOARD.document', values.REVISED_EXIT_BOARD.document);
    }
  }
  if ("REVISED_BOARD_INDICATING_DANGER_SIGNS" in values) {
    if (values.REVISED_BOARD_INDICATING_DANGER_SIGNS.document instanceof File) {
      formData.append('REVISED_BOARD_INDICATING_DANGER_SIGNS.document', values.REVISED_BOARD_INDICATING_DANGER_SIGNS.document);
    }
  }
  if ("REVISED_PROHIBITED_AREA_INDICATORS" in values) {
    if (values.REVISED_PROHIBITED_AREA_INDICATORS.document instanceof File) {
      formData.append('REVISED_PROHIBITED_AREA_INDICATORS.document', values.REVISED_PROHIBITED_AREA_INDICATORS.document);
    }
  }
  if ("REVISED_SEXUAL_HARASSMENT_REDRESSAL_COMMITTEE_NOTICE" in values) {
    if (values.REVISED_SEXUAL_HARASSMENT_REDRESSAL_COMMITTEE_NOTICE.document instanceof File) {
      formData.append('REVISED_SEXUAL_HARASSMENT_REDRESSAL_COMMITTEE_NOTICE.document', values.REVISED_SEXUAL_HARASSMENT_REDRESSAL_COMMITTEE_NOTICE.document);
    }
  }



  // Revised ELectricity Files
  if ("REVISED_ELECTRICITY_CONNECTION" in values) {
    if (values.REVISED_ELECTRICITY_CONNECTION.document instanceof File) {
      formData.append('REVISED_ELECTRICITY_CONNECTION.document', values.REVISED_ELECTRICITY_CONNECTION.document);
    }
  }

  if ("REVISED_PHOTO_OF_BACKUP_POWER" in values) {
    if (values.REVISED_PHOTO_OF_BACKUP_POWER.document instanceof File) {
      formData.append('REVISED_PHOTO_OF_BACKUP_POWER.document', values.REVISED_PHOTO_OF_BACKUP_POWER.document);
    }
  }

  if ("REVISED_PURCHASE_RELATED_DOCUMENTS" in values) {
    if (values.REVISED_PURCHASE_RELATED_DOCUMENTS.document instanceof File) {
      formData.append('REVISED_PURCHASE_RELATED_DOCUMENTS.document', values.REVISED_PURCHASE_RELATED_DOCUMENTS.document);
    }
  }
  if ("REVISED_FIRE_AND_SAFETY_CERTIFICATE" in values) {
    if (values.REVISED_FIRE_AND_SAFETY_CERTIFICATE.document instanceof File) {
      formData.append('REVISED_FIRE_AND_SAFETY_CERTIFICATE.document', values.REVISED_FIRE_AND_SAFETY_CERTIFICATE.document);
    }
  }


  return new Promise((resolve, reject) => { api.post("/applicant/save_reply_stage_II_verifications", formData, { headers: { "Content-Type": "multipart/form-data", }, }).then((res) => { resolve(res) }).catch((error) => { reject(error) }); })
};


export const verifyEmailOtp = async (appId, email, otp) => {
  const formData = new FormData();
  formData.append("email", email);
  formData.append("otp", otp);
  formData.append("appId", appId);
  return new Promise((resolve, reject) => {
    api.post("/applicant/verifyEmailOtp", formData).then((res) => { resolve(res) }).catch((error) => { reject(error) });
  })
};



export const getStage1ApplicationInfo = async (appId) => {
  const formData = new FormData();
  formData.append("appId", appId);
  return new Promise((resolve, reject) => {
    api.post("/applicant/getStage1ApplicationInfo", formData).then((res) => { resolve(res) }).catch((error) => { reject(error) });
  })
};