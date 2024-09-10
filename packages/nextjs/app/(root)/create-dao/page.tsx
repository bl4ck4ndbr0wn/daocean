import type { NextPage } from "next";
import { Avatar, AvatarFallback, AvatarImage } from "~~/components/ui/avatar";
import { Button } from "~~/components/ui/button";
import { Input } from "~~/components/ui/input";
import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "Create Dao",
  description: "Debug your deployed 🏗 Scaffold-ETH 2 contracts in an easy way",
});

const CreateDao: NextPage = () => {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">Create a new DAO</h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            Fill out the form below to create a new decentralized autonomous organization.
          </p>
        </div>
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
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:focus:border-primary dark:focus:ring-primary"
              />
            </div>
          </div>
          <div>
            <label htmlFor="signatories" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Signatories
            </label>
            <div className="mt-1 space-y-2">
              <div className="flex items-center gap-2">
                <Input
                  id="signatory-1"
                  type="text"
                  placeholder="Enter Ethereum address"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:focus:border-primary dark:focus:ring-primary"
                />
                <Button variant="outline">
                  <PlusIcon className="h-4 w-4" />
                  Add Signatory
                </Button>
              </div>
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
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:focus:border-primary dark:focus:ring-primary"
              />
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100">Summary</h2>
            <div className="mt-4 space-y-4">
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">DAO Name:</p>
                <p className="text-gray-600 dark:text-gray-400">Acme Decentralized Organization</p>
              </div>
              <div className="grid grid-cols-[auto_1fr] items-center gap-4">
                <span className="font-medium">Signatories:</span>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src="/placeholder-user.jpg" alt="Signatory 1" />
                      <AvatarFallback>S1</AvatarFallback>
                    </Avatar>
                    <span>0x123456789abcdef0123456789abcdef01234567</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src="/placeholder-user.jpg" alt="Signatory 2" />
                      <AvatarFallback>S2</AvatarFallback>
                    </Avatar>
                    <span>0x987654321fedcba9876543210fedcba98765432</span>
                  </div>
                </div>
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">Minimum Approvals:</p>
                <p className="text-gray-600 dark:text-gray-400">2</p>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary">
              Create DAO
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

function PlusIcon(props) {
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
