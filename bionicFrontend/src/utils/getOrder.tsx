import axios from "axios";
import { OrderItem } from "../interfaces";

const url: string = "https://xicc2u4jn5.execute-api.eu-north-1.amazonaws.com/api/orders";

const getOrder = async (): Promise<OrderItem[]> => {
  console.log("getOrder-funktionen startar");
  try {
    const response = await axios.get(url);
    console.log("Efter axios-anrop, response:", response.data);

   
    if (response.data?.data) {
      return response.data.data as OrderItem[]; // Typa om till OrderItem[]
    } else {
      throw new Error("Unexpected response structure");
    }
  } catch (error) {
    console.error("Failed to get the orders", error);
    throw error;
  }
};

export default getOrder;
