import { useState } from "react";
import Home from "./Home";
import Editor from "./Editor";
import History from "./History";
import Profile from "./Profile";
import Payment from "./Payment";
import Support from "./Support";
import BottomNav from "@/components/BottomNav";

type Page = "home" | "editor" | "history" | "profile" | "payment" | "support";

const hideNavPages: Page[] = ["payment", "support"];

export default function Index() {
  const [page, setPage] = useState<Page>("home");

  const navigate = (p: string) => setPage(p as Page);

  const showNav = !hideNavPages.includes(page);

  return (
    <div className="min-h-screen max-w-lg mx-auto relative overflow-x-hidden">
      {page === "home" && <Home onNavigate={navigate} />}
      {page === "editor" && <Editor onNavigate={navigate} />}
      {page === "history" && <History onNavigate={navigate} />}
      {page === "profile" && <Profile onNavigate={navigate} />}
      {page === "payment" && <Payment onNavigate={navigate} />}
      {page === "support" && <Support onNavigate={navigate} />}
      {showNav && <BottomNav current={page} onNavigate={navigate} />}
    </div>
  );
}
