import { client } from "@/sanity/lib/client"

export const fetchOrder = async (transactionId: string) => {
    try {
        const query = `*[_type == "order" && transactionId == '${transactionId}'][0]`
        const order = await client.fetch(query);
        return order;
    } catch (error) {
        
    }
}