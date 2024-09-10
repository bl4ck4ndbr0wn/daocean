"use client";

import Image from "next/image";
import Link from "next/link";
import type { NextPage } from "next";
import { Button } from "~~/components/ui/button";
import { Input } from "~~/components/ui/input";

const Home: NextPage = () => {
  return (
    <>
      <div className="flex flex-col min-h-[100dvh]">
        <main className="flex-1">
          <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
              <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
                <div className="flex flex-col justify-center space-y-4">
                  <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                      Empower Your DAO with MultiDAOTreasury
                    </h1>
                    <p className="max-w-[600px] text-muted-foreground md:text-xl">
                      MultiDAOTreasury is a decentralized platform that enables DAOs to collectively manage their funds,
                      making decentralized governance a reality.
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 min-[400px]:flex-row">
                    <Link
                      href="/create-dao"
                      className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                      prefetch={false}
                    >
                      Create a DAO
                    </Link>
                    <Link
                      href="/join-dao"
                      className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                      prefetch={false}
                    >
                      Join a DAO
                    </Link>
                  </div>
                </div>
                <Image
                  src="/background-image.jpeg"
                  alt="Hero"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
                  width="550"
                  height="550"
                />
              </div>
            </div>
          </section>
          <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">What is a DAO?</div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                    Decentralized Autonomous Organizations
                  </h2>
                  <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    A DAO is a decentralized, community-driven organization where members collectively manage and govern
                    the organization's funds and operations. DAOs empower individuals to participate in decision-making
                    and contribute to the collective success of the organization.
                  </p>
                </div>
              </div>
              <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
                <img
                  src="/placeholder.svg"
                  alt="DAO Illustration"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                  width="550"
                  height="310"
                />
                <div className="flex flex-col justify-center space-y-4">
                  <ul className="grid gap-6">
                    <li>
                      <div className="grid gap-1">
                        <h3 className="text-xl font-bold">Collective Governance</h3>
                        <p className="text-muted-foreground">
                          DAOs enable members to collectively manage and govern the organization\'s funds and
                          operations.
                        </p>
                      </div>
                    </li>
                    <li>
                      <div className="grid gap-1">
                        <h3 className="text-xl font-bold">Transparency</h3>
                        <p className="text-muted-foreground">
                          All transactions and decisions are recorded on the blockchain, ensuring transparency and
                          accountability.
                        </p>
                      </div>
                    </li>
                    <li>
                      <div className="grid gap-1">
                        <h3 className="text-xl font-bold">Decentralization</h3>
                        <p className="text-muted-foreground">
                          DAOs are decentralized, with no central authority controlling the organization.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
          <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Testimonials</div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">What Our Users Say</h2>
                  <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Hear from our users about how MultiDAOTreasury has transformed their DAO\'s financial management.
                  </p>
                </div>
                <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
                  <div className="flex flex-col justify-center space-y-4 bg-muted p-6 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-primary text-primary-foreground w-12 h-12 flex items-center justify-center">
                        <UserIcon className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold">John Doe</h4>
                        <p className="text-sm text-muted-foreground">DAO Founder</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground">
                      "MultiDAOTreasury has been a game-changer for our DAO.\n The platform\'s intuitive interface and
                      robust features\n have made it easy for our members to collaborate and\n manage our funds
                      effectively."
                    </p>
                  </div>
                  <div className="flex flex-col justify-center space-y-4 bg-muted p-6 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-primary text-primary-foreground w-12 h-12 flex items-center justify-center">
                        <UserIcon className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold">Jane Smith</h4>
                        <p className="text-sm text-muted-foreground">DAO Member</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground">
                      "I\'ve been a member of several DAOs, but MultiDAOTreasury\n is by far the most user-friendly and
                      effective platform\n I\'ve used. It\'s empowered our community to make\n well-informed decisions
                      about our funds."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Features</div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                    Powerful Features for DAO Management
                  </h2>
                  <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    MultiDAOTreasury offers a comprehensive set of features to help your DAO manage its funds
                    effectively and transparently.
                  </p>
                </div>
                <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
                  <div className="flex flex-col justify-center space-y-4 bg-muted p-6 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-primary text-primary-foreground w-12 h-12 flex items-center justify-center">
                        <WalletIcon className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold">Collective Funding</h4>
                        <p className="text-sm text-muted-foreground">
                          Members can contribute funds to the DAO\'s treasury and vote on how to allocate them.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center space-y-4 bg-muted p-6 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-primary text-primary-foreground w-12 h-12 flex items-center justify-center">
                        <PieChartIcon className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold">Transparent Reporting</h4>
                        <p className="text-sm text-muted-foreground">
                          View detailed reports on the DAO\'s financial activities, including all transactions and
                          expenditures.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center space-y-4 bg-muted p-6 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-primary text-primary-foreground w-12 h-12 flex items-center justify-center">
                        <VoteIcon className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold">Decentralized Voting</h4>
                        <p className="text-sm text-muted-foreground">
                          Members can propose and vote on funding decisions, ensuring a democratic process.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center space-y-4 bg-muted p-6 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-primary text-primary-foreground w-12 h-12 flex items-center justify-center">
                        <LockIcon className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold">Secure Transactions</h4>
                        <p className="text-sm text-muted-foreground">
                          All transactions are secured by blockchain technology, ensuring the integrity of the DAO\'s
                          funds.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="w-full py-12 md:py-24 lg:py-32 border-t">
            <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
              <div className="space-y-3">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Join the DAO Revolution</h2>
                <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  MultiDAOTreasury empowers your DAO to manage its funds effectively and transparently. Get started
                  today and experience the power of decentralized governance.
                </p>
              </div>
              <div className="mx-auto w-full max-w-sm space-y-2">
                <form className="flex gap-2">
                  <Input type="email" placeholder="Enter your email" className="max-w-lg flex-1" />
                  <Button type="submit">Join a DAO</Button>
                </form>
                <p className="text-xs text-muted-foreground">
                  Sign up to get started with MultiDAOTreasury.{" "}
                  <Link href="#" className="underline underline-offset-2" prefetch={false}>
                    Terms &amp; Conditions
                  </Link>
                </p>
              </div>
            </div>
          </section>
        </main>
        <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
          <p className="text-xs text-muted-foreground">&copy; 2024</p>
        </footer>
      </div>
    </>
  );
};

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

function MountainIcon(props) {
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
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}

function PieChartIcon(props) {
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
      <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
      <path d="M22 12A10 10 0 0 0 12 2v10z" />
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

function VoteIcon(props) {
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
      <path d="m9 12 2 2 4-4" />
      <path d="M5 7c0-1.1.9-2 2-2h10a2 2 0 0 1 2 2v12H5V7Z" />
      <path d="M22 19H2" />
    </svg>
  );
}

function WalletIcon(props) {
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
      <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
      <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
    </svg>
  );
}

export default Home;
