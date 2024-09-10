import type { NextPage } from "next";
import HeaderBreadcrumb from "~~/components/Breadcramb";
import { Badge } from "~~/components/ui/badge";
import { Button } from "~~/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~~/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~~/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~~/components/ui/table";

const Dashboard: NextPage = () => {
  return (
    <>
      <HeaderBreadcrumb name="Dashboard" href="/dashboard" />
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <div className="grid grid-cols-3 auto-rows-max items-start gap-4 md:gap-8 ">
          <div className="grid col-span-2 gap-4 md:gap-8">
            <Card x-chunk="dashboard-05-chunk-0">
              <CardHeader className="pb-3">
                <CardTitle>Acme DAO</CardTitle>
                <CardDescription className="max-w-lg text-balance leading-relaxed">
                  Overview of the Acme DAO, including member details, treasury information, and active proposals.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                  <div className="rounded-lg bg-background p-4 shadow">
                    <div className="text-sm text-muted-foreground">Total Members</div>
                    <div className="text-2xl font-bold">1,234</div>
                  </div>
                  <div className="rounded-lg bg-background p-4 shadow">
                    <div className="text-sm text-muted-foreground">Total Voting Power</div>
                    <div className="text-2xl font-bold">5,678,901</div>
                  </div>
                  <div className="rounded-lg bg-background p-4 shadow">
                    <div className="text-sm text-muted-foreground">Total Funds</div>
                    <div className="text-2xl font-bold">$12,345,678</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card x-chunk="dashboard-07-chunk-1">
              <CardHeader className="px-7">
                <CardTitle>Members</CardTitle>
                <CardDescription>View and manage DAO members.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Member</TableHead>
                      <TableHead className="hidden sm:table-cell">Balance</TableHead>
                      <TableHead className="hidden sm:table-cell">Voting Power</TableHead>
                      <TableHead className="hidden md:table-cell">Last Activity</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <img
                            src="/placeholder.svg"
                            width={32}
                            height={32}
                            alt="Avatar"
                            className="rounded-full"
                            style={{ aspectRatio: "32/32", objectFit: "cover" }}
                          />
                          <div className="font-medium">John Doe</div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <div className="text-muted-foreground">0.5 ETH</div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <div className="text-muted-foreground">5%</div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="text-muted-foreground">2 days ago</div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button aria-haspopup="true" size="icon" variant="ghost">
                              <MoveHorizontalIcon className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Manage Treasury</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <img
                            src="/placeholder.svg"
                            width={32}
                            height={32}
                            alt="Avatar"
                            className="rounded-full"
                            style={{ aspectRatio: "32/32", objectFit: "cover" }}
                          />
                          <div className="font-medium">Jane Smith</div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <div className="text-muted-foreground">1 ETH</div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <div className="text-muted-foreground">10%</div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="text-muted-foreground">1 week ago</div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button aria-haspopup="true" size="icon" variant="ghost">
                              <MoveHorizontalIcon className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" />
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:gap-8">
            <Card x-chunk="dashboard-07-chunk-0">
              <CardHeader className="px-7">
                <CardTitle>DAO Overview</CardTitle>
                <CardDescription>Quick stats for your active DAO.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  <div className="flex flex-col items-center gap-2 rounded-lg bg-muted/50 p-4">
                    <div className="text-4xl font-bold">12</div>
                    <div className="text-sm text-muted-foreground">Total DAOs</div>
                  </div>
                  <div className="flex flex-col items-center gap-2 rounded-lg bg-muted/50 p-4">
                    <div className="text-4xl font-bold">8</div>
                    <div className="text-sm text-muted-foreground">Pending Proposals</div>
                  </div>
                  <div className="flex flex-col items-center gap-2 rounded-lg bg-muted/50 p-4">
                    <div className="text-4xl font-bold">3</div>
                    <div className="text-sm text-muted-foreground">Loan Requests</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card x-chunk="dashboard-07-chunk-1">
              <CardHeader className="pb-2">
                <CardTitle>Pending Proposals</CardTitle>
                <CardDescription>View and vote on active proposals.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">Increase Treasury Funds</div>
                    <Badge variant="secondary" className="text-xs">
                      Voting
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">Add New Member</div>
                    <Badge variant="secondary" className="text-xs">
                      Voting
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">Modify Voting Rules</div>
                    <Badge variant="secondary" className="text-xs">
                      Voting
                    </Badge>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>View All Proposals</Button>
              </CardFooter>
            </Card>
            <Card x-chunk="dashboard-07-chunk-2">
              <CardHeader className="pb-2">
                <CardTitle>Loan Requests</CardTitle>
                <CardDescription>Review and approve loan requests.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">Funding for New Project</div>
                    <Badge variant="outline" className="text-xs">
                      Pending
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">Operational Expenses</div>
                    <Badge variant="outline" className="text-xs">
                      Approved
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">Marketing Campaign</div>
                    <Badge variant="outline" className="text-xs">
                      Pending
                    </Badge>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>View All Loan Requests</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </>
  );
};

export default Dashboard;

function ClipboardListIcon(props) {
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
      <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <path d="M12 11h4" />
      <path d="M12 16h4" />
      <path d="M8 11h.01" />
      <path d="M8 16h.01" />
    </svg>
  );
}

function DollarSignIcon(props) {
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
      <line x1="12" x2="12" y1="2" y2="22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}

function HomeIcon(props) {
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
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function KeyIcon(props) {
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
      <path d="m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4" />
      <path d="m21 2-9.6 9.6" />
      <circle cx="7.5" cy="15.5" r="5.5" />
    </svg>
  );
}

function MenuIcon(props) {
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
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function MoveHorizontalIcon(props) {
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
      <polyline points="18 8 22 12 18 16" />
      <polyline points="6 8 2 12 6 16" />
      <line x1="2" x2="22" y1="12" y2="12" />
    </svg>
  );
}

function SettingsIcon(props) {
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
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function UsersIcon(props) {
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
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function ViewIcon(props) {
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
      <path d="M5 12s2.545-5 7-5c4.454 0 7 5 7 5s-2.546 5-7 5c-4.455 0-7-5-7-5z" />
      <path d="M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
      <path d="M21 17v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2" />
      <path d="M21 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2" />
    </svg>
  );
}
