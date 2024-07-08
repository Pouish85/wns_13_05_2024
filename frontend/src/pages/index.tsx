import Topbar from "@/components/elements/Topbar";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {CountriesDocument, useAddCountryMutation, useCountriesQuery, useCountryQuery, useContinentsQuery} from "@/graphql/generated/schema";
import Link from "next/link";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select"


export default function Home() {
    const [ addCountryMutation ] = useAddCountryMutation({
        refetchQueries: [{
            query: CountriesDocument
        }]
    });

    const [selectedContinent, setSelectedContinent] = useState('');
    const getAllCountries = useCountriesQuery();
    const getContinents = useContinentsQuery();

    const handleSubmit =(e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()

        // if (!selectedContinent) return alert('Please select a continent');

        const formData = new FormData(e.target as HTMLFormElement);
        const formJSON: any = Object.fromEntries(formData.entries());
        console.log(selectedContinent);
        // formJSON.continent = { id: selectedContinent};

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
                <div className="flex flex-col md:flex-row space-x-0 md:space-x-6 space-y-4 md:space-y-0 justify-center">
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
                    <div className="flex flex-col space-y-2">
                        <Label htmlFor="continentName">Continent</Label>
                        <Select>
                          <SelectTrigger className="w-[180px] bg-white">
                            <SelectValue placeholder="Select a continent" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Continent</SelectLabel>
                                {getContinents.data?.continents.map((continent) => (
                                  <SelectItem key={continent.id} value={continent.name} onChange={() => setSelectedContinent(continent.name)}>
                                    {continent.name}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="flex space-x-6 justify-end">
                    <Button type="submit" className="w-1/6 bg-red-500" variant={"primary"}
                    >Add</Button>
                </div>
            </form>
            <Separator />
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
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

