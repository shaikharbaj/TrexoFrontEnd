import { z } from "zod";

const brandSchema = z.object({
    brand_name: z.string().min(1, { message: "Please enter brand name." })
});

export default brandSchema;
