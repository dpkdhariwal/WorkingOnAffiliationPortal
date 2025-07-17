// These Below Constants are used in the registration process of the ITI panel new application.
export const SAVE_APP_CATEGORY = "SAVE_APP_CATEGORY";
export const UPDATE_APP_CATEGORY = "UPDATE_APP_CATEGORY";

//Applicant Entity Details
export const SAVE_APPLICANT_ENTITY_DETAILS = "SAVE_APPLICANT_ENTITY_DETAILS";
export const UPDATE_APPLICANT_ENTITY_DETAILS = "SAVE_APPLICANT_ENTITY_DETAILS";

export const entityCategories = [
  {
    label: "Society / Trust",
    metaInfo: {
      i: "An entity registered under the Societies Registration Act, 1860 as amended from time to time or any other relevant Acts, through the Chairman/ Secretary of Society.",
    },
  },
  {
    label: "Private Limited Company",
    metaInfo: {
      i: "A company incorporated under the Companies Act, 2013, having limited liability, where ownership is restricted to a small group of shareholders, primarily for non-governmental, commercial, or educational initiatives.",
    },
  },
  {
    label: "Public Limited Company",
    metaInfo: {
      i: "A company incorporated under the Companies Act, 2013, where shares are publicly traded on stock exchanges.",
    },
  },
  {
    label: "Sole Proprietor",
    metaInfo: {
      i: "An individual owning, managing, and controlling an unincorporated business, assuming full responsibility for liabilities and operations, including running an ITI",
    },
  },
  {
    label: "Private Institution / Individual",
    metaInfo: { i: "" },
  },
  {
    label: "Public Sector Undertaking",
    metaInfo: {
      i: "A Public Sector Undertaking (PSU) is a governmentowned corporation, company, or statutory body in which the Central Government, State Government, or Union Territory Government holds more than 51% of the paid-up share capital",
    },
  },
  {
    label: "Central / State Government / Union Territory Administration",
    metaInfo: { i: "" },
  },
];

export const stateList = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
];

export const IndianStates = [
  {
    value: "",
    label: "Select State",
    districts: [],
  },
  {
    value: "Andhra Pradesh",
    label: "Andhra Pradesh",
    districts: [
      "Anantapur",
      "Chittoor",
      "East Godavari",
      "Guntur",
      "Kadapa",
      "Krishna",
      "Kurnool",
      "Nellore",
      "Prakasam",
      "Srikakulam",
      "Visakhapatnam",
      "Vizianagaram",
      "West Godavari",
    ],
  },
  {
    value: "Arunachal Pradesh",
    label: "Arunachal Pradesh",
    districts: [
      "Tawang",
      "West Kameng",
      "East Kameng",
      "Papum Pare",
      "Kurung Kumey",
      "Lower Subansiri",
      "Upper Subansiri",
    ],
  },
  {
    value: "Assam",
    label: "Assam",
    districts: [
      "Baksa",
      "Barpeta",
      "Bongaigaon",
      "Cachar",
      "Darrang",
      "Dhemaji",
      "Dhubri",
      "Dibrugarh",
      "Goalpara",
      "Golaghat",
      "Guwahati",
      "Hailakandi",
      "Jorhat",
      "Kamrup",
      "Karbi Anglong",
      "Karimganj",
      "Kokrajhar",
    ],
  },
  {
    value: "Bihar",
    label: "Bihar",
    districts: [
      "Araria",
      "Arwal",
      "Aurangabad",
      "Banka",
      "Begusarai",
      "Bhagalpur",
      "Bhojpur",
      "Darbhanga",
      "Gaya",
      "Gopalganj",
      "Jamui",
      "Jehanabad",
      "Katihar",
      "Khagaria",
      "Kishanganj",
      "Lakhisarai",
      "Madhepura",
      "Madhubani",
    ],
  },
  {
    value: "Chhattisgarh",
    label: "Chhattisgarh",
    districts: [
      "Balod",
      "Baloda Bazar",
      "Balrampur",
      "Bastar",
      "Bemetara",
      "Bijapur",
      "Bilaspur",
      "Dantewada",
      "Dhamtari",
      "Durg",
      "Gariaband",
      "Janjgir-Champa",
      "Jashpur",
    ],
  },
  {
    value: "Goa",
    label: "Goa",
    districts: ["North Goa", "South Goa"],
  },
  {
    value: "Gujarat",
    label: "Gujarat",
    districts: [
      "Ahmedabad",
      "Amreli",
      "Anand",
      "Aravalli",
      "Banaskantha",
      "Bharuch",
      "Bhavnagar",
      "Botad",
      "Chhota Udaipur",
      "Dahod",
      "Dang",
      "Devbhoomi Dwarka",
      "Gandhinagar",
    ],
  },
  {
    value: "Haryana",
    label: "Haryana",
    districts: [
      "Ambala",
      "Bhiwani",
      "Charkhi Dadri",
      "Faridabad",
      "Fatehabad",
      "Gurugram",
      "Hisar",
      "Jhajjar",
      "Jind",
      "Kaithal",
      "Karnal",
    ],
  },
  {
    value: "Himachal Pradesh",
    label: "Himachal Pradesh",
    districts: [
      "Bilaspur",
      "Chamba",
      "Hamirpur",
      "Kangra",
      "Kinnaur",
      "Kullu",
      "Lahaul and Spiti",
      "Mandi",
      "Shimla",
      "Sirmaur",
      "Solan",
      "Una",
    ],
  },
  {
    value: "Jharkhand",
    label: "Jharkhand",
    districts: [
      "Bokaro",
      "Chatra",
      "Deoghar",
      "Dhanbad",
      "Dumka",
      "East Singhbhum",
      "Garhwa",
      "Giridih",
      "Godda",
      "Gumla",
      "Hazaribagh",
      "Jamtara",
      "Khunti",
    ],
  },
  {
    value: "Karnataka",
    label: "Karnataka",
    districts: [
      "Bagalkot",
      "Ballari",
      "Belagavi",
      "Bengaluru Rural",
      "Bengaluru Urban",
      "Bidar",
      "Chamarajanagar",
      "Chikballapur",
      "Chikkamagaluru",
      "Chitradurga",
      "Dakshina Kannada",
      "Davanagere",
    ],
  },
  {
    value: "Kerala",
    label: "Kerala",
    districts: [
      "Alappuzha",
      "Ernakulam",
      "Idukki",
      "Kannur",
      "Kasaragod",
      "Kollam",
      "Kottayam",
      "Kozhikode",
      "Malappuram",
      "Palakkad",
      "Pathanamthitta",
      "Thiruvananthapuram",
      "Thrissur",
      "Wayanad",
    ],
  },
  {
    value: "Madhya Pradesh",
    label: "Madhya Pradesh",
    districts: [
      "Bhopal",
      "Indore",
      "Jabalpur",
      "Gwalior",
      "Rewa",
      "Sagar",
      "Ujjain",
      "Satna",
      "Ratlam",
    ],
  },
  {
    value: "Maharashtra",
    label: "Maharashtra",
    districts: [
      "Ahmednagar",
      "Akola",
      "Amravati",
      "Aurangabad",
      "Beed",
      "Bhandara",
      "Buldhana",
      "Chandrapur",
      "Dhule",
      "Gadchiroli",
      "Gondia",
      "Hingoli",
      "Jalgaon",
    ],
  },
  {
    value: "Manipur",
    label: "Manipur",
    districts: [
      "Bishnupur",
      "Chandel",
      "Churachandpur",
      "Imphal East",
      "Imphal West",
      "Senapati",
      "Tamenglong",
      "Thoubal",
      "Ukhrul",
    ],
  },
  {
    value: "Meghalaya",
    label: "Meghalaya",
    districts: [
      "East Garo Hills",
      "East Jaintia Hills",
      "East Khasi Hills",
      "North Garo Hills",
      "Ri Bhoi",
      "South Garo Hills",
      "South West Garo Hills",
      "South West Khasi Hills",
      "West Garo Hills",
      "West Jaintia Hills",
      "West Khasi Hills",
    ],
  },
  {
    value: "Mizoram",
    label: "Mizoram",
    districts: [
      "Aizawl",
      "Champhai",
      "Kolasib",
      "Lawngtlai",
      "Lunglei",
      "Mamit",
      "Saiha",
      "Serchhip",
    ],
  },
  {
    value: "Nagaland",
    label: "Nagaland",
    districts: [
      "Dimapur",
      "Kiphire",
      "Kohima",
      "Longleng",
      "Mokokchung",
      "Mon",
      "Peren",
      "Phek",
      "Tuensang",
      "Wokha",
      "Zunheboto",
    ],
  },
  {
    value: "Odisha",
    label: "Odisha",
    districts: [
      "Angul",
      "Balangir",
      "Balasore",
      "Bargarh",
      "Bhadrak",
      "Boudh",
      "Cuttack",
      "Deogarh",
      "Dhenkanal",
      "Gajapati",
      "Ganjam",
      "Jagatsinghpur",
      "Jajpur",
    ],
  },
  {
    value: "Punjab",
    label: "Punjab",
    districts: [
      "Amritsar",
      "Barnala",
      "Bathinda",
      "Faridkot",
      "Fatehgarh Sahib",
      "Fazilka",
      "Ferozepur",
      "Gurdaspur",
      "Hoshiarpur",
      "Jalandhar",
    ],
  },
  {
    value: "Rajasthan",
    label: "Rajasthan",
    districts: [
      "Ajmer",
      "Alwar",
      "Banswara",
      "Baran",
      "Barmer",
      "Bharatpur",
      "Bhilwara",
      "Bikaner",
      "Bundi",
      "Chittorgarh",
      "Churu",
      "Dausa",
      "Dholpur",
    ],
  },
  {
    value: "Sikkim",
    label: "Sikkim",
    districts: ["East Sikkim", "North Sikkim", "South Sikkim", "West Sikkim"],
  },
  {
    value: "Tamil Nadu",
    label: "Tamil Nadu",
    districts: [
      "Chennai",
      "Coimbatore",
      "Cuddalore",
      "Dharmapuri",
      "Dindigul",
      "Erode",
      "Kanchipuram",
      "Kanyakumari",
      "Karur",
      "Madurai",
      "Nagapattinam",
      "Namakkal",
    ],
  },
  {
    value: "Telangana",
    label: "Telangana",
    districts: [
      "Adilabad",
      "Bhadradri Kothagudem",
      "Hyderabad",
      "Jagtial",
      "Jangaon",
      "Jayashankar Bhupalpally",
      "Jogulamba Gadwal",
      "Kamareddy",
      "Karimnagar",
    ],
  },
  {
    value: "Tripura",
    label: "Tripura",
    districts: [
      "Dhalai",
      "Gomati",
      "Khowai",
      "North Tripura",
      "Sepahijala",
      "South Tripura",
      "Unakoti",
      "West Tripura",
    ],
  },
  {
    value: "Uttar Pradesh",
    label: "Uttar Pradesh",
    districts: [
      "Agra",
      "Aligarh",
      "Allahabad",
      "Ambedkar Nagar",
      "Amethi",
      "Amroha",
      "Auraiya",
      "Azamgarh",
      "Baghpat",
      "Bahraich",
    ],
  },
  {
    value: "Uttarakhand",
    label: "Uttarakhand",
    districts: [
      "Almora",
      "Bageshwar",
      "Chamoli",
      "Champawat",
      "Dehradun",
      "Haridwar",
      "Nainital",
      "Pauri Garhwal",
      "Pithoragarh",
      "Rudraprayag",
    ],
  },
  {
    value: "West Bengal",
    label: "West Bengal",
    districts: [
      "Alipurduar",
      "Bankura",
      "Birbhum",
      "Cooch Behar",
      "Dakshin Dinajpur",
      "Darjeeling",
      "Hooghly",
      "Howrah",
      "Jalpaiguri",
      "Jhargram",
    ],
  },
];
export const getDistrictsByState = (state) => {
  const stateObj = IndianStates.find((s) => s.value === state);
  return stateObj ? stateObj.districts : [];
};

// Stage II Start
export const UPDATE_BUILDING_DETAILS = "UPDATE_BUILDING_DETAILS";
export const UPDATE_ELECTRICTY_CONNECTION_DETAILS =
  "UPDATE_ELECTRICTY_CONNECTION_DETAILS";

// Stage II End

// Form Applicant Entity Details
export const UPDATE_ENTITY_DETAILS = "UPDATE_ENTITY_DETAILS";
export const UPDATE_PURPOSED_INSTI_INFO = "UPDATE_PURPOSED_INSTI_INFO";

// Details of Trade(s)/Unit(s) for Affiliation
export const ADD_MORE_TRADE = "ADD_MORE_TRADE";
export const UPDATE_TRADE_UNIT = "UPDATE_TRADE_UNIT";

// Details of the Land to be used for the ITI
export const UPDATE_LAND_INFO = "UPDATE_LAND_INFO";

export const UPDATE_LAND_DOCUMENT_INFO = "UPDATE_LAND_DOCUMENT_INFO";
export const ADD_MORE_LAND_DOCUMENT = "ADD_MORE_LAND_DOCUMENT";

export const UPDATE_LEASE_DEED_DOCUMENT_INFO =
  "UPDATE_LEASE_DEED_DOCUMENT_INFO";
export const ADD_MORE_LEASE_DOCUMENT = "ADD_MORE_LEASE_DOCUMENT";

export const languages = [
  "",
  "Hindi",
  "English",
  "Bengali",
  "Telugu",
  "Marathi",
  "Tamil",
  "Urdu",
  "Gujarati",
  "Kannada",
  "Odia",
  "Malayalam",
  "Punjabi",
];

export const ID_Proof_Doc_list = [
  "Aadhaar Card",
  "PAN Card",
  "Passport",
  "Voter ID Card",
  "Driving License",
];

export const designation = ["Secretary", "Chairperson", "President"];

export const ctsTrades = [
  "Select Trade",
  "Electrician",
  "Fitter",
  "Turner",
  "Machinist",
  "Welder (Gas and Electric)",
  "Mechanic (Motor Vehicle)",
  "Mechanic Diesel",
  "Electronics Mechanic",
  "Refrigeration and Air Conditioning Technician",
  "Instrument Mechanic",
  "Information & Communication Technology System Maintenance",
  "Computer Operator and Programming Assistant (COPA)",
  "Draughtsman (Mechanical)",
  "Draughtsman (Civil)",
  "Wireman",
  "Surveyor",
  "Tool and Die Maker (Press Tools, Jigs & Fixtures)",
  "Plumber",
  "Carpenter",
  "Foundryman",
  "Painter (General)",
  "Sheet Metal Worker",
  "Mechanic (Tractor)",
  "Mechanic (Auto Electrical and Electronics)",
  "Fashion Design & Technology",
  "Dress Making",
  "Stenographer & Secretarial Assistant (English)",
  "Stenographer & Secretarial Assistant (Hindi)",
  "Baker and Confectioner",
  "Food Production (General)",
  "Health Sanitary Inspector",
  "Hair & Skin Care",
  "Sewing Technology",
];

export const AffiliationCategory = [
  { name: "Application for Establishment of New ITIs", master: "01" },
  {
    name: "Application for opening Mini Skill Training Institute",
    master: "02",
  },
  {
    name: "Establishment of New Age ITIs or Adoption of existing ITIs by industry entities",
    master: "03",
  },
  {
    name: "Application for Existing ITIs",
    master: "04",
    subCate: [
      { name: "Addition of New Trades/Units", master: "01" },
      { name: "Name Change of the ITI", master: "02" },
      { name: "Shifting/Relocation or Merger of ITIs", master: "03" },
      {
        name: "SCVT to NCVET conversion of Trades (for existing Government ITIs)",
        master: "04",
      },
      { name: "Renewal of Affiliation", master: "05" },
      {
        name: "Affiliation under the Dual System of Training (DST)",
        master: "06",
      },
      { name: "Surrender of Trade/Units", master: "07" },
    ],
  },
];

export const UPDATE_SET_FEE_STATUS = "UPDATE_SET_FEE_STATUS";
export const UPDATE_STAGE_II_SET_FEE_STATUS = "UPDATE_STAGE_II_SET_FEE_STATUS";



export const UPDATE_STAGE_I_FEE_PAID = "UPDATE_STAGE_I_FEE_PAID";
export const UPDATE_STAGE_II_FEE_PAID = "UPDATE_STAGE_II_FEE_PAID";
export const SET_STAGE_I__DOCUMENT_STATUS = "SET_STAGE_I__DOCUMENT_STATUS";

// App Flow
export const STAGE_I__NOT_FILLED = "STAGE_I__NOT_FILLED";
export const STAGE_I__FILLED = "STAGE_I__FILLED";
export const STAGE_II__FILLED = "STAGE_II__FILLED";


export const STAGE_I__FEE_PENDING = "STAGE_I__FEE_PENDING";
export const STAGE_II__FEE_PENDING = "STAGE_II__FEE_PENDING";

export const STAGE_I__FEE_PAID = "STAGE_I__FEE_PAID";
export const STAGE_II__FEE_PAID = "STAGE_II__FEE_PAID";

export const STAGE_I__FEE_EXEMPTED = "STAGE_I__FEE_EXEMPTED";
export const STAGE_II__FEE_EXEMPTED = "STAGE_II__FEE_EXEMPTED";


export const STAGE_I__DOCUMENT_PENDING = "STAGE_I__DOCUMENT_PENDING";
export const STAGE_II__DOCUMENT_PENDING = "STAGE_I__DOCUMENT_PENDING";

export const STAGE_I__DOCUMENT_UPLOADED = "STAGE_I__DOCUMENT_UPLOADED";

export const STAGE_I__SUBMIT_PENDING = "STAGE_I__SUBMIT_PENDING";
export const STAGE_II__SUBMIT_PENDING = "STAGE_II__SUBMIT_PENDING";

export const STAGE_I__SUBMITED = "STAGE_I__SUBMITED";

// export const STAGE_I__APP_SUBMIT_PENDING = "STAGE_I__APP_SUBMIT_PENDING";
// export const STAGE_I__APP_SUBMITED = "STAGE_I__APP_SUBMITED";
export const STAGE_I__ASSESSMENT_PENDING = "STAGE_I__ASSESSMENT_PENDING";
export const STAGE_I__ASSESSMENT_ON_PROGRESS =
  "STAGE_I__ASSESSMENT_ON_PROGRESS";
export const STAGE_I__ASSESSMENT_COMPLETED = "STAGE_I__ASSESSMENT_COMPLETED";

// export const AppFlow = {
//   feepaid: {
//     status: "Paid", // Paid | Un-paid
//   },
// };

export const STAGE_I_FORM_FILLING = "STAGE_I_FORM_FILLING";
export const STAGE_II_FORM_FILLING = "STAGE_II_FORM_FILLING";

export const STAGE_I_FEE = "STAGE_I_FEE";
export const STAGE_II_FEE = "STAGE_I_FEE";

export const STAGE_I_DOCUMENT_UPLAOD = "STAGE_I_DOCUMENT_UPLAOD";
export const STAGE_I_SUBMIT = "STAGE_I_SUBMIT";
export const STAGE_I__ASSESSMENT = "STAGE_I__ASSESSMENT";

export const AppFlow = [
  {
    step: STAGE_I_FORM_FILLING,
    status: STAGE_I__NOT_FILLED, // STAGE_I__FILLED || STAGE_I__NOT_FILLED
  },
  {
    step: STAGE_I_FEE,
    status: STAGE_I__FEE_PENDING, //  STAGE_I__FEE_PENDING || STAGE_I__FEE_PAID || STAGE_I__FEE_EXEMPTED
  },
  {
    step: STAGE_I_DOCUMENT_UPLAOD,
    status: STAGE_I__DOCUMENT_PENDING, // STAGE_I__DOCUMENT_PENDING|| STAGE_I__DOCUMENT_UPLOADED
  },
  {
    step: STAGE_I_SUBMIT,
    status: STAGE_I__SUBMIT_PENDING, // STAGE_I__SUBMIT_PENDING || STAGE_I__SUBMITED
  },
  {
    step: STAGE_I__ASSESSMENT,
    status: STAGE_I__ASSESSMENT_PENDING, // STAGE_I__ASSESSMENT_PENDING || STAGE_I__ASSESSMENT_ON_PROGRESS || STAGE_I__ASSESSMENT_COMPLETED
  },
];


// Workshop Information to be filled Start
export const work_shop_info_to_be_filled = [
  {
    tradeId: "tradeId01",
    tradeName: "Fitter",
    Particulars: "Workshop 1",
    Required_Area_As_per_norms: "100sqm",
  },
  {
    tradeId: "tradeId02",
    tradeName: "Fitter",
    Particulars: "Workshop 2",
    Required_Area_As_per_norms: "200sqm",
  },
];
export const UPDATE_TRADEWISE_WORKSHOP_DETAILS = "UPDATE_TRADEWISE_WORKSHOP_DETAILS";
// Workshop Information to be filled End

// Classroom Information to be filled Start
export const classrooms_info_to_be_filled = [
  {
    tradeId: "tradeId01",
    tradeName: "Fitter",
    Particulars: "Classroom 1",
    Required_Area_As_per_norms: "200sqm",
  },
  {
    tradeId: "tradeId02",
    tradeName: "Fitter",
    Particulars: "Classroom 2",
    Required_Area_As_per_norms: "400sqm",
  },
];
export const UPDATE_TRADEWISE_CLASSROOMS_DETAILS = "UPDATE_TRADEWISE_CLASSROOMS_DETAILS";
// Classroom Information to be filled End



// Multipurpose Hall Information to be filled Start
export const multipurposehall_info_to_be_filled = [
  {
    Particulars: "Multipurpose Hall",
    Required_Area_As_per_norms: "200sqm",
  },
];
export const UPDATE_MULTIPURPOSEHALL_DETAILS = "UPDATE_TRADEWISE_MULTIPURPOSEHALL_DETAILS";
// Multipurpose Hall Information to be filled End


// IT Lab Information to be filled Start
export const it_lab_info_to_be_filled = [
  {
    Particulars: "IT Lab",
    Required_Area_As_per_norms: "200sqm",
  },
];
export const UPDATE_IT_LAB_DETAILS = "UPDATE_IT_LAB_DETAILS";
// IT Lab Information to be filled End


// Library Information to be filled Start
export const it_library_to_be_filled = [
  {
    Particulars: "Library",
    Required_Area_As_per_norms: "200sqm",
  },
];
export const UPDATE_LIBRARY_DETAILS = "UPDATE_LIBRARY_DETAILS";
// Library Information to be filled End


// Placement and Counselling room Information to be filled Start
export const placement_n_counselling_room_to_be_filled = [
  {
    Particulars: "Placement and Counselling Room",
    Required_Area_As_per_norms: "200sqm",
  },
];
export const UPDATE_PLACEMENT_N_COUNSELLING_ROOM_DETAILS = "UPDATE_LIBRARY_DETAILS";
// Placement and Counselling room Information to be filled End


// Placement and Counselling room Information to be filled Start
export const administrativeArea = [
  {
    Particulars: "Principal Room",
    Required_Area_As_per_norms: "20 sq. m",
  },
  {
    Particulars: "Reception cum waiting lobby",
    Required_Area_As_per_norms: "40 sq. m",
  },
  {
    Particulars: "Staff Room",
    Required_Area_As_per_norms: "20 sq. m",
  },
  {
    Particulars: "Administrative Hall/Section",
    Required_Area_As_per_norms: "50 sq. m",
  },
];
export const UPDATE_ADMINISTRATIVE_AREA_DETAILS = "UPDATE_LIBRARY_DETAILS";
// Placement and Counselling room Information to be filled End







// Stage II Document Upload Start
export const UPDATE_STAGE_II_DOCUMENT_UPLOAD = "UPDATE_STAGE_II_DOCUMENT_UPLOAD";

export const geo_tagged_photo_of_machinery_tools_equipments =  [
  {
    tradeId: "tradeId01",
    tradeName: "Fitter",
    unit:1,
    Particulars: "Machinery/Tools/Equipments",
  },
  {
    tradeId: "tradeId02",
    tradeName: "Fitter",
    unit:1,
    Particulars: "Machinery/Tools/Equipments",
  },
  {
    tradeId: "tradeId01",
    tradeName: "Electrician",
    unit:1,
    Particulars: "Machinery/Tools/Equipments",
  },
  {
    tradeId: "tradeId02",
    tradeName: "Electrician",
    unit:1,
    Particulars: "Machinery/Tools/Equipments",
  },
];

export const gst_invoices_for_major_machinery_purchase_and_payment_proof =  [
  {
    tradeId: "tradeId01",
    tradeName: "Fitter",
    Particulars: "MTE Purchase Bills",
  },
  {
    tradeId: "tradeId02",
    tradeName: "Electrician",
    Particulars: "MTE Purchase Bills",
  },
];
// Stage II Document Upload End
