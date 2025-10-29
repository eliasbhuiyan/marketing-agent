"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import apiClient from "@/lib/api";
import { useBrandData } from "@/lib/hooks/useBrandData";
import { Trash2, Plus, Users } from "lucide-react";
import Image from "next/image";

export default function SettingsPage() {
  // Invite member state
  const [inviteOpen, setInviteOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteBusy, setInviteBusy] = useState(false);
  const [inviteError, setInviteError] = useState("");
  const [inviteSuccess, setInviteSuccess] = useState("");

  // Use cached brand data hook
  const {
    brandData,
    loading: brandLoading,
    error: brandError,
    refreshBrandData,
  } = useBrandData();

  const handelInviteMember = async () => {
    try {
      setInviteBusy(true);
      setInviteError("");
      setInviteSuccess("");
      if (!inviteEmail) {
        setInviteError("Please enter an email address");
        return;
      }
      const validateEmail = (email) => {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(email);
      };
      if (!validateEmail(inviteEmail)) {
        setInviteError("Please enter a valid email address");
        return;
      }
      await apiClient.brand.inviteMember(inviteEmail);
      setInviteSuccess("Invite sent successfully");
      // optionally close after short delay
      setTimeout(() => setInviteOpen(false), 1200);
    } catch (e) {
      setInviteError(e?.message || "Failed to send invite");
    } finally {
      setInviteBusy(false);
    }
  };
  const handelRemoveMember = async (memberId) => {
    try {
      // Get the current brand ID
      if (!brandData._id) {
        console.log("No brand selected");
        return;
      }
      // Call the API to remove the team member
      await apiClient.removemember.remove(brandData._id, memberId);
      refreshBrandData()
      // Show success message
      console.log("Team member removed successfully");
    } catch (error) {
      console.error("Failed to remove team member:", error);
      console.log(error?.message || "Failed to remove team member");
    }
  };
  return (
    <div className="lg:col-span-3 space-y-6">
      <>
        <Card className="pt-4">
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Team Members</h2>
                <Button
                  variant="default"
                  size="sm"
                  className="ml-4"
                  onClick={() => setInviteOpen(true)}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Invite Member
                </Button>
                <button onClick={()=>refreshBrandData()}>Refresh</button>
              </div>
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-full overflow-hidden flex items-center justify-center">
                    <Image
                      src={brandData?.owner.avatar}
                      width={200}
                      height={200}
                      alt="profile"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-white">
                      {brandData?.owner.fullName}
                    </h3>
                    <p className="text-sm text-white/80">
                      {brandData?.owner.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                    Admin
                  </span>
                </div>
              </div>
              {brandData &&
                brandData?.teamMembers.map((member) => (
                  <div
                    key={member._id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-600 rounded-full overflow-hidden flex items-center justify-center">
                        <Image
                          src={member.user.avatar}
                          width={200}
                          height={200}
                          alt="profile"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium text-white">
                          {member.user.fullName}
                        </h3>
                        <p className="text-sm text-white/80">
                          {member.user.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-1 capitalize bg-blue-100 text-blue-700 text-xs rounded-full">
                        {member.role}
                      </span>
                      <span
                        className={`px-2 py-1 capitalize ${
                          member.status === "invited"
                            ? "bg-yellow-200"
                            : "bg-blue-100"
                        } bg-blue-100 text-blue-700 text-xs rounded-full`}
                      >
                        {member.status}
                      </span>
                      <Button
                        onClick={() => handelRemoveMember(member.user._id)}
                        size="sm"
                        variant=""
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
        {inviteOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="w-full max-w-md rounded-lg card-surface shadow-lg">
              <div className="px-6 py-4 border-b">
                <h3 className="text-lg font-semibold">Invite a team member</h3>
              </div>
              <div className="px-6 py-4 space-y-4">
                {inviteError && (
                  <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded p-2">
                    {inviteError}
                  </div>
                )}
                {inviteSuccess && (
                  <div className="text-sm text-green-700 bg-green-50 border border-green-200 rounded p-2">
                    {inviteSuccess}
                  </div>
                )}
                <div>
                  <Label htmlFor="invite-email">Member Email</Label>
                  <Input
                    id="invite-email"
                    type="email"
                    placeholder="name@example.com"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="px-6 py-4 border-t flex items-center justify-end gap-2">
                <Button
                  variant="destructive"
                  onClick={() => setInviteOpen(false)}
                  disabled={inviteBusy}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handelInviteMember}
                  disabled={inviteBusy || !inviteEmail}
                >
                  {inviteBusy ? "Inviting..." : "Send Invite"}
                </Button>
              </div>
            </div>
          </div>
        )}
      </>
    </div>
  );
}
