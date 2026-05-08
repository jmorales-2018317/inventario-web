import { Product } from "@/types";
import { httpInventoryClient } from "../client";
import type { CoreResponse } from "../client/types";
import { getApiErrorMessage, handleApiError } from "@/util";

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
    >(`/v1/products/${id}`);

    console.log({ res });

    if (!res?.success) {
      const errorMessage = getApiErrorMessage(res.error);
      throw new Error(errorMessage);
    }

    return res.data;
  } catch (error) {
    handleApiError(error);
    return null;
  }
};

export {
  getProductById,
  type GetProductById,
  type GetProductByIdArgs,
};
