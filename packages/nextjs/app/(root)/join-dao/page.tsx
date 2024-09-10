import Image from "next/image";
import type { NextPage } from "next";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "~~/components/ui/accordion";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~~/components/ui/alert-dialog";
import { Button } from "~~/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~~/components/ui/card";
import { Input } from "~~/components/ui/input";
import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "Join Dao",
  description: "Debug your deployed 🏗 Scaffold-ETH 2 contracts in an easy way",
});

const JoinDao: NextPage = () => {
  return (
    <div className="w-full max-w-6xl mx-auto py-12 md:py-12">
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">Join a DAO</h1>
          <p className="max-w-[600px] text-muted-foreground md:text-xl">
            Find and request membership to the decentralized autonomous organization (DAO) of your choice.
          </p>
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Input type="search" placeholder="Search for a DAO by name or ID" className="flex-1" />
            <Button variant="outline">Search</Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <Card>
              <CardHeader>
                <CardTitle>Acme DAO</CardTitle>
                <CardDescription>ID: 123456</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Acme DAO is a decentralized autonomous organization focused on sustainable manufacturing.</p>
              </CardContent>
              <CardFooter>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" className="w-full">
                      Request Membership
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Join Acme DAO</AlertDialogTitle>
                      <AlertDialogDescription>
                        By requesting membership, you agree to the DAO's constitution and will be expected to
                        participate in governance decisions. Once your request is approved, you will be able to vote on
                        proposals and contribute to the DAO's mission.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction>Request Membership</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardFooter>
            </Card>
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>

          <Accordion type="single" collapsible>
            <AccordionItem value="what-is-a-dao">
              <AccordionTrigger className="text-base">What is a DAO?</AccordionTrigger>
              <AccordionContent>
                <p>
                  A DAO (Decentralized Autonomous Organization) is a blockchain-based collective that is governed by its
                  members through a set of rules encoded in smart contracts. DAOs operate without a central authority
                  and allow members to participate in decision-making and the execution of the organization's mission.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="how-to-join">
              <AccordionTrigger className="text-base">How do I join a DAO?</AccordionTrigger>
              <AccordionContent>
                <p>
                  To join a DAO, you typically need to request membership by submitting an application or proposal. The
                  DAO's existing members will then review your request and decide whether to approve it based on the
                  DAO's constitution and governance rules. Once approved, you'll be able to participate in the DAO's
                  decision-making and activities.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="benefits-of-membership">
              <AccordionTrigger className="text-base">What are the benefits of DAO membership?</AccordionTrigger>
              <AccordionContent>
                <p>
                  As a DAO member, you'll have the opportunity to contribute to the organization's mission and
                  participate in its governance. This includes voting on proposals, submitting your own proposals, and
                  earning rewards or tokens for your contributions. DAO membership also allows you to be part of a
                  decentralized community working towards a common goal.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="responsibilities-of-membership">
              <AccordionTrigger className="text-base">
                What are the responsibilities of DAO membership?
              </AccordionTrigger>
              <AccordionContent>
                <p>
                  As a DAO member, you'll be expected to actively participate in the organization's governance and
                  decision-making processes. This may include regularly attending meetings, reviewing and voting on
                  proposals, and contributing to the DAO's activities and initiatives. You'll also need to familiarize
                  yourself with the DAO's constitution and abide by its rules and guidelines.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default JoinDao;
