import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { fetchCountryForDropdown } from "@/service/country.service";
import { fetchStateDropdown } from "@/service/state.service";
import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import toast from "react-hot-toast";

interface IFormProps {
  trans: any;
  isPending: boolean;
  register?: any;
  control:any;
  watch:any;
  errors?: any;
}

const StateForm: React.FC<IFormProps> = ({
  trans,
  isPending,
  register,
  control,
  watch,
  errors,
}) => {  
 const [options,setOptions] = useState([]);
 const [stateOptions,setStateOptions] = useState([]);
 
  useEffect(() => {
    handleFetchCountryForDropDown();
  }, []);

  // Function to fetch country for dropdown
  const handleFetchCountryForDropDown = async () => {
    try {
      const response = await fetchCountryForDropdown();
      setOptions(response.data);
      if (response?.status !== true && response?.statusCode !== 200) {
        toast.error(response?.message);
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  useEffect(()=>{
           if(watch("country_uuid")){
                handleFetchStateForDropDown(watch("country_uuid"))
           }
  },[watch("country_uuid")])

  // Function to fetch country for dropdown
  const handleFetchStateForDropDown = async (country_uuid:string) => {
    try {
      const response = await fetchStateDropdown({uuid:country_uuid});
      setOptions(response.data);
      if (response?.status !== true && response?.statusCode !== 200) {
        toast.error(response?.message);
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  return (
    <ScrollArea className="h-full">
    <div className="space-y-5 mb-2">
      <div className="flex flex-col gap-2">
        <Label>Country</Label>
        <Controller
          control={control}
          name="country_uuid"
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <Select onValueChange={onChange} value={value}>
              <SelectTrigger>
                <SelectValue
                  placeholder="Select State"
                  className="whitespace-nowrap"
                />
              </SelectTrigger>
              <SelectContent>
                {options?.map((country: any) => {
                  return (
                    <SelectItem
                      value={country?.uuid}
                      key={country?.country_uuid}
                    >
                      {country?.country_name}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          )}
        />
        {errors.country_uuid && (
          <div className=" text-destructive">
            {errors.country_uuid.message}
          </div>
        )}
      </div>
     
      <div className="flex flex-col gap-2">
        <Label>State</Label>
        <Controller
          control={control}
          name="state_uuid"
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <Select onValueChange={onChange} value={value}>
              <SelectTrigger>
                <SelectValue
                  placeholder="Select State"
                  className="whitespace-nowrap"
                />
              </SelectTrigger>
              <SelectContent>
                {stateOptions?.map((country: any) => {
                  return (
                    <SelectItem
                      value={country?.uuid}
                      key={country?.uuid}
                    >
                      {country?.state_name}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          )}
        />
        {errors.state_uuid && (
          <div className=" text-destructive">
            {errors.state_uuid.message}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label>City Name</Label>
        <Input
          disabled={isPending}
          type="text"
          size="lg"
          placeholder="Enter city name"
          {...register("city_name")}
        />
        {errors.city_name && (
          <div className=" text-destructive">
            {errors.city_name.message}
          </div>
        )}
      </div>
    </div>
  </ScrollArea>
  );
};

export default StateForm;
