"use client";

import { type JSX, type SVGProps, useState } from "react";
import router from "next/dist/shared/lib/router/router";
import { Label } from "@radix-ui/react-label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@radix-ui/react-select";
import type { NextPage } from "next";
import { Avatar, AvatarFallback, AvatarImage } from "~~/components/ui/avatar";
import { Button } from "~~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~~/components/ui/card";
import { Input } from "~~/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~~/components/ui/table";
import { Textarea } from "~~/components/ui/textarea";
import { useDao } from "~~/context/daoContext";
import { useDeployedContractInfo, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export enum ProposalType {
  Investment = 1,
  ProjectFunding = 2,
  TreasuryDiversification = 3,
  FeeAdjustment = 4,
}

const Proposal: NextPage = () => {
  const { selectedDAO, setSelectedDAO } = useDao();
  const [proposalType, setProposalType] = useState<ProposalType>(BigInt(0));
  const [amount, setAmount] = useState<bigint>(BigInt(0));
  const [description, setDescription] = useState("");

  const { isLoading: deployedContractLoading } = useDeployedContractInfo("MultiDAOTreasury");

  const { writeContractAsync: writeMultiDAOTreasuryAsync, isPending } = useScaffoldWriteContract("MultiDAOTreasury");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await writeMultiDAOTreasuryAsync({
        functionName: "createProposal",
        args: [BigInt(selectedDAO?.daoId), proposalType, amount, amount],
      });
    } catch (e) {
      console.error("Error creating DAO:", e);
    }
  };
  return (
    <div className="w-full  mx-auto   md:px-12">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            DAO Proposal Submission and Voting
          </h1>
          <p className="text-muted-foreground mt-2 max-w-[700px]">
            Submit new proposals and vote on active proposals to help shape the direction of the DAO.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-[1fr_2fr]">
          <Card>
            <CardHeader>
              <CardTitle>Submit New Proposal</CardTitle>
              <CardDescription>Enter the details of your proposal for the DAO to consider.</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <Label htmlFor="type">Proposal Type</Label>
                  <Select
                    id="type"
                    value={proposalType}
                    onValueChange={value => setProposalType(value as ProposalType)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select proposal type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={ProposalType.Investment}>Investment</SelectItem>
                      <SelectItem value={ProposalType.ProjectFunding}>Project Funding</SelectItem>
                      <SelectItem value={ProposalType.TreasuryDiversification}>Treasury Diversification</SelectItem>
                      <SelectItem value={ProposalType.FeeAdjustment}>Fee Adjustment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="amount">Requested Amount</Label>
                  <Input
                    id="amount"
                    type="number"
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                    placeholder="Enter amount"
                    min="0"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder="Provide details about your proposal"
                    rows={4}
                  />
                </div>
                <Button type="submit" className="w-full">
                  Submit Proposal
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Active Proposals</CardTitle>
                <CardDescription>Review and vote on the latest proposals.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div className="grid grid-cols-[1fr_auto] items-center gap-4 rounded-md bg-muted p-4">
                    <div>
                      <h3 className="text-lg font-semibold">Expand DAO Membership</h3>
                      <p className="text-muted-foreground text-sm">
                        Increase the DAO's membership to expand our reach and influence.
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className="flex items-center gap-2">
                        <ClockIcon className="h-4 w-4" />
                        <span className="text-sm">Expires in 3 days</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ThumbsUpIcon className="h-4 w-4" />
                        <span className="text-sm">75 votes</span>
                      </div>
                      <Button variant="default" size="sm">
                        Vote
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-[1fr_auto] items-center gap-4 rounded-md bg-muted p-4">
                    <div>
                      <h3 className="text-lg font-semibold">Invest in Renewable Energy</h3>
                      <p className="text-muted-foreground text-sm">
                        Allocate funds to support the development of renewable energy projects.
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className="flex items-center gap-2">
                        <ClockIcon className="h-4 w-4" />
                        <span className="text-sm">Expires in 7 days</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ThumbsUpIcon className="h-4 w-4" />
                        <span className="text-sm">120 votes</span>
                      </div>
                      <Button variant="default" size="sm">
                        Vote
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-[1fr_auto] items-center gap-4 rounded-md bg-muted p-4">
                    <div>
                      <h3 className="text-lg font-semibold">Improve DAO Governance</h3>
                      <p className="text-muted-foreground text-sm">
                        Propose changes to the DAO's governance structure to increase transparency and efficiency.
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className="flex items-center gap-2">
                        <ClockIcon className="h-4 w-4" />
                        <span className="text-sm">Expires in 14 days</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ThumbsUpIcon className="h-4 w-4" />
                        <span className="text-sm">90 votes</span>
                      </div>
                      <Button variant="default" size="sm">
                        Vote
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Proposal Approval Threshold</CardTitle>
                <CardDescription>
                  A proposal must reach {process.env.APPROVAL_THRESHOLD} votes to be approved.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ThumbsUpIcon className="h-5 w-5" />
                    <span className="text-lg font-semibold">{process.env.APPROVAL_THRESHOLD}</span>
                  </div>
                  <p className="text-muted-foreground text-sm">Votes required for approval</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Proposal;

function ClockIcon(props) {
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
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function ThumbsUpIcon(props) {
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
