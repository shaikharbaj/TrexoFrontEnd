import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";

interface IFormProps {
  register?: any;
  errors?: any;
  reset?: any;
  onSubmit?: any;
  isPending?: any;
}

const CountryForm: React.FC<IFormProps> = ({
  isPending,
  register,
  errors,
}) => {
  return (
    <>
      <ScrollArea className="h-full">
          <div className=" space-y-3">
            <div className="flex flex-col gap-2">
              <Label>Country Name</Label>
              <Input
                disabled={isPending}
                type="text"
                size="lg"
                placeholder="Enter country name"
                {...register("country_name")}
              />
              {errors.country_name && (
                <div className=" text-destructive">
                  {errors.country_name.message}
                </div>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label>ISO Code</Label>
              <Input
                disabled={isPending}
                type="text"
                size="lg"
                placeholder="Enter iso code"
                {...register("iso_code")}
              />
              {errors.iso_code && (
                <div className=" text-destructive">
                  {errors.iso_code.message}
                </div>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label>Mobile Code</Label>
              <Input
                disabled={isPending}
                type="text"
                size="lg"
                placeholder="Enter mobile code"
                {...register("mobile_code")}
              />
              {errors.mobile_code && (
                <div className=" text-destructive">
                  {errors.mobile_code.message}
                </div>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label>Currency Code</Label>
              <Input
                disabled={isPending}
                type="text"
                size="lg"
                placeholder="Enter currency code"
                {...register("currency_code")}
              />
              {errors.currency_code && (
                <div className=" text-destructive">
                  {errors.currency_code.message}
                </div>
              )}
            </div>
          </div>
      </ScrollArea>
    </>
  );
};

export default CountryForm;
