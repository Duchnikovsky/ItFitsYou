"use client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

interface LayoutProps {
  children: ReactNode;
}

const queryClient = new QueryClient();

export default function Providers({ children }: LayoutProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        {children}
        <ToastContainer />
      </SessionProvider>
    </QueryClientProvider>
  );
}
