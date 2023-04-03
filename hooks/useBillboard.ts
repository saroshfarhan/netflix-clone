import  useSWR from "swr";
import fetcher from "@/lib/fetcher";
import { fail } from "assert";

const useBillboard = () =>{
    const {data, error, isLoading} = useSWR('/api/random', fetcher, {
        revalidateIfStale : false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    })

    return { data, error, isLoading}
} 

export default useBillboard;