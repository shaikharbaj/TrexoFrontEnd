import { z } from "zod";

const ratingRegex = /^[+-]?(\d+(\.\d*)?|\.\d+)$/;
const testimonialSchema = z.object({
    customer_name: z
        .string()
        .min(1, { message: "Please enter customer name" })
        .regex(/^[A-Za-z\s]+$/, {
            message: "Name must contain only alphabetic characters",
        }),
    designation: z
        .string()
        .min(1, { message: "Please enter designation" }),
    rating: z
        .string()
        .min(1, { message: "Please enter rating" })
        .regex(ratingRegex, "Rating must be valid number")
        .transform(value => parseFloat(value))
        .refine(value => value >= 0 && value <= 5, {
            message: "Rating must be between 0 and 5"
        }),
    review: z
        .string()
        .min(1, { message: "Please enter review" }),
    source_name: z
        .string()
        .min(1, { message: "Please enter source name" }),
    company_name: z
        .string()
        .min(1, { message: "Please enter company name" }),
    location_city: z
        .string()
        .min(1, { message: "Please enter location city" }),
    title: z
        .string()
        .min(1, { message: "Please enter title" }),
});

export default testimonialSchema;
