import {createBrowserRouter} from "react-router-dom";

import LoginPage from "@/features/auth/pages/login-page.tsx";


export const router = createBrowserRouter([
    {path: '/', element: <div>main</div>},
    {path: 'login', element: <LoginPage/>},
    {path: 'register', element: <div>register</div>},
]);