import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAdminStore } from "@/lib/stores/adminStore";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  maintenance: z.boolean(),
  registrationOpen: z.boolean(),
  defaultUserRole: z.string(),
  mfaRequired: z.boolean(),
  passwordMinLength: z.number().min(6),
  requireSpecialChars: z.boolean(),
  requireNumbers: z.boolean(),
});

export function SystemSettings() {
  const { systemSettings, updateSystemSettings } = useAdminStore();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      maintenance: systemSettings.maintenance,
      registrationOpen: systemSettings.registrationOpen,
      defaultUserRole: systemSettings.defaultUserRole,
      mfaRequired: systemSettings.securitySettings.mfaRequired,
      passwordMinLength:
        systemSettings.securitySettings.passwordPolicy.minLength,
      requireSpecialChars:
        systemSettings.securitySettings.passwordPolicy.requireSpecialChars,
      requireNumbers:
        systemSettings.securitySettings.passwordPolicy.requireNumbers,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    updateSystemSettings({
      maintenance: values.maintenance,
      registrationOpen: values.registrationOpen,
      defaultUserRole: values.defaultUserRole,
      securitySettings: {
        mfaRequired: values.mfaRequired,
        passwordPolicy: {
          minLength: values.passwordMinLength,
          requireSpecialChars: values.requireSpecialChars,
          requireNumbers: values.requireNumbers,
        },
      },
    });

    toast({
      title: "Settings Updated",
      description: "System settings have been successfully updated.",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>System Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid gap-6">
                <div className="grid gap-4">
                  <h3 className="text-lg font-medium">General Settings</h3>
                  <div className="grid gap-4">
                    <FormField
                      control={form.control}
                      name="maintenance"
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel>Maintenance Mode</FormLabel>
                            <FormDescription>
                              Disable access to the platform for maintenance
                            </FormDescription>
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
                      name="registrationOpen"
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel>Open Registration</FormLabel>
                            <FormDescription>
                              Allow new users to register
                            </FormDescription>
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
                  </div>
                </div>

                <div className="grid gap-4">
                  <h3 className="text-lg font-medium">Security Settings</h3>
                  <div className="grid gap-4">
                    <FormField
                      control={form.control}
                      name="mfaRequired"
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel>Require MFA</FormLabel>
                            <FormDescription>
                              Require multi-factor authentication for all users
                            </FormDescription>
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
                      name="passwordMinLength"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Minimum Password Length</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseInt(e.target.value))
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="requireSpecialChars"
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel>Require Special Characters</FormLabel>
                            <FormDescription>
                              Passwords must contain special characters
                            </FormDescription>
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
                      name="requireNumbers"
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel>Require Numbers</FormLabel>
                            <FormDescription>
                              Passwords must contain numbers
                            </FormDescription>
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
                  </div>
                </div>
              </div>

              <Button type="submit">Save Changes</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
