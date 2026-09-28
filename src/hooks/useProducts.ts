import { useQuery } from "@tanstack/react-query";
import api from "../utils/axios";
import type { Product } from "../store/Store";

export const useProducts = (category: string) =>
  useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await api.get<Product[]>("/products");
      return res.data;
    },
    select: (products) => products.filter((p) => p.category === category),
    staleTime: 60_000,
  });