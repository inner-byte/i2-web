import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Activity,
  Settings,
  Users,
  Building2,
  Shield,
  MoreVertical,
  Search,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  TrendingUp,
  BarChart3,
} from "lucide-react";
import { useAdminStore } from "@/lib/stores/adminStore";
import DashboardLayout from "../layout/DashboardLayout";
import AnalyticsDashboard from "../analytics/AnalyticsDashboard";
import { SystemSettings } from "./settings/SystemSettings";
import { AddOrganizationDialog } from "./dialogs/AddOrganizationDialog";
import { AddAdminDialog } from "./dialogs/AddAdminDialog";
import { useToast } from "@/components/ui/use-toast";

const SuperAdminDashboard = () => {
  const {
    organizations,
    admins,
    updateOrganization,
    deleteOrganization,
    updateAdmin,
    deleteAdmin,
  } = useAdminStore();
  const { toast } = useToast();
  const [searchOrg, setSearchOrg] = React.useState("");
  const [searchAdmin, setSearchAdmin] = React.useState("");

  const filteredOrganizations = organizations.filter((org) =>
    org.name.toLowerCase().includes(searchOrg.toLowerCase()),
  );

  const filteredAdmins = admins.filter(
    (admin) =>
      admin.name.toLowerCase().includes(searchAdmin.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchAdmin.toLowerCase()),
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "suspended":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle2 className="w-4 h-4 text-green-600" />;
      case "pending":
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case "suspended":
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return null;
    }
  };

  const handleOrganizationAction = (orgId: string, action: string) => {
    switch (action) {
      case "suspend":
        updateOrganization(orgId, { status: "suspended" });
        toast({
          title: "Organization Suspended",
          description: "The organization has been suspended.",
        });
        break;
      case "delete":
        deleteOrganization(orgId);
        toast({
          title: "Organization Deleted",
          description: "The organization has been permanently deleted.",
        });
        break;
    }
  };

  const handleAdminAction = (adminId: string, action: string) => {
    switch (action) {
      case "deactivate":
        updateAdmin(adminId, { status: "inactive" });
        toast({
          title: "Admin Deactivated",
          description: "The admin account has been deactivated.",
        });
        break;
      case "delete":
        deleteAdmin(adminId);
        toast({
          title: "Admin Deleted",
          description: "The admin account has been permanently deleted.",
        });
        break;
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6 p-6">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Super Admin Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage organizations and system-wide settings
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-white hover:bg-gray-50/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Organizations
              </CardTitle>
              <Building2 className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{organizations.length}</div>
              <p className="text-xs text-muted-foreground mt-1">
                +2 this month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white hover:bg-gray-50/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Admins
              </CardTitle>
              <Shield className="h-4 w-4 text-indigo-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{admins.length}</div>
              <p className="text-xs text-muted-foreground mt-1">
                +5 new admins
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white hover:bg-gray-50/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Active Users
              </CardTitle>
              <Users className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">275</div>
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3 text-green-600" />
                <span className="text-xs text-green-600">12% increase</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white hover:bg-gray-50/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                System Health
              </CardTitle>
              <Activity className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">98.2%</div>
              <div className="flex items-center gap-1 mt-1">
                <BarChart3 className="h-3 w-3 text-purple-600" />
                <span className="text-xs text-purple-600">Optimal</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="organizations" className="w-full">
          <TabsList className="w-full justify-start bg-background">
            <TabsTrigger value="organizations">Organizations</TabsTrigger>
            <TabsTrigger value="admins">Admins</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Organizations Tab */}
          <TabsContent value="organizations" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Organizations</CardTitle>
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search organizations..."
                        className="pl-8 w-[300px]"
                        value={searchOrg}
                        onChange={(e) => setSearchOrg(e.target.value)}
                      />
                    </div>
                    <AddOrganizationDialog />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Organization</TableHead>
                      <TableHead>Admins</TableHead>
                      <TableHead>Members</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOrganizations.map((org) => (
                      <TableRow key={org.id}>
                        <TableCell className="font-medium">
                          {org.name}
                        </TableCell>
                        <TableCell>{org.adminCount}</TableCell>
                        <TableCell>{org.memberCount}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(org.status)}>
                            <div className="flex items-center gap-1">
                              {getStatusIcon(org.status)}
                              {org.status}
                            </div>
                          </Badge>
                        </TableCell>
                        <TableCell>{org.createdAt}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() =>
                                  handleOrganizationAction(org.id, "view")
                                }
                              >
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  handleOrganizationAction(org.id, "edit")
                                }
                              >
                                Edit Settings
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-red-600"
                                onClick={() =>
                                  handleOrganizationAction(org.id, "suspend")
                                }
                              >
                                Suspend Organization
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Admins Tab */}
          <TabsContent value="admins" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Organization Admins</CardTitle>
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search admins..."
                        className="pl-8 w-[300px]"
                        value={searchAdmin}
                        onChange={(e) => setSearchAdmin(e.target.value)}
                      />
                    </div>
                    <AddAdminDialog />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Organization</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Active</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAdmins.map((admin) => (
                      <TableRow key={admin.id}>
                        <TableCell className="font-medium">
                          {admin.name}
                        </TableCell>
                        <TableCell>{admin.email}</TableCell>
                        <TableCell>{admin.organization}</TableCell>
                        <TableCell>{admin.role}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              admin.status === "active"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {admin.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{admin.lastActive}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() =>
                                  handleAdminAction(admin.id, "view")
                                }
                              >
                                View Profile
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  handleAdminAction(admin.id, "edit")
                                }
                              >
                                Edit Permissions
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-red-600"
                                onClick={() =>
                                  handleAdminAction(admin.id, "deactivate")
                                }
                              >
                                Deactivate Account
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <AnalyticsDashboard />
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <SystemSettings />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default SuperAdminDashboard;
