import Topbar from "@/components/elements/Topbar";

export default function Home() {
  return (
      <>
        <main className="flex">
          <Topbar />
          <h1 className="text-red-600 bg-red-500">Hello, wilder !</h1>
        </main>
      </>
  );
}
