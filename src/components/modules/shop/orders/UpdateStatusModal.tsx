import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { addFlashSale } from "@/services/FlashSale";
import { toast } from "sonner";
import { Dispatch, SetStateAction } from "react";
import { changeOrderStatus } from "@/services/order";

type TModalProps = {
  selectedId: string;
  setSelectedId: Dispatch<SetStateAction<string>>;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

const UpdateStatusModal = ({
  selectedId,
  setSelectedId,
  isOpen,
  onOpenChange,
}: TModalProps) => {
  const form = useForm();

  const {
    formState: { isSubmitting },
  } = form || {};

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    try {
      const res = await changeOrderStatus(selectedId, data);
      console.log(res);
      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTitle></DialogTitle>
      <DialogContent className="sm:max-w-[425px]  text-gray-400">
        <Form {...form}>
          <form
            className="flex items-center gap-2"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormControl className=" outline-none text-gray-600">
                    <Input
                      type="text"
                      {...field}
                      value={field.value || ""}
                      className="rounded-sm w-56"
                      placeholder="Change order status"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full rounded-sm bg-[#7c3f00] hover:text-yellow-100 hover:bg-[#7c3f00]/30"
            >
              {isSubmitting ? "Adding...." : "Add"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateStatusModal;
