"use client";

import { type JSX, type SVGProps, useState } from "react";
import { Label } from "@radix-ui/react-label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@radix-ui/react-select";
import type { NextPage } from "next";
import { Avatar, AvatarFallback, AvatarImage } from "~~/components/ui/avatar";
import { Button } from "~~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~~/components/ui/card";
import { Input } from "~~/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~~/components/ui/table";
import { Textarea } from "~~/components/ui/textarea";
import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

const Signatories: NextPage = () => {
  return (
    <div className="w-full  mx-auto   md:px-12">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            DAO Signatories Submission and Approval
          </h1>
          <p className="text-muted-foreground mt-2 max-w-[700px]">
            Submit new Signatoriess or approve on active Signatories's to help shape the direction of the DAO.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-[1fr_2fr]">
          <Card>
            <CardHeader>
              <CardTitle>New Transaction</CardTitle>
              <CardDescription>Propose a new transaction for the DAO to review.</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="mt-4 grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="recipient">Recipient Address</Label>
                  <Input id="recipient" type="text" placeholder="0x1234567890abcdef" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="amount">Amount</Label>
                  <Input id="amount" type="number" placeholder="1000.00" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Describe the transaction" />
                </div>
                <Button type="submit">Propose Transaction</Button>
              </form>
            </CardContent>
          </Card>
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Pending Transactions</CardTitle>
                <CardDescription>Review and approve or reject pending transactions.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">0x1234567890abcdef</p>
                          <p className="text-xs text-muted-foreground">Recipient Address</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">$1,000.00</p>
                          <p className="text-xs text-muted-foreground">Amount</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">2 / 5</p>
                          <p className="text-xs text-muted-foreground">Approvals</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">Transfer funds to marketing budget</p>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Approve
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-500">
                            Reject
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">0x9876543210fedcba</p>
                          <p className="text-xs text-muted-foreground">Recipient Address</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">$5,000.00</p>
                          <p className="text-xs text-muted-foreground">Amount</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">4 / 5</p>
                          <p className="text-xs text-muted-foreground">Approvals</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">Purchase new server hardware</p>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Approve
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-500">
                            Reject
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Signatories Approval Threshold</CardTitle>
                <CardDescription>
                  A Signatories must reach {process.env.APPROVAL_THRESHOLD} votes to be approved.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <UserIcon className="h-5 w-5" />
                    <span className="text-lg font-semibold">{process.env.SIGNATORIES}</span>
                  </div>
                  <p className="text-muted-foreground text-sm">Signatories</p>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-2">
                    <LockIcon className="h-5 w-5" />
                    <span className="text-lg font-semibold">{process.env.MIN_SIGNATURES}</span>
                  </div>
                  <p className="text-muted-foreground text-sm">Minimum Signatures</p>
                </div>
                <div className="flex justify-between mt-4">
                  <Button variant="secondary" size="sm">
                    Remove Signatory
                  </Button>
                  <Button variant="secondary" size="sm">
                    Add Signatory
                  </Button>
                  <Button variant="secondary" size="sm">
                    Change Minimum Signatures
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signatories;

function LockIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function UserIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
