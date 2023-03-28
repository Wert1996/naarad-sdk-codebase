import { BrowserRouter, Routes, Route } from "react-router-dom";

// import { useWallet } from '@solana/wallet-adapter-react';

import { ApiKeys } from '../ApiKeys/ApiKeys';
import { DappManager } from '../DappManager/DappManager';
import { DashboardLayout } from "../DashboardLayout/DashboardLayout";
import { Tracker } from '../Tracker/Tracker';


export const Dashboard = () => {
    return (
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<ApiKeys />} />
            <Route path="dapps" element={<DappManager />} />
            <Route path="tracker" element={<Tracker />} />
          </Route>
        </Routes>
      </BrowserRouter>
    )
}