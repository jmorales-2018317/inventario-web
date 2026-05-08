import {
  type GetProductByIdArgs,
  getProductById,
} from "@/services/products/getProductById";
import { type UseQueryOptions, useQuery } from "@tanstack/react-query";

type Data = Awaited<ReturnType<typeof getProductById>>;
type Options = UseQueryOptions<Data, unknown, Data, [string, GetProductByIdArgs]>;

const useGetProductById = (args: GetProductByIdArgs, options?: Options) => {
  return useQuery({
    queryKey: ["products", args],
    queryFn: () => getProductById(args),
    ...options,
  });
};

export { useGetProductById };
