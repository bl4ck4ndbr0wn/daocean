import { Label } from "@radix-ui/react-label";
import type { NextPage } from "next";
import { Avatar, AvatarFallback, AvatarImage } from "~~/components/ui/avatar";
import { Button } from "~~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~~/components/ui/card";
import { Input } from "~~/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~~/components/ui/table";
import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "Join Dao",
  description: "Debug your deployed 🏗 Scaffold-ETH 2 contracts in an easy way",
});

const DepositFunds: NextPage = () => {
  return (
    <div className="w-full max-w-4xl mx-auto py-12 md:py-16">
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
            <form className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Deposit Amount</Label>
                <Input id="amount" type="number" placeholder="Enter amount" min="0" step="0.01" />
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
                <TableHead>Member</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage src="/placeholder-user.jpg" alt="@username" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">John Doe</p>
                      <p className="text-muted-foreground text-sm">0x123...abc</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>$1,000.00</TableCell>
                <TableCell>2023-04-15</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage src="/placeholder-user.jpg" alt="@username" />
                      <AvatarFallback>JS</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">Jane Smith</p>
                      <p className="text-muted-foreground text-sm">0x456...def</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>$500.00</TableCell>
                <TableCell>2023-04-10</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage src="/placeholder-user.jpg" alt="@username" />
                      <AvatarFallback>MJ</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">Michael Johnson</p>
                      <p className="text-muted-foreground text-sm">0x789...ghi</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>$750.00</TableCell>
                <TableCell>2023-04-05</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default DepositFunds;
