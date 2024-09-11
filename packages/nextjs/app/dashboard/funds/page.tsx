"use client";

import { Avatar, AvatarFallback, AvatarImage } from "~~/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~~/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~~/components/ui/table";
import { useDeployedContractInfo, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

import { Button } from "~~/components/ui/button";
import { Input } from "~~/components/ui/input";
import { Label } from "@radix-ui/react-label";
import type { NextPage } from "next";
import { gql } from "@apollo/client";
import { useDao } from "~~/context/daoContext";
import { useQuery } from "@apollo/client";
import { useState } from "react";

const GET_FUNDSLIST = gql`
  query MyQuery {
    fundsDepositeds(first: 20, orderBy: id, orderDirection: desc) {
      id
      member
      amount
      blockTimestamp
      transactionHash
    }
  }
`;

const DepositFunds: NextPage = () => {
  const { selectedDAO } = useDao(); // Access the selected DAO
  const [amount, setAmount] = useState<bigint>(BigInt(0));
  const { loading, error, data: fundData } = useQuery(GET_FUNDSLIST);

  const { writeContractAsync: writeMultiDAOTreasuryAsync, isPending } = useScaffoldWriteContract("MultiDAOTreasury");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Convert the input value to bigint
    const amountBigInt = BigInt(value || "0");
    setAmount(amountBigInt);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDAO?.daoId) {
      console.error("daoId is undefined");
      return;
    }

    const daoId = BigInt(selectedDAO.daoId);

    try {
      await writeMultiDAOTreasuryAsync({
        functionName: "depositFunds",
        args: [daoId, amount],
      });
    } catch (e) {
      console.error("Error creating DAO:", e);
    }
  };

  return (
    <div className="flex-1 py-12 px-6 md:px-12 lg:px-24">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">DAO Treasury Deposit</h1>
          <p className="text-muted-foreground mt-2">Contribute to the DAO treasury by depositing funds below.</p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Make a Deposit</CardTitle>
            <CardDescription>Use our supported stablecoin to add funds to the DAO treasury.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="grid gap-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="amount">Deposit Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  value={amount.toString()}
                  onChange={handleChange}
                  placeholder="Enter amount"
                  min="0"
                />
                <p className="text-sm text-muted-foreground">
                  Deposits must be made in our supported stablecoin, USDC. The minimum deposit is $100.
                </p>
              </div>
              <Button type="submit">Deposit Funds</Button>
            </form>
          </CardContent>
        </Card>
        <div>
          <h2 className="text-2xl font-bold">Transaction History</h2>
          <p className="text-muted-foreground mt-2">View past deposits made to the DAO treasury.</p>
          <Table className="mt-4">
            <TableHeader>
              <TableRow>
                <TableHead>Id</TableHead>
                <TableHead>Transaction Hash</TableHead>
                <TableHead>Member</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fundData?.fundsDepositeds.map((fund: any, index: number) => (
                <TableRow key={index}>
                  <TableCell>${fund.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar>
                        <AvatarImage src="/placeholder-user.jpg" alt={fund.member} />
                        <AvatarFallback>{fund.member.slice(2, 4).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{fund.member}</p>
                        <p className="text-muted-foreground text-sm">
                          {`${fund.member.slice(0, 6)}...${fund.member.slice(-4)}`}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  {/* Assuming the amount is in Wei */}
                  {/* <TableCell>${(fund.amount / 1e18).toLocaleString()}</TableCell> */}
                  <TableCell>${fund.amount.toLocaleString()}</TableCell>

                  <TableCell>{new Date(fund.blockTimestamp * 1000).toLocaleDateString()}</TableCell>

                  <TableCell>{fund.transactionHash}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default DepositFunds;
