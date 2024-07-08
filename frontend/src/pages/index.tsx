import Topbar from "@/components/elements/Topbar";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"




export default function Home() {
  return (
      <>
        <main className="flex flex-col space-y-6">
            <Topbar />
            <form className="container mx-auto flex space-y-6 justify-center flex-col w-4/6 bg-gray-300 p-4 rounded-lg">
                <div className="flex space-x-6 justify-center">
                    <div className="flex flex-col space-y-2">
                        <Label htmlFor="countryName">Name</Label>
                        <Input id="countryName" type="text" className="bg-white"/>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <Label htmlFor="countryEmoji">Emoji</Label>
                        <Input id="countryEmoji" type="text" className="bg-white"/>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <Label htmlFor="countryCode">Code</Label>
                        <Input id="countryCode" type="text" className="bg-white"/>
                    </div>
                </div>
                <div className="flex space-x-6 justify-end">
                    <Button type="submit" className="w-1/6 bg-red-500" variant={"primary"}>Add</Button>
                </div>
            </form>
            <Separator />

        </main>
      </>
  );
}
