"use client";

import { Avatar, AvatarFallback, AvatarImage } from "~~/components/ui/avatar";
import { useDeployedContractInfo, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

import { Button } from "~~/components/ui/button";
import { Input } from "~~/components/ui/input";
import { Loader2 } from "lucide-react";
import type { NextPage } from "next";
import { useLocalStorage } from "usehooks-ts";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CreateDao: NextPage = () => {
  // State to manage input values
  const [daoName, setDaoName] = useState("");
  const [signatories, setSignatories] = useState<string[]>([""]);
  const [minApprovals, setMinApprovals] = useState<bigint>(BigInt(0));
  const [myDaoList, setMyDaoList] = useLocalStorage<string>("mydaolist", "");

  // Handle changes in DAO Name input
  const handleDaoNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDaoName(e.target.value);
  };

  // Handle changes in Signatories inputs
  const handleSignatoryChange = (index: number, value: string) => {
    const newSignatories = [...signatories];
    newSignatories[index] = value;
    setSignatories(newSignatories);
  };

  // Add a new signatory input
  const handleAddSignatory = () => {
    setSignatories([...signatories, ""]);
  };

  // Remove a signatory input
  const handleRemoveSignatory = (index: number) => {
    const newSignatories = signatories.filter((_, i) => i !== index);
    setSignatories(newSignatories);
  };

  // Handle changes in Minimum Approvals input
  const handleMinApprovalsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinApprovals(BigInt(e.target.value));
  };

  const router = useRouter(); // Initialize the Next.js router

  const { isLoading: deployedContractLoading } = useDeployedContractInfo("MultiDAOTreasury");

  const { writeContractAsync: writeMultiDAOTreasuryAsync, isPending } = useScaffoldWriteContract("MultiDAOTreasury");

  // Handle form submission
  const handleCreateDao = async () => {
    try {
      await writeMultiDAOTreasuryAsync({
        functionName: "createDAO",
        args: [daoName, signatories, minApprovals],
      });

      // Redirect to the dashboard
      router.push("/dashboard");
    } catch (e) {
      console.error("Error creating DAO:", e);
    }
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">Create a new DAO</h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            Fill out the form below to create a new decentralized autonomous organization.
          </p>
        </div>
        {deployedContractLoading ? (
          <div className="mt-14">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <label htmlFor="dao-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                DAO Name
              </label>
              <div className="mt-1">
                <Input
                  id="dao-name"
                  type="text"
                  placeholder="Enter DAO name"
                  value={daoName}
                  onChange={handleDaoNameChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:focus:border-primary dark:focus:ring-primary"
                />
              </div>
            </div>
            <div>
              <label htmlFor="signatories" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Signatories
              </label>
              <div className="mt-1 space-y-2">
                {signatories.map((signatory, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      id={`signatory-${index}`}
                      type="text"
                      placeholder="Enter Ethereum address"
                      value={signatory}
                      onChange={e => handleSignatoryChange(index, e.target.value)}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:focus:border-primary dark:focus:ring-primary"
                    />
                    <Button
                      variant="outline"
                      onClick={() => handleRemoveSignatory(index)}
                      className="text-red-500 hover:bg-red-100 dark:hover:bg-red-700 dark:text-red-400 dark:hover:text-white"
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Button variant="outline" onClick={handleAddSignatory}>
                  <PlusIcon className="h-4 w-4" />
                  Add Signatory
                </Button>
              </div>
            </div>
            <div>
              <label htmlFor="min-approvals" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Minimum Approvals
              </label>
              <div className="mt-1">
                <Input
                  id="min-approvals"
                  type="number"
                  min="1"
                  placeholder="Enter minimum approvals"
                  value={minApprovals.toString()}
                  onChange={handleMinApprovalsChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:focus:border-primary dark:focus:ring-primary"
                />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100">Summary</h2>
              <div className="mt-4 space-y-4">
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">DAO Name:</p>
                  <p className="text-gray-600 dark:text-gray-400">{daoName || "N/A"}</p>
                </div>
                <div className="grid grid-cols-[auto_1fr] items-center gap-4">
                  <span className="font-medium">Signatories:</span>
                  <div className="space-y-2">
                    {signatories.map((signatory, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src="/placeholder-user.jpg" alt={`Signatory ${index + 1}`} />
                          <AvatarFallback>{`S${index + 1}`}</AvatarFallback>
                        </Avatar>
                        <span>{signatory || "N/A"}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">Minimum Approvals:</p>
                  <p className="text-gray-600 dark:text-gray-400">{minApprovals.toString() || "N/A"}</p>
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <Button
                disabled={isPending}
                className="bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
                onClick={handleCreateDao}
              >
                {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Create DAO "}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

function PlusIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

export default CreateDao;
