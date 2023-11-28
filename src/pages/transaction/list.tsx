import { Badge, Table, Dropdown, useTheme } from "flowbite-react";

import type { FC } from "react";
import { Datepicker } from "../../components/datepicker";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
const TransactionListPage: FC = function () {
  return (
    <NavbarSidebarLayout isFooter={false}>
      <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800 sm:p-6 xl:p-8">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
              Transactions
            </h3>
            <span className="text-base font-normal text-gray-600 dark:text-gray-400">
              This is a list of latest transactions
            </span>
          </div>
          <div className="shrink-0">
            <a
              href="#"
              className="rounded-lg p-2 text-sm font-medium text-primary-700 hover:bg-gray-100 dark:text-primary-500 dark:hover:bg-gray-700"
            >
              View all
            </a>
          </div>
        </div>
        <div className="mt-8 flex flex-col">
          <div className="overflow-x-auto rounded-lg">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden shadow sm:rounded-lg">
                <Table
                  striped
                  className="min-w-full divide-y divide-gray-200 dark:divide-gray-600"
                >
                  <Table.Head className="bg-gray-50 dark:bg-gray-700">
                    <Table.HeadCell>TransactionId</Table.HeadCell>
                    <Table.HeadCell>CourseId</Table.HeadCell>
                    <Table.HeadCell>Transaction</Table.HeadCell>
                    <Table.HeadCell>Date &amp; Time</Table.HeadCell>
                    <Table.HeadCell>Amount</Table.HeadCell>
                    <Table.HeadCell>Status</Table.HeadCell>
                  </Table.Head>
                  <Table.Body className="bg-white dark:bg-gray-800">
                    <Table.Row>
                      <Table.Cell className="whitespace-nowrap p-4 text-sm font-normal text-gray-900 dark:text-white">
                        #Transaction_id
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap p-4 text-sm font-normal text-gray-900 dark:text-white">
                        #Course_id
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap p-4 text-sm font-normal text-gray-900 dark:text-white">
                        Payment from{" "}
                        <span className="font-semibold">Bonnie Green</span>
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap p-4 text-sm font-normal text-gray-500 dark:text-gray-400">
                        Apr 23, 2021
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap p-4 text-sm font-semibold text-gray-900 dark:text-white">
                        $2300
                      </Table.Cell>
                      <Table.Cell className="flex whitespace-nowrap p-4">
                        {/* <Badge color="success">Completed</Badge> */}
                        <Badge color="failure">Cancelled</Badge>
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between pt-3 sm:pt-6">
          <Datepicker />
          <div className="shrink-0">
            <a
              href="#"
              className="inline-flex items-center rounded-lg p-2 text-xs font-medium uppercase text-primary-700 hover:bg-gray-100 dark:text-primary-500 dark:hover:bg-gray-700 sm:text-sm"
            >
              Transactions Report
              <svg
                className="ml-1 h-4 w-4 sm:h-5 sm:w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </NavbarSidebarLayout>
  );
};

export default TransactionListPage;
