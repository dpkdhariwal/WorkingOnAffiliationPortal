
import { initDB } from "../../../db";
import * as C from "../../../../constants";
import { SL, STAGE_II } from "../../../../constants";



export const ASSESSMENT_STAGE_II_FLOW = [
    {
        stepNo: 1,
        stepLabel: STAGE_II.AppFormStepper.BUILDING_DETAIL.label,
        step: STAGE_II.AppFormStepper.BUILDING_DETAIL.key,
        status: SL.COMPLETED, //SL.COMPLETED || SL.ON_PROGRESS
        nextStep: STAGE_II.AppFormStepper.CIVIL_INFRASTRUCTURE_DETAIL.key,
        stepStatus: SL.ACTIVE, // SL.ACTIVE || SL.IN_ACTIVE
        subSteps: [
            {
                stepNo: 1,
                stepLabel: "Building Detail",
                step: "Building Plan",
                status: SL.VERIFIED, // SL.VERIFIED ||  SL.NC ||  SL.PENDING_FOR_VERIFICATION 
                nextStep: CIC.TRADEWISE_CLASSROOMS,
                stepStatus: SL.ACTIVE, // SL.ACTIVE || SL.IN_ACTIVE
            },
            {
                stepNo: 2,
                stepLabel: "Building Completion Certificate (BCC)",
                step: "Building Completion Certificate (BCC)",
                status: SL.VERIFIED, // SL.VERIFIED ||  SL.NC ||  SL.PENDING_FOR_VERIFICATION 
                nextStep: CIC.MULTIPURPOSE_HALL,
                stepStatus: SL.ACTIVE, // SL.ACTIVE || SL.IN_ACTIVE
            },
            {
                stepNo: 3,
                stepLabel: "Photos of Building",
                step: "Photos of Building",
                status: SL.VERIFIED, // SL.VERIFIED ||  SL.NC ||  SL.PENDING_FOR_VERIFICATION 
                nextStep: CIC.IT_LAB,
                stepStatus: SL.ACTIVE, // SL.ACTIVE || SL.IN_ACTIVE
            },
        ],
    },
    {
        stepNo: 2,
        stepLabel: "Civil Infrastructure Detail",
        step: STAGE_II.AppFormStepper.CIVIL_INFRASTRUCTURE_DETAIL.key,
        status: SL.COMPLETED, // SL.ON_PROGRESS
        nextStep: STAGE_II.AppFormStepper.AMENITIES_AREA.key,
        stepStatus: SL.ACTIVE, // SL.ACTIVE || SL.IN_ACTIVE
        subSteps: [
            {
                stepNo: 1,
                step: CIC.TRADEWISE_WORKSHOP,
                status: NOT_FILLED, // FILLED || NOT_FILLED 
                stepTitle: "Tradewise Workshop",
                nextStep: CIC.TRADEWISE_CLASSROOMS,
                stepStatus: SL.ACTIVE, // SL.ACTIVE || SL.IN_ACTIVE
                workshopList: [
                    {
                        TradeName: 'Fitter',
                        Particulars: 'WORKSHOP_1',
                        status: SL.VERIFIED, // SL.VERIFIED ||  SL.NC ||  SL.PENDING_FOR_VERIFICATION 
                    },
                    {
                        TradeName: 'Fitter',
                        Particulars: 'WORKSHOP_2',
                        status: SL.VERIFIED, // SL.VERIFIED ||  SL.NC ||  SL.PENDING_FOR_VERIFICATION 
                    },
                ]
            },
            {
                stepNo: 2,
                step: CIC.TRADEWISE_CLASSROOMS,
                status: NOT_FILLED, // NOT_FILLED
                stepTitle: "TradeWise Classrooms",
                nextStep: CIC.MULTIPURPOSE_HALL,
                stepStatus: IN_ACTIVE, // ACTIVE || IN_ACTIVE
                classroomList: [
                    {
                        TradeName: 'Fitter',
                        Particulars: 'CLASSROOM_1',
                        status: SL.VERIFIED, // SL.VERIFIED ||  SL.NC ||  SL.PENDING_FOR_VERIFICATION 
                    },
                    {
                        TradeName: 'Fitter',
                        Particulars: 'CLASSROOM_2',
                        status: SL.VERIFIED, // SL.VERIFIED ||  SL.NC ||  SL.PENDING_FOR_VERIFICATION 
                    },
                ]
            },
            {
                stepNo: 3,
                step: CIC.MULTIPURPOSE_HALL,
                status: NOT_FILLED, // NOT_FILLED
                stepTitle: "Multipurpose hall",
                nextStep: CIC.IT_LAB,
                stepStatus: IN_ACTIVE, // ACTIVE || IN_ACTIVE
            },
            {
                stepNo: 4,
                step: CIC.IT_LAB,
                status: NOT_FILLED, // NOT_FILLED
                stepTitle: "IT Lab",
                nextStep: CIC.LIBRARY,
                stepStatus: IN_ACTIVE, // ACTIVE || IN_ACTIVE

            },
            {
                stepNo: 5,
                step: CIC.LIBRARY,
                status: NOT_FILLED, // NOT_FILLED
                stepTitle: "Library",
                nextStep: CIC.PLACEMENT_AND_COUNSELLING_ROOM,
                stepStatus: IN_ACTIVE, // ACTIVE || IN_ACTIVE

            },
            {
                stepNo: 6,
                step: CIC.PLACEMENT_AND_COUNSELLING_ROOM,
                status: NOT_FILLED, // NOT_FILLED
                stepTitle: "Placement and counselling room",
                nextStep: CIC.ADMINISTRATIVE_AREA,
                stepStatus: IN_ACTIVE, // ACTIVE || IN_ACTIVE

            },
            {
                stepNo: 8,
                step: CIC.ADMINISTRATIVE_AREA,
                status: NOT_FILLED, // NOT_FILLED
                stepTitle: "Administrative Area",
                nextStep: null,
                stepStatus: IN_ACTIVE, // ACTIVE || IN_ACTIVE

            },
        ],
    },
    {
        stepNo: 3,
        stepLabel: "Amenities Area",
        step: STAGE_II.AppFormStepper.AMENITIES_AREA.key,
        status: SL.COMPLETED, // SL.ON_PROGRESS
        nextStep: STAGE_II.AppFormStepper.SIGNAGE_BOARDS.key,
        stepStatus: SL.ACTIVE, // SL.ACTIVE || SL.IN_ACTIVE
    },
    {
        stepNo: 4,
        stepLabel: "Signage Boards",
        step: STAGE_II.AppFormStepper.SIGNAGE_BOARDS.key,
        status: SL.COMPLETED, // SL.ON_PROGRESS
        nextStep: STAGE_II.AppFormStepper.ELECTRICITY_CONNECTION_DETAILS.key,
        stepStatus: SL.IN_ACTIVE, // ACTIVE || IN_ACTIVE

    },
    {
        stepNo: 5,
        stepLabel: "Electricity Connection Details",
        step: STAGE_II.AppFormStepper.ELECTRICITY_CONNECTION_DETAILS.key,
        status: SL.COMPLETED, // SL.ON_PROGRESS
        nextStep: STAGE_II.AppFormStepper.FEE_PAYMENT_FOR_STAGEII.key,
        stepStatus: SL.IN_ACTIVE, // ACTIVE || IN_ACTIVE
    },
    {
        stepNo: 6,
        stepLabel: "Miscellaneous",
        step: STAGE_II.AppFormStepper.MISCELLANEOUS,
        status: SL.COMPLETED, // SL.ON_PROGRESS
        nextStep: STAGE_II.AppFormStepper.FEE_PAYMENT_FOR_STAGEII.key,
        stepStatus: SL.IN_ACTIVE, // ACTIVE || IN_ACTIVE
    },
    {
        stepNo: 7,
        stepLabel: "Fee Payment For StageII",
        step: STAGE_II.AppFormStepper.FEE_PAYMENT_FOR_STAGEII.key,
        status: SL.COMPLETED, // SL.ON_PROGRESS
        nextStep: STAGE_II.AppFormStepper.TRADEWISE_MACHINERY__TOOLS__EQUIPMENT_DETAILS.key,
        stepStatus: SL.IN_ACTIVE, // ACTIVE || IN_ACTIVE
    },
    {
        stepNo: 8,
        stepLabel: "Tradewise Machinery/Tools/Equipment Details",
        step: STAGE_II.AppFormStepper.TRADEWISE_MACHINERY__TOOLS__EQUIPMENT_DETAILS.key,
        status: SL.COMPLETED, // SL.ON_PROGRESS
        nextStep: STAGE_II.AppFormStepper.DOCUMENT_UPLOADS.key,
        stepStatus: SL.IN_ACTIVE, // ACTIVE || IN_ACTIVE
    },
    {
        stepNo: 9,
        stepLabel: "Document Uploads",
        step: STAGE_II.AppFormStepper.DOCUMENT_UPLOADS.key,
        status: SL.COMPLETED, // SL.ON_PROGRESS
        nextStep: null,
        stepStatus: SL.IN_ACTIVE, // ACTIVE || IN_ACTIVE
    },
];