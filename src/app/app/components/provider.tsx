"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import Sidebar from "./sidebar";
import LastUpdated from "./lastUpdated";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { useScreen, useSidebar } from "@/hooks/zustand";
import { usePathname } from "next/navigation";
import { LogOut, PanelRightOpen, ShieldAlert } from "lucide-react";
import { SidebarToggle } from "@/utils/sidebarToggle";
import { useUserInfo } from "@/hooks/query";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: Infinity,
      retry: false,
    },
  },
});

const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  const myDivRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        myDivRef.current &&
        event.target instanceof Node &&
        (myDivRef.current as HTMLElement).contains &&
        !(myDivRef.current as HTMLElement).contains(event.target)
      ) {
        SidebarToggle();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [myDivRef]);

  if (typeof window !== "undefined") {
    const localStoragePersister = createAsyncStoragePersister({
      storage: window.localStorage,
    });
    persistQueryClient({
      persister: localStoragePersister,
      queryClient,
      maxAge: 1000 * 60 * 60 * 24 * 30,
      buster: "v1.0.0",
    });
  }
  const { isMobile } = useScreen();
  const { isOpen } = useSidebar();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex w-dvw h-dvh p-2 gap-2 overflow-hidden">
        <div
          ref={isOpen && isMobile ? myDivRef : null}
          className={`${
            isMobile
              ? `z-10 fixed inset-y-2 bg-white/5 backdrop-blur-xl rounded-lg transform-gpu transition-transform duration-300 min-w-64 ${
                  isOpen ? "translate-x-0" : "-translate-x-96"
                } `
              : "min-w-76"
          } `}
        >
          <Sidebar />
        </div>
        <div className="flex-1 bg-black/30 rounded-lg apply-border-md flex flex-col w-full h-full ">
          <MenuBar />
          <LastUpdated />
          <div className="p-3 overflow-y-auto h-full w-full overflow-x-clip ">
            {children}
          </div>
        </div>
      </div>
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  );
};

export default QueryProvider;

const MenuBar = () => {
  const path = usePathname().split("/");
  return (
    <div className="min-h-14 px-4 justify-between items-center flex text-lg  border-b border-slate-400/10">
      <span className="flex items-center gap-4">
        {useScreen().isMobile && (
          <span onClick={SidebarToggle}>
            <PanelRightOpen className="w-5 h-5 cursor-pointer" />
          </span>
        )}
        <span className="capitalize">{path[path.length - 1]}</span>
      </span>
      <ProfileIcon />
    </div>
  );
};

const ProfileIcon = () => {
  const [toggle, setToggle] = useState(false);
  const { data } = useUserInfo();
  const iconRef = useRef<HTMLDivElement>(null);
  const dropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!toggle) return;

    function handleClickOutside(event: MouseEvent) {
      if (
        dropRef.current &&
        !dropRef.current.contains(event.target as Node) &&
        iconRef.current &&
        !iconRef.current.contains(event.target as Node)
      ) {
        setToggle(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toggle]);

  return (
    <div
      ref={iconRef}
      className="relative w-10 h-10 shadow-2xl flex items-center justify-center font-semibold apply-border-md background-rounded cursor-pointer"
      onClick={() => setToggle((prev) => !prev)}
    >
      {data?.name
        ?.split(" ")
        .map((i) => i[0])
        .join("")
        .slice(0, 2)}
      {toggle && (
        <ProfileDrop dropRef={dropRef as React.RefObject<HTMLDivElement>} />
      )}
    </div>
  );
};

const ProfileDrop = ({
  dropRef,
}: {
  dropRef: React.RefObject<HTMLDivElement>;
}) => {
  return (
    <div
      ref={dropRef}
      className="absolute top-12 right-0 w-48  bg-white/5 backdrop-blur-sm apply-border-md rounded-xl z-50 flex flex-col shadow-2xl overflow-hidden"
    >
      <a
        href="https://chat.whatsapp.com/B6a15jYEKgI1UD7QzX39cM"
        target="_blank"
        className="w-full px-4 py-3 flex justify-between items-center font-medium hover:bg-white/10 transition-colors focus:outline-none border-b border-white/5"
      >
        <span>Support</span>
        <span>
          <ShieldAlert className="w-5 h-5" />
        </span>
      </a>
      <a
        href="/auth/logout"
        className="w-full px-4 py-3 flex justify-between items-center font-medium text-red-400 hover:bg-white/10 transition-colors focus:outline-none"
      >
        <span>Log Out</span>
        <span>
          <LogOut className="w-5 h-5" />
        </span>
      </a>
    </div>
  );
};
