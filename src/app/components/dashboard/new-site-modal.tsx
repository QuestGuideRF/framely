"использовать клиент";
import type React from "react";
import { useState } from "react";
import { Button } from "@/компоненты/ui/кнопка";
import { Input } from "@/компоненты/ui/вход";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/компоненты/ui/диалог";
import { Separator } from "@/компоненты/ui/разделитель";
import { createSite } from "@/lib/действия/страница";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createSiteSchema } from "@/lib/валидации/страница";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/компоненты/ui/форма";
import * as z from "zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
type FormData = z.infer<typeof createSiteSchema>;
export default function NewPageModal() {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const form = useForm<FormData>({
    resolver: zodResolver(createSiteSchema),
    defaultValues: {
      title: "",
      subdomain: "",
    },
  });
  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const res = await createSite(data);
      if (res.success === false) {
        toast.error("Error", { description: res.msg });
      } else if (res.site) {
        toast.success("Success", {
          description: data.title + " был создан.",
        });
        setOpen(false);
        router.refresh();
      }
    } catch (error) {
      toast.error("Error", {
        description:
          error instanceof Error ? error.message : "Что-то пошло не так",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>New Site</Button>
      </DialogTrigger>
      <DialogContent className="см:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Site</DialogTitle>
          <DialogDescription>
            Enter the details for your new site.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subdomain"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subdomain</FormLabel>
                  <FormControl>
                    <div className="гибкий фокус внутри: кольцо-1 фокус внутри: кольцо-кольцо фокус внутри: кольцо-смещение-2 округленный-md ">
                      <Input
                        {...field}
                        className="округленный-r-нет фокус-видимый: кольцо-0 фокус-видимый: кольцо-смещение-0"
                      />
                      <div className="inline-flex items-center px-3 text-sm border border-l-0 rounded-r-md border-input bg-muted text-muted-foreground">
                        .framely.site
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Separator className="my-4" />
            <div className="гибкий выравнивание-конец">
              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting}
                data-umami-event="create-site"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 анимация-спин" />
                  </>
                ) : (
                  "Создать сайт"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}