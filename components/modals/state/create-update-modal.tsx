import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAppSelector } from "@/hooks";
import { RootState } from "@/redux/store";
import { createState, updateState } from "@/service/state.service";
import { closePopup } from "@/service/modal.service";
import { citySchema, stateSchema } from "@/validations";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { fetchCountryForDropdown } from "@/service/country.service";
import { StateForm } from "@/components/forms";

interface IModalProps {trans: any; }

const CreateUpdateStateModal: React.FC<IModalProps> = ({trans}) => {
  const { isOpen, modalName, modalTitle, action, data } = useAppSelector(
    (state: RootState) => state.modal
  );
  const [options, setOptions] = useState<any[]>([]);
  const [isPending, startTransition] = React.useTransition();
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    setValue,
    watch,
    control,
  } = useForm({
    mode: "all",
    resolver: zodResolver(citySchema),
    defaultValues: {
      country_uuid: "",
      state_uuid: "",
      city_name: "",
    },
  });

  useEffect(() => {
    if (data) {
      setValue("state_uuid", data?.state?.uuid);
      setValue("country_uuid", data?.country?.uuid);
      setValue("city_name", data?.city_name);
    }
  }, [data]);

  const onSubmit = async (payload: any) => {
    startTransition(async () => {
      try {
        let response: any;
        console.log(payload);
      } catch (error: any) {
        toast.error(error?.message || "An error occurred.");
      }
    });
  };

  //Function to close the model
  const handleModalClose = async () => {
    reset();
    await closePopup();
  };

  return (
    <Dialog open={modalName === "state" && isOpen}>
      <DialogContent size="lg" hiddenCloseIcon={true}>
        <DialogHeader className="p-0 mb-4">
          <DialogTitle className="font-medium pb-2 text-default-700 relative after:absolute after:h-0.5 after:rounded-md after:w-11 after:bg-primary after:left-0 after:bottom-0">
            {modalTitle}
          </DialogTitle>
        </DialogHeader>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="h-[300px]">

              <StateForm trans={trans}
                isPending={isPending}
                register={register}
                control={control}
                watch={watch}
                errors={errors}  />
            </div>
            <div className=" flex justify-end gap-3 mt-6">
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleModalClose}
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isPending}>
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isPending ? "Loading..." : "Save"}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateUpdateStateModal;
