import Topbar from "@/components/elements/Topbar";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {CountriesDocument, useAddCountryMutation, useCountriesQuery, useCountryQuery} from "@/graphql/generated/schema";
import Link from "next/link";


export default function Home() {
    const [ addCountryMutation ] = useAddCountryMutation({
        refetchQueries: [{
            query: CountriesDocument
        }]
    });


    const getAllCountries = useCountriesQuery();


    const handleSubmit =(e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()

        const formData = new FormData(e.target as HTMLFormElement);
        const formJSON: any = Object.fromEntries(formData.entries());
        addCountryMutation({variables: {data: formJSON}});

    }

    const countries = getAllCountries.data?.countries;
    const { data, loading, error } = useCountryQuery({
      variables: { code: "FR" },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    const country = data?.country;
  return (
      <>
        <main className="flex flex-col space-y-6">
            <Topbar />
            <form className="container mx-auto flex space-y-6 justify-center flex-col w-4/6 bg-gray-300 p-4 rounded-lg"
            onSubmit={handleSubmit}>
                <div className="flex space-x-6 justify-center">
                    <div className="flex flex-col space-y-2">
                        <Label htmlFor="countryName">Name</Label>
                        <Input id="name" name="name" type="text" className="bg-white"/>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <Label htmlFor="countryEmoji">Emoji</Label>
                        <Input id="emoji" name="emoji" type="text" className="bg-white"/>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <Label htmlFor="countryCode">Code</Label>
                        <Input id="code" name="code" type="text" className="bg-white"/>
                    </div>
                </div>
                <div className="flex space-x-6 justify-end">
                    <Button type="submit" className="w-1/6 bg-red-500" variant={"primary"}
                    >Add</Button>
                </div>
            </form>
            <Separator />
            <div className="flex justify-center space-x-2" >
                {countries?.map((country) => (
                <Link href={`/country/${country.code}`} key={country.id}>
                    <div key={country.id} className="flex flex-col justify-center border rounded-xl p-4">
                        <div className="flex justify-center">{country.name}</div>
                        <div className="flex justify-center">{country.emoji}</div>
                        <div className="flex justify-center">{country.code}</div>
                    </div>
                </Link>
            ))}
            </div>

        </main>
      </>
  );
}

