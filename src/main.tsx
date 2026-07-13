import {StrictMode} from "react";

import {createRoot} from 'react-dom/client';

// eslint-disable-next-line import/order
import './index.css';

import {RouterProvider} from "react-router-dom";

import {QueryProvider} from "@/app/providers/QueryProvider.tsx";
import {router} from "@/app/router/router.tsx";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryProvider>
            <RouterProvider router={router}/>
        </QueryProvider>
    </StrictMode>
);
