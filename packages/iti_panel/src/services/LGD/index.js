import { api } from '../auth/login';
export const getError = (error) => {
  const message = error.message || 'Failed'
  return new Error(message)
}


const getStates = async () => {
  try {
    const response = await api.post("/lgd/states/v1");
    return response.data;
  } catch (error) {
    console.error("Error fetching states:", error);
    throw error;
  }
};

const getDistricts = async (stateCode) => {
  try {
    const response = await api.post("/lgd/districts/v1", {
      stateCode: stateCode,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching districts:", error);
    throw error;
  }
};

const getSubdistricts = async (stateCode, districtCode) => {
  try {
    const response = await api.post("/lgd/subdistricts/v1", {
      stateCode: stateCode,
      districtCode: districtCode,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching subdistricts:", error);
    throw error;
  }
};

const getVillages = async (stateCode, districtCode, subdistrictCode) => {
  try {
    const response = await api.post("/lgd/villages/v1", {
      stateCode: stateCode,
      districtCode: districtCode,
      subdistrictCode: subdistrictCode,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching villages:", error);
    throw error;
  }
};

const getPincodes = async (villageCode) => {
  try {
    const response = await api.post("/lgd/pincode/v1", {
      villageCode: villageCode,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching pincodes:", error);
    throw error;
  }
};

export { getStates, getDistricts, getSubdistricts, getVillages, getPincodes };



