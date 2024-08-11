import React, { useEffect, useTransition } from "react";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RootState } from "@/redux/store";
import { useAppSelector } from "@/hooks";
import { closePopup } from "@/service/modal.service";
import { CategoryForm } from "@/components/forms";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { categorySchema } from "@/validations";
import { createCategory, updateCategory } from "@/service/category.service";
import toast from "react-hot-toast";

interface IModalProps {
  trans: any;
}

const CreateUpdateCategoryModal: React.FC<IModalProps> = ({ trans }) => {
  const { isOpen, modalName, modalTitle, action, data } = useAppSelector(
    (state: RootState) => state.modal
  );
  const [isPending, startTransition] = useTransition();
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    setValue,
    control,
  } = useForm({
    mode: "all",
    resolver: zodResolver(categorySchema),
    defaultValues: {
      industry_id: "",
      category_type: "",
      category_name: "",
      category_description: "",
      meta_title: "",
      meta_keywords: "",
      meta_description: "",
    },
  });

  useEffect(() => {
    if (data) {
      setValue("industry_id", data?.industry?.uuid || "");
      setValue("category_type", data?.category_type || "");
      setValue("category_name", data?.category_name || "");
      setValue("category_description", data?.category_description || "");
      setValue("meta_title", data?.meta_title || "");
      setValue("meta_keywords", data?.meta_keywords || "");
      setValue("meta_description", data?.meta_description || "");
    }
  }, [data]);

  const onSubmit = async (payload: any) => {
    startTransition(async () => {
      try {
        let response: any;

        if (action === "add") {
          response = await createCategory(payload);
        } else {
          response = await updateCategory(data?.uuid, payload);
        }

        if (response?.status === true && response?.statusCode === 200) {
          reset();
          toast.success(response?.message);
          await closePopup();
        } else {
          toast.error(response?.message || trans("An error occurred"));
        }
      } catch (error: any) {
        toast.error(error?.message || trans("An error occurred"));
      }
    });
  };

  //Function to close the model
  const handleModalClose = async () => {
    reset();
    await closePopup();
  };

  return (
    <Dialog open={modalName === "category" && isOpen}>
      <DialogContent size="2xl" handleModalClose={handleModalClose}>
        <DialogHeader className="p-0 mb-4">
          <DialogTitle className="font-medium pb-2 text-default-700 relative after:absolute after:h-0.5 after:rounded-md after:w-11 after:bg-primary after:left-0 after:bottom-0">
            {modalTitle}
          </DialogTitle>
        </DialogHeader>
        <div>
          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <div className="h-[450px]">
              <CategoryForm
                trans={trans}
                isPending={isPending}
                register={register}
                control={control}
                errors={errors}
              />
            </div>
            <div className=" flex justify-end gap-3 mt-6">
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleModalClose}
                >
                  {trans('Cancel')}
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isPending}>
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isPending ? trans("Loading") + '...' : action === 'add' ? trans('Save') : trans('Update')}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateUpdateCategoryModal;
