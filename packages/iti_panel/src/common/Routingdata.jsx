import Dashboard from './../components/dashboard/Dashboard';
// import New_registration from './../components/new_registration/new_registration';
import New_registration from './../components/new_registration/new_registration_test';


import Form_stageII from '../components/new_registration/form_stageII'

import GeoTaggedPhoto from '../components/geotagged';


import Assessment from "../components/Assessment/Assessment";
import AssessmentII from "../components/Assessment/AssessmentII";
import {TimeLine} from "../components/TimeLine/TimeLine";
export const Routedata = [
    {
        id: 1,
        path: `${import.meta.env.BASE_URL}/`,
        elementName: <Dashboard />,
    },
    {
        id: 1,
        path: `${import.meta.env.BASE_URL}dashboard/dashboard`,
        elementName: <Dashboard />,
    },

    {
        id: 1,
        path: `${import.meta.env.BASE_URL}dashboard/new_registration`,
        elementName: <New_registration />,
    },

    {
        id: 1,
        path: `${import.meta.env.BASE_URL}dashboard/form_stageII`,
        elementName: <Form_stageII />,
    },
    {
        id: 1,
        path: `${import.meta.env.BASE_URL}dashboard/geoTaggedSample`,
        elementName: <GeoTaggedPhoto />,
    },
    {
        id: 1,
        path: `${import.meta.env.BASE_URL}dashboard/Assessment`,
        elementName: <Assessment />,
    },
    {
        id: 1,
        path: `${import.meta.env.BASE_URL}dashboard/AssessmentII`,
        elementName: <AssessmentII />,
    },
    {
        id: 1,
        path: `${import.meta.env.BASE_URL}dashboard/TimeLine`,
        elementName: <TimeLine />,
    },
];
