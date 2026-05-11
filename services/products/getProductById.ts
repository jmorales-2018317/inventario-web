import { Product } from "@/types";
import { httpInventoryClient } from "../client";
import type { CoreResponse } from "../client/types";
import { getApiErrorMessage } from "@/util";

interface GetProductByIdArgs {
  id: string;
}

type GetProductById = (
  args: GetProductByIdArgs,
) => Promise<Product | null>;

const getProductById: GetProductById = async ({ id }) => {
  try {
    const { data: res } = await httpInventoryClient.get<
      CoreResponse<Product>
    >(`/products/${id}`);

    if (!res?.success) {
      const errorMessage = getApiErrorMessage(res.error);
      console.error("[getProductById]", errorMessage, res.error);
      return null;
    }

    return res.data;
  } catch (error) {
    console.error("[getProductById]", error);
    return null;
  }
};

export {
  getProductById,
  type GetProductById,
  type GetProductByIdArgs,
};
