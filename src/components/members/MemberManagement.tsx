import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  Filter,
  MoreVertical,
  UserPlus,
  Trash2,
  Ban,
  Shield,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import InviteMemberDialog from "./InviteMemberDialog";

interface Member {
  id: string;
  name: string;
  email: string;
  role: "member" | "admin" | "super_admin";
  status: "active" | "inactive";
  joinDate: string;
  avatar: string;
}

const MemberManagement = () => {
  const { toast } = useToast();
  const [selectedMembers, setSelectedMembers] = React.useState<string[]>([]);
  const [members, setMembers] = React.useState<Member[]>([
    {
      id: "1",
      name: "Sarah Wilson",
      email: "sarah.wilson@example.com",
      role: "admin",
      status: "active",
      joinDate: "2024-01-15",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    },
    {
      id: "2",
      name: "John Chen",
      email: "john.chen@example.com",
      role: "member",
      status: "active",
      joinDate: "2024-02-01",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    },
    {
      id: "3",
      name: "Emily Brown",
      email: "emily.brown@example.com",
      role: "member",
      status: "active",
      joinDate: "2024-02-15",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
    },
  ]);

  const handleRoleChange = (memberId: string, newRole: Member["role"]) => {
    setMembers(
      members.map((member) =>
        member.id === memberId ? { ...member, role: newRole } : member,
      ),
    );
  };

  const handleStatusChange = (
    memberId: string,
    newStatus: Member["status"],
  ) => {
    setMembers(
      members.map((member) =>
        member.id === memberId ? { ...member, status: newStatus } : member,
      ),
    );
  };

  const handleBulkDelete = () => {
    setMembers(members.filter((m) => !selectedMembers.includes(m.id)));
    toast({
      title: "Members Removed",
      description: `Removed ${selectedMembers.length} member(s)`,
    });
    setSelectedMembers([]);
  };

  const handleBulkDeactivate = () => {
    setMembers(
      members.map((m) =>
        selectedMembers.includes(m.id) ? { ...m, status: "inactive" } : m,
      ),
    );
    toast({
      title: "Members Deactivated",
      description: `Deactivated ${selectedMembers.length} member(s)`,
    });
    setSelectedMembers([]);
  };

  const handleBulkMakeAdmin = () => {
    setMembers(
      members.map((m) =>
        selectedMembers.includes(m.id) ? { ...m, role: "admin" } : m,
      ),
    );
    toast({
      title: "Admins Added",
      description: `Made ${selectedMembers.length} member(s) admin`,
    });
    setSelectedMembers([]);
  };

  const handleInvite = (data: {
    emails: string[];
    role: string;
    message: string;
  }) => {
    toast({
      title: "Invitations Sent",
      description: `Sent ${data.emails.length} invitation(s) for the role of ${data.role}`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold">Member Management</h2>
          <p className="text-muted-foreground">
            Manage community members and their roles
          </p>
        </div>
        <InviteMemberDialog onInvite={handleInvite} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Members</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            {selectedMembers.length > 0 && (
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={handleBulkDelete}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Selected
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleBulkDeactivate}
                >
                  <Ban className="h-4 w-4 mr-2" />
                  Deactivate Selected
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleBulkMakeAdmin}
                >
                  <Shield className="h-4 w-4 mr-2" />
                  Make Admin
                </Button>
              </div>
            )}
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search members..." className="pl-8" />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="member">Member</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>

          <div className="rounded-md border">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="p-4">
                    <Checkbox
                      checked={selectedMembers.length === members.length}
                      onCheckedChange={(checked) => {
                        setSelectedMembers(
                          checked ? members.map((m) => m.id) : [],
                        );
                      }}
                    />
                  </th>
                  <th className="p-4 text-left font-medium">Member</th>
                  <th className="p-4 text-left font-medium">Role</th>
                  <th className="p-4 text-left font-medium">Status</th>
                  <th className="p-4 text-left font-medium">Join Date</th>
                  <th className="p-4 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {members.map((member) => (
                  <tr key={member.id} className="border-b">
                    <td className="p-4">
                      <Checkbox
                        checked={selectedMembers.includes(member.id)}
                        onCheckedChange={(checked) => {
                          setSelectedMembers(
                            checked
                              ? [...selectedMembers, member.id]
                              : selectedMembers.filter(
                                  (id) => id !== member.id,
                                ),
                          );
                        }}
                      />
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback>
                            {member.name.substring(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{member.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {member.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge
                        variant={
                          member.role === "admin" ? "default" : "secondary"
                        }
                      >
                        {member.role}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <Badge
                        variant={
                          member.status === "active" ? "success" : "destructive"
                        }
                      >
                        {member.status}
                      </Badge>
                    </td>
                    <td className="p-4 text-muted-foreground">
                      {member.joinDate}
                    </td>
                    <td className="p-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() =>
                              handleRoleChange(
                                member.id,
                                member.role === "admin" ? "member" : "admin",
                              )
                            }
                          >
                            {member.role === "admin"
                              ? "Remove Admin"
                              : "Make Admin"}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              handleStatusChange(
                                member.id,
                                member.status === "active"
                                  ? "inactive"
                                  : "active",
                              )
                            }
                          >
                            {member.status === "active"
                              ? "Deactivate"
                              : "Activate"}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MemberManagement;
