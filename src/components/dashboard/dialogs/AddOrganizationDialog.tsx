import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Plus } from "lucide-react";
import { useAdminStore } from "@/lib/stores/adminStore";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  name: z.string().min(2, "Organization name must be at least 2 characters"),
  allowMemberInvites: z.boolean(),
  requireAdminApproval: z.boolean(),
  maxMembers: z.number().min(1, "Must allow at least 1 member"),
});

export function AddOrganizationDialog() {
  const [open, setOpen] = React.useState(false);
  const { addOrganization } = useAdminStore();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      allowMemberInvites: true,
      requireAdminApproval: true,
      maxMembers: 100,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const newOrg = {
      id: Math.random().toString(36).substr(2, 9),
      name: values.name,
      adminCount: 0,
      memberCount: 0,
      status: "active" as const,
      createdAt: new Date().toISOString().split("T")[0],
      settings: {
        allowMemberInvites: values.allowMemberInvites,
        requireAdminApproval: values.requireAdminApproval,
        maxMembers: values.maxMembers,
        features: {
          events: true,
          forums: true,
          resources: true,
        },
      },
    };

    addOrganization(newOrg);
    toast({
      title: "Organization Created",
      description: `${values.name} has been successfully created.`,
    });
    setOpen(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Organization
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Organization</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Organization Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter organization name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="maxMembers"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Maximum Members</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter maximum members"
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="allowMemberInvites"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel>Allow Member Invites</FormLabel>
                    <div className="text-sm text-muted-foreground">
                      Members can invite others to join
                    </div>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="requireAdminApproval"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel>Require Admin Approval</FormLabel>
                    <div className="text-sm text-muted-foreground">
                      New members need admin approval
                    </div>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Create Organization</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
