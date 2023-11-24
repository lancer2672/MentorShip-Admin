/* eslint-disable jsx-a11y/anchor-is-valid */
import classNames from "classnames";
import { Dropdown, Sidebar, TextInput, Tooltip } from "flowbite-react";
import type { FC } from "react";
import { useEffect, useState } from "react";
import {
  HiAdjustments,
  HiBookOpen,
  HiChartPie,
  HiDocument,
  HiInboxIn,
  HiInformationCircle,
  HiLockClosed,
  HiOutlineAdjustments,
  HiSearch,
  HiShoppingBag,
  HiUsers,
  HiViewGrid,
} from "react-icons/hi";

import { useSidebarContext } from "../context/SidebarContext";
import isSmallScreen from "../helpers/is-small-screen";

const ExampleSidebar: FC = function () {
  const { isOpenOnSmallScreens: isSidebarOpenOnSmallScreens } =
    useSidebarContext();

  const [currentPage, setCurrentPage] = useState("");
  const [isEcommerceOpen, setEcommerceOpen] = useState(true);
  const [isUsersOpen, setUsersOpen] = useState(true);

  useEffect(() => {
    const newPage = window.location.pathname;

    setCurrentPage(newPage);
    setEcommerceOpen(newPage.includes("/e-commerce/"));
    setUsersOpen(newPage.includes("/users/"));
  }, [setCurrentPage, setEcommerceOpen, setUsersOpen]);

  return (
    <div
      className={classNames("lg:!block", {
        hidden: !isSidebarOpenOnSmallScreens,
      })}
    >
      <Sidebar
        aria-label="Sidebar with multi-level dropdown example"
        collapsed={isSidebarOpenOnSmallScreens && !isSmallScreen()}
      >
        <div className="flex h-full flex-col justify-between py-2">
          <div>
            <form className="pb-3 md:hidden">
              <TextInput
                icon={HiSearch}
                type="search"
                placeholder="Search"
                required
                size={32}
              />
            </form>
            <Sidebar.Items>
              <Sidebar.ItemGroup>
                <Sidebar.Item
                  href="/"
                  icon={HiChartPie}
                  className={
                    "/" === currentPage ? "bg-gray-100 dark:bg-gray-700" : ""
                  }
                >
                  Bảng điều khiển
                </Sidebar.Item>
                <Sidebar.Item
                  href="/application"
                  icon={HiDocument}
                  label={12}
                  className={
                    "/application" === currentPage
                      ? "bg-gray-100 dark:bg-gray-700"
                      : ""
                  }
                >
                  Đơn ứng tuyển
                </Sidebar.Item>

                <Sidebar.Item
                  href="/course"
                  icon={HiBookOpen}
                  className={
                    "/course" === currentPage
                      ? "bg-gray-100 dark:bg-gray-700"
                      : ""
                  }
                >
                  Danh sách khoá học
                </Sidebar.Item>

                <Sidebar.Collapse
                  icon={HiOutlineAdjustments}
                  label="Quản lý"
                  open={isEcommerceOpen}
                >
                  <Sidebar.Item
                    href="/management/mentor"
                    className={
                      "/management/mentor" === currentPage
                        ? "bg-gray-100 dark:bg-gray-700"
                        : ""
                    }
                  >
                    Mentor
                  </Sidebar.Item>
                  <Sidebar.Item
                    href="/management/mentee"
                    className={
                      "/management/mentee" === currentPage
                        ? "bg-gray-100 dark:bg-gray-700"
                        : ""
                    }
                  >
                    Mentee
                  </Sidebar.Item>
                  <Sidebar.Item
                    href="/management/skill"
                    className={
                      "/management/skill" === currentPage
                        ? "bg-gray-100 dark:bg-gray-700"
                        : ""
                    }
                  >
                    Kĩ năng
                  </Sidebar.Item>
                </Sidebar.Collapse>
                <Sidebar.Item
                  href="/application"
                  icon={HiDocument}
                  className={
                    "/application" === currentPage
                      ? "bg-gray-100 dark:bg-gray-700"
                      : ""
                  }
                >
                  Thông tin giao dịch
                </Sidebar.Item>
              </Sidebar.ItemGroup>
            </Sidebar.Items>
          </div>
        </div>
      </Sidebar>
    </div>
  );
};

export default ExampleSidebar;
