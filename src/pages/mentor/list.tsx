/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  Breadcrumb,
  Button,
  Checkbox,
  Label,
  Modal,
  Table,
  TextInput,
} from "flowbite-react";
import Datepicker from "tailwind-datepicker-react";
import Select from "react-select";
import type { FC } from "react";
import { useState, useEffect } from "react";
import {
  HiChevronLeft,
  HiChevronRight,
  HiDocumentDownload,
  HiHome,
  HiOutlineExclamationCircle,
  HiOutlineEye,
  HiTrash,
  HiX,
} from "react-icons/hi";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import { format } from "date-fns";
import { useMentorStore } from "../../store/mentor";
import { useUserStore } from "../../store/user";
import { exportExcel } from "../../utils/excelHelper";
import { handleCopyClick, shortenId } from "../../utils/dataHelper";
import { FaCopy } from "react-icons/fa";
import { Pagination } from "../application/list";
// import { Datepicker } from "../../components/datepicker";

const dropdownOption = [
  { value: "id", label: "Id" },
  { value: "name", label: "Tên mentor" },
];

const MentorListPage: FC = function () {
  const [searchTerm, setSearchTerm] = useState("");
  const [mentorList, setMentorList] = useState([]);

  const [selectedOption, setSelectedOption] = useState(dropdownOption[1]);

  const [show, setShow] = useState(false);
  const { mentors, setMentors, fetchMentors } = useMentorStore();
  const { user, getUserById } = useUserStore();

  const handleClose = (state: boolean) => {
    setShow(state);
  };

  useEffect(() => {
    const fetchAndSetMentors = async () => {
      try {
        await fetchMentors();
      } catch (er) {
        console.error(er);
      }
    };

    fetchAndSetMentors();
  }, [fetchMentors, getUserById]);

  useEffect(() => {
    if (!mentors) {
      return;
    }
    const mentorsWithUser = mentors.map((mentor) => {
      // const user = await getUserById(mentor.mentorId);
      return { ...user, ...mentor };
    });
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm) {
        const results = mentorsWithUser.filter((mentor) =>
          mentor[selectedOption.value]
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        );
        console.log("mentorList", results, mentorList, searchTerm);
        setMentorList(results);
      } else {
        setMentorList(mentorsWithUser);
      }
    }, 1200);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, mentors]);
  useEffect(() => {
    if (mentors) {
      const mentorsWithUser = mentors.map((mentor) => {
        // const user = await getUserById(mentor.mentorId);
        return {
          ...mentor,
          mentor: user,
        };
      });
      setMentorList(mentorsWithUser);
      console.log("mentorWIghtUser", mentorsWithUser);
    }
  }, [mentors]);
  console.log("mentors", mentors);

  const handleExportFileExcel = () => {
    // const jsonData = mentorList.map((a) => mentorToExcelData(a));
    // console.log("jsonData", jsonData);
    // exportExcel(jsonData, "mentor_list");
  };
  return (
    <NavbarSidebarLayout isFooter={false}>
      <div className="block items-center justify-between border-b border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex">
        <div className="mb-1 w-full">
          <div className="mb-4">
            <Breadcrumb className="mb-4">
              <Breadcrumb.Item href="#">
                <div className="flex items-center gap-x-3">
                  <HiHome className="text-xl" />
                  <span className="dark:text-white">Home</span>
                </div>
              </Breadcrumb.Item>
              <Breadcrumb.Item href="/mentor">Mentor</Breadcrumb.Item>
              {/* <Breadcrumb.Item>List</Breadcrumb.Item> */}
            </Breadcrumb>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
              Mentor
            </h1>
          </div>
          <div className="sm:flex">
            <div className="mb-3 hidden items-center dark:divide-gray-700 sm:mb-0 sm:flex sm:divide-x sm:divide-gray-100">
              <form className="lg:pr-3">
                <Label htmlFor="users-search" className="sr-only">
                  Search
                </Label>
                <div className="relative mt-1 lg:w-64 xl:w-96">
                  <TextInput
                    id="users-search"
                    name="users-search"
                    placeholder="Tìm mentor"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </form>
              <div style={{ marginRight: 8, minWidth: 200 }}>
                <Select
                  styles={{
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      color: "white",
                      backgroundColor: "#374151",
                    }),
                    singleValue: (baseStyles, state) => ({
                      ...baseStyles,
                      color: "white",
                      backgroundColor: "#374151",
                    }),
                    option: (baseStyles, state) => ({
                      ...baseStyles,
                      color: "#374151",
                    }),
                  }}
                  defaultValue={selectedOption}
                  onChange={setSelectedOption}
                  options={dropdownOption}
                />
              </div>
            </div>
            <div className="ml-auto flex items-center space-x-2 sm:space-x-3">
              {/* <AddUserModal /> */}
              <Button onClick={handleExportFileExcel} color="gray">
                <div className="flex items-center gap-x-3">
                  <HiDocumentDownload className="text-xl" />
                  <span>Export</span>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow">
              <AllMentors mentors={mentorList} />
            </div>
          </div>
        </div>
      </div>
      <Pagination />
    </NavbarSidebarLayout>
  );
};

const styles = {
  text: {
    color: "white",
  },
};

const ViewMentorDetail: FC = function ({ mentor }) {
  const [isOpen, setOpen] = useState(false);
  const [isShow, setShow] = useState(false);
  const { mentors } = useMentorStore();
  const onImageClick = () => {
    setShow(true);
  };

  const closeModal = () => {
    if (isOpen && !isShow) {
      setOpen(false);
    }
    setShow(false);
  };
  const handleAcceptMentor = async () => {
    try {
      setOpen(false);
    } catch (er) {
      console.error("update mentor er", er);
    }
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const modal = document.getElementById("modal");
      if (modal && !modal.contains(event.target as Node)) {
        closeModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <Button color="primary" onClick={() => setOpen(true)}>
        <div className="flex items-center gap-x-2">
          <HiOutlineEye className="text-lg" />
          Xem
        </div>
      </Button>
      <Modal style={{}} onClose={() => setOpen(false)} show={isOpen}>
        <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
          <strong>Thông tin ứng viên</strong>
        </Modal.Header>
        <Modal.Body>
          <div
            style={{
              display: "flex",

              flexDirection: "row",
            }}
          >
            <img
              style={{ marginRight: 20 }}
              src="https://picsum.photos/300/200"
              width={200}
              height={160}
            ></img>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <Label htmlFor="firstName">Họ và tên</Label>
                <div className="mt-1">
                  <p style={styles.text}>{mentor.name}</p>
                </div>
              </div>
              <div>
                <Label htmlFor="lastName">Ngày sinh</Label>
                <div className="mt-1">
                  <p style={styles.text}>27-10-2002</p>
                </div>
              </div>
              <div>
                <Label htmlFor="email">Số điện thoại</Label>
                <div className="mt-1">
                  <p style={styles.text}>{mentor.phoneNumber}</p>
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <div className="mt-1">
                  <p style={styles.text}>JBkhanhtran@gmail.com</p>
                </div>
              </div>
              <div>
                <Label htmlFor="phone">Nghề nghiệp</Label>
                <div className="mt-1">
                  <p style={styles.text}>Mobile Developer</p>
                </div>
              </div>
              <div>
                <Label htmlFor="company">Company</Label>
                <div className="mt-1"></div>
              </div>
            </div>
          </div>
          <div style={{ marginTop: 12 }}>
            <Label htmlFor="department">Kinh nghiệm làm việc</Label>
            <div className="mt-1">
              <p style={styles.text}>
                Lorem ipsum dolor sit amet. Qui perspiciatis dolorem ut
                asperiores laborum non reprehenderit voluptatem ut amet nostrum.
                Hic fugiat sequi non mollitia rerum sit eaque illo ex voluptate
                mollitia ut dignissimos assumenda. Eum autem cumque in voluptas
                delectus vel dolores provident 33 quos aliquid?
              </p>
            </div>
            <Label style={{ marginTop: 12 }} htmlFor="department">
              Chứng chỉ
            </Label>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-4"></div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={{ alignSelf: "flex-end", marginLeft: "auto" }}
            color="primary"
            onClick={handleAcceptMentor}
          >
            Chấp thuận
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        onClick={(e) => e.stopPropagation()}
        style={{}}
        onClose={() => setShow(false)}
        show={isShow}
      >
        <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
          <strong>Chứng chỉ</strong>
        </Modal.Header>
        <Modal.Body>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              style={{ marginRight: 20 }}
              src="https://picsum.photos/200/300"
              width={200}
              height={160}
            ></img>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

const AllMentors: FC = function ({ mentors }) {
  const [checkedItems, setCheckedItems] = useState({});
  console.log("Allmentor", mentors);
  const handleChange = (event) => {
    setCheckedItems({
      ...checkedItems,
      [event.target.name]: event.target.checked,
    });
  };
  console.log("checkbox", checkedItems);
  return (
    <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
      <Table.Head className="bg-gray-100 dark:bg-gray-700">
        <Table.HeadCell>
          <Label htmlFor="select-all" className="sr-only">
            Select all
          </Label>
          <Checkbox id="select-all" name="select-all" />
        </Table.HeadCell>
        <Table.HeadCell>Id</Table.HeadCell>
        <Table.HeadCell>Tên mentor</Table.HeadCell>
        <Table.HeadCell>Email</Table.HeadCell>
        <Table.HeadCell>Nghề nghiệp</Table.HeadCell>
        <Table.HeadCell>Số khoá học</Table.HeadCell>
        <Table.HeadCell>Ngày tạo</Table.HeadCell>
        <Table.HeadCell></Table.HeadCell>
      </Table.Head>

      <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
        {mentors.map((mentor, index) => (
          <Table.Row
            key={index}
            className="hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Table.Cell className="w-4 p-4">
              <div className="flex items-center">
                <Checkbox
                  checked={checkedItems[`checkbox-${index}`] || false} // Sử dụng trạng thái từ state
                  onChange={handleChange} // Thêm hàm xử lý sự kiện thay đổi
                  aria-describedby={`checkbox-${index}`}
                  id={`checkbox-${index}`}
                  name={`checkbox-${index}`} // Thêm thuộc tính name để xác định checkbox cụ thể nào đang được thay đổi
                />
                <label htmlFor={`checkbox-${index}`} className="sr-only">
                  checkbox
                </label>
              </div>
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
              <div className="flex items-center">
                {shortenId(mentor.id)}
                <button
                  onClick={() => handleCopyClick(mentor.id)}
                  className="ml-2"
                >
                  <FaCopy className="text-xl" />
                </button>
              </div>
            </Table.Cell>
            <Table.Cell className="mr-12 flex items-center space-x-6 whitespace-nowrap p-4 lg:mr-0">
              <img
                className="h-10 w-10 rounded-full"
                src={mentor.avatar}
                alt={`${mentor.name} avatar`}
              />
              <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                <div className="text-base font-semibold text-gray-900 dark:text-white">
                  {mentor.name}
                </div>
                <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                  {mentor.email}
                </div>
              </div>
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
              {format(new Date(mentor.createdAt), "dd-MM-yyyy")}
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap p-4 text-base font-normal text-gray-900 dark:text-white">
              <div className="flex items-center">
                <div className="mr-2 h-2.5 w-2.5 rounded-full bg-green-400"></div>{" "}
                {mentor.status}
              </div>
            </Table.Cell>

            <Table.Cell>
              <div className="flex items-center gap-x-3 whitespace-nowrap">
                <ViewMentorDetail mentor={mentor} />
              </div>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

const ViewMentorDetai1l: FC = function () {
  const [isOpen, setOpen] = useState(false);

  const viewMentor = () => {
    setOpen(true);
  };
  const rejectMentor = () => {
    setOpen(true);
  };
  return (
    <>
      <Button color="primary" onClick={viewMentor}>
        <div className="flex items-center gap-x-2">
          <HiOutlineEye className="text-lg" />
          Xem
        </div>
      </Button>
      <Modal onClose={() => setOpen(false)} show={isOpen}>
        <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
          <strong>Edit user</strong>
        </Modal.Header>
        <Modal.Body>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <Label htmlFor="firstName">First name</Label>
              <div className="mt-1">
                <TextInput
                  id="firstName"
                  name="firstName"
                  placeholder="Bonnie"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="lastName">Last name</Label>
              <div className="mt-1">
                <TextInput id="lastName" name="lastName" placeholder="Green" />
              </div>
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <div className="mt-1">
                <TextInput
                  id="email"
                  name="email"
                  placeholder="example@company.com"
                  type="email"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="phone">Phone number</Label>
              <div className="mt-1">
                <TextInput
                  id="phone"
                  name="phone"
                  placeholder="e.g., +(12)3456 789"
                  type="tel"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="department">Department</Label>
              <div className="mt-1">
                <TextInput
                  id="department"
                  name="department"
                  placeholder="Development"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="company">Công ty</Label>
              <div className="mt-1">
                <TextInput
                  id="company"
                  name="company"
                  placeholder="Somewhere"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="passwordCurrent">Current password</Label>
              <div className="mt-1">
                <TextInput
                  id="passwordCurrent"
                  name="passwordCurrent"
                  placeholder="••••••••"
                  type="password"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="passwordNew">New password</Label>
              <div className="mt-1">
                <TextInput
                  id="passwordNew"
                  name="passwordNew"
                  placeholder="••••••••"
                  type="password"
                />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="primary" onClick={() => setOpen(false)}>
            Save all
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MentorListPage;
