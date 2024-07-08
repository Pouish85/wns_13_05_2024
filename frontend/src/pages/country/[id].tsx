import Topbar from "@/components/elements/Topbar";
import { useRouter } from "next/router";
import { useCountryQuery } from "@/graphql/generated/schema";

export default function Country() {
    const router = useRouter();
    const { id } = router.query;
    const { data, loading, error } = useCountryQuery({
        variables: { code: id as string },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    const country = data?.country;
    return (
        <>
        <Topbar />
        <div className="w-full h-[100vh] flex space-y-6 flex-col bg-gray-300 p-4 rounded-lg">
            <p className=" w-full text-center text-8xl">{country?.emoji}</p>
            <h1 className="text-2xl font-bold w-full text-center">Name: {country?.name} ({country?.code})</h1>
            <p className=" w-full text-center">continent: {country?.continent?.name}</p>
        </div>
        </>
    );
}
