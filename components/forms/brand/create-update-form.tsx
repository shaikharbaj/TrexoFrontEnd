import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

interface IFormProps {
  isPending: boolean;
  register?: any;
  errors?: any;
}

const BrandForm: React.FC<IFormProps> = ({
  isPending,
  register,
  errors,
}) => {
  return (
    <div className=" space-y-3">
      <div className="flex flex-col gap-2">
        <Label>Brand Name</Label>
        <Input
          disabled={isPending}
          type="text"
          size="lg"
          placeholder="Enter brand name"
          {...register("brand_name")}
        />
        {errors.brand_name && (
          <div className=" text-destructive">
            {errors.brand_name.message}
          </div>
        )}
      </div>
    </div>
  );
};

export default BrandForm;
