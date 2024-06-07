import ContentArea from "@/components/main/quicks/quicks-content";
import QuicksComponent from "@/components/main/quicks";
import QuicksBar from "@/components/main/quicks/quicks-bar";
import SearchBar from "@/components/main/search-bar";

export default function Home() {
  return (
    <main className="grid grid-cols-12 min-h-screen justify-between">
      <div className="hidden lg:inline col-span-2 border-r-2 border-primary-text bg-primary-background"></div>
      <div className="col-span-full lg:col-span-10 bg-primary-background">
        <SearchBar />
        <div className="fixed bottom-0 right-0">
          <QuicksComponent />
        </div>
      </div>
    </main>
  );
}
