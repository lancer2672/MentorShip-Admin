import { Badge, Label, Table, TextInput } from "flowbite-react";

import { format } from "date-fns";
import { useEffect, useState, type FC } from "react";
import memberApi from "../../api/member-api";
import mentorApi from "../../api/mentor-api";
import transactionApi from "../../api/transaction-api";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import { RoleType } from "../../types";
import formatCurrency from "../../utils/formatCurrency";
const TransactionListPage: FC = function () {
  const [searchTerm, setSearchTerm] = useState("");
  const [transactions, setTransactions] = useState([]);
  const fetchTransactions = async () => {
    const data = await transactionApi.getAll();
    if (data) {
      const dataWithUser = await Promise.all(
        data.map(async (trans) => {
          const mentorData = await mentorApi.getById(trans.mentorId);
          const menteeData = await memberApi.getById(
            RoleType.Mentee,
            trans.menteeId
          );
          console.log("dataWithUser 1 ", mentorData);

          return {
            ...trans,
            mentor: mentorData,
            mentee: menteeData,
          };
        })
      );
      setTransactions(dataWithUser);
      // const mentorData = await Promise.all(
      //   data.map((transaction) => {
      //     return mentorApi.getById(transaction.mentorId);
      //   })
      // );
      // const menteeData = await Promise.all(
      //   data.map((transaction) => {
      //     return memberApi.getById(RoleType.Mentee, transaction.menteeId);
      //   })
      // );

      console.log("dataWithUser", dataWithUser);
    }

    setTransactions(dataWithUser);
  };
  useEffect(() => {
    fetchTransactions();
  }, []);
  return (
    <NavbarSidebarLayout isFooter={false}>
      <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800 sm:p-6 xl:p-8">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
              Thông tin giao dịch
            </h3>
            <form className="lg:pr-3">
              <Label htmlFor="users-search" className="sr-only">
                Tìm kiếm
              </Label>
              <div className="relative mt-1 lg:w-64 xl:w-96">
                <TextInput
                  id="users-search"
                  name="users-search"
                  placeholder="Tìm giao dịch"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </form>
          </div>
          <div className="shrink-0">
            <a
              href="#"
              className="rounded-lg p-2 text-sm font-medium text-primary-700 hover:bg-gray-100 dark:text-primary-500 dark:hover:bg-gray-700"
            >
              Xem tất cả
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
                    <Table.HeadCell>Transaction_Id</Table.HeadCell>
                    <Table.HeadCell>Mentor_Id</Table.HeadCell>
                    <Table.HeadCell>Giao dịch</Table.HeadCell>
                    <Table.HeadCell>Thời gian</Table.HeadCell>
                    <Table.HeadCell>Tiền</Table.HeadCell>
                    <Table.HeadCell>Trạng thái</Table.HeadCell>
                  </Table.Head>
                  <Table.Body className="bg-white dark:bg-gray-800">
                    {transactions.map((transaction, index) => {
                      console.log("transaction", transaction);
                      return (
                        <Table.Row key={`${index}as`}>
                          <Table.Cell className="whitespace-nowrap p-4 text-sm font-normal text-gray-900 dark:text-white">
                            <span className="font-semibold">
                              {transaction.id}
                            </span>
                          </Table.Cell>
                          <Table.Cell className="whitespace-nowrap p-4 text-sm font-normal text-gray-900 dark:text-white">
                            <span className="font-semibold">
                              {transaction?.mentor?.id}
                            </span>
                          </Table.Cell>
                          <Table.Cell className="whitespace-nowrap p-4 text-sm font-normal text-gray-900 dark:text-white">
                            Thanh toán từ
                            <span className="font-semibold">
                              {" "}
                              {transaction?.mentee?.lastName}{" "}
                              {transaction?.mentee?.firstName}
                            </span>
                          </Table.Cell>
                          <Table.Cell className="whitespace-nowrap p-4 text-sm font-normal text-gray-500 dark:text-gray-400">
                            {format(
                              new Date(transaction.createdAt),
                              "dd-MM-yyyy"
                            )}
                          </Table.Cell>
                          <Table.Cell className="whitespace-nowrap p-4 text-sm font-semibold text-gray-900 dark:text-white">
                            {formatCurrency(transaction.price)}
                          </Table.Cell>
                          <Table.Cell className="flex whitespace-nowrap p-4">
                            {/* <Badge color="success">Completed</Badge> */}
                            {transaction.status == 0 ? (
                              <Badge color="success"> Thành công </Badge>
                            ) : (
                              <Badge color="failure"> Thất bại</Badge>
                            )}
                          </Table.Cell>
                        </Table.Row>
                      );
                    })}
                  </Table.Body>
                </Table>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="flex items-center justify-between pt-3 sm:pt-6">
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
        </div> */}
      </div>
    </NavbarSidebarLayout>
  );
};

export default TransactionListPage;
