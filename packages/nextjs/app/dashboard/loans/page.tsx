"use client";

import { type JSX, type SVGProps, useState } from "react";
import { Label } from "@radix-ui/react-label";
import { Select } from "@radix-ui/react-select";
import type { NextPage } from "next";
import { Avatar, AvatarFallback, AvatarImage } from "~~/components/ui/avatar";
import { Button } from "~~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~~/components/ui/card";
import { Input } from "~~/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~~/components/ui/table";
import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

const DepositFunds: NextPage = () => {
  const [loanRequests, setLoanRequests] = useState([
    {
      id: 1,
      borrower: "John Doe",
      amount: 10000,
      votes: 50,
      threshold: 75,
      expirationTime: "2023-06-30 23:59:59",
    },
    {
      id: 2,
      borrower: "Jane Smith",
      amount: 5000,
      votes: 30,
      threshold: 60,
      expirationTime: "2023-07-15 23:59:59",
    },
    {
      id: 3,
      borrower: "Bob Johnson",
      amount: 15000,
      votes: 65,
      threshold: 80,
      expirationTime: "2023-08-01 23:59:59",
    },
  ]);
  const [userVotingPower, setUserVotingPower] = useState(100);
  const handleVote = (loanRequestId: number, vote: number) => {
    setLoanRequests(prevRequests =>
      prevRequests.map(request => {
        if (request.id === loanRequestId) {
          return {
            ...request,
            votes: vote ? request.votes + userVotingPower : request.votes - userVotingPower,
          };
        }
        return request;
      }),
    );
  };

  return (
    <main className="flex-1 py-12 px-6 md:px-12 ">
      <div className="grid gap-12 md:grid-cols-2">
        <section>
          <h2 className="text-2xl font-bold mb-2">Deposit</h2>
          <p className="text-muted-foreground mb-6">
            Deposit your funds to earn interest and support the DAO's lending activities.
          </p>
          <div className="space-y-4">
            <div className="grid grid-cols-[auto_1fr] items-center gap-4">
              <Label htmlFor="deposit-amount">Amount</Label>
              <Input id="deposit-amount" type="number" placeholder="Enter deposit amount" />
            </div>
            <Button type="submit">Deposit</Button>
          </div>
        </section>
        <section className="mt-12 bg-muted rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Summary</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Savings Balance</h3>
              <p className="text-2xl font-bold">$5,000</p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Loan Balance</h3>
              <p className="text-2xl font-bold">$2,500</p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Loan Eligibility</h3>
              <p className="text-2xl font-bold">50%</p>
            </div>
          </div>
        </section>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold">Transaction History</h2>
        <p className="text-muted-foreground mt-2">View past deposits made to the DAO treasury.</p>
        <Table className="w-full mt-4">
          <TableHeader>
            <TableRow>
              <TableHead>Borrower</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Votes</TableHead>
              <TableHead>Threshold</TableHead>
              <TableHead>Expiration</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loanRequests.map(request => (
              <TableRow key={request.id} className="hover:bg-muted/50 transition-colors">
                <TableCell className="font-medium">{request.borrower}</TableCell>
                <TableCell className="text-primary font-semibold">${request.amount.toLocaleString()}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <ThumbsUpIcon className="w-5 h-5 fill-primary" />
                    <span className="text-primary font-semibold">
                      {request.votes}/{request.threshold}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">{request.threshold}</TableCell>
                <TableCell className="text-muted-foreground">{request.expirationTime}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      onClick={() => handleVote(request.id, true)}
                      size="sm"
                      className="bg-primary text-primary-foreground hover:bg-primary/80 transition-colors"
                    >
                      Vote Yes
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleVote(request.id, false)}
                      size="sm"
                      className="bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
                    >
                      Vote No
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
};

export default DepositFunds;
function ThumbsUpIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <path d="M7 10v12" />
      <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
    </svg>
  );
}
