/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  Breadcrumb,
  Button,
  Checkbox,
  Label,
  Modal,
  Table,
  TextInput,
} from 'flowbite-react';
import Datepicker from 'tailwind-datepicker-react';
import Select from 'react-select';
import type {FC} from 'react';
import {useState, useEffect} from 'react';
import {
  HiChevronLeft,
  HiChevronRight,
  HiDocumentDownload,
  HiHome,
  HiOutlineExclamationCircle,
  HiOutlineEye,
  HiTrash,
  HiX,
} from 'react-icons/hi';
import NavbarSidebarLayout from '../../layouts/navbar-sidebar';
import {format} from 'date-fns';
import {useMenteeStore} from '../../store/mentee';
import {useUserStore} from '../../store/user';
import {exportExcel} from '../../utils/excelHelper';
import {handleCopyClick, shortenId} from '../../utils/dataHelper';
import {FaCopy} from 'react-icons/fa';
import {Pagination} from '../application/list';
// import { Datepicker } from "../../components/datepicker";

const dropdownOption = [
  {value: 'id', label: 'Id'},
  {value: 'name', label: 'Tên mentee'},
];

const MenteeListPage: FC = function () {
  const [searchTerm, setSearchTerm] = useState('');
  const [menteeList, setMenteeList] = useState([]);

  const [selectedOption, setSelectedOption] = useState(dropdownOption[1]);

  const [show, setShow] = useState(false);
  const {mentees, setMentees, fetchMentees} = useMenteeStore();
  const {user, getUserById} = useUserStore();

  const handleClose = (state: boolean) => {
    setShow(state);
  };

  useEffect(() => {
    const fetchAndSetMentees = async () => {
      try {
        await fetchMentees();
      } catch (er) {
        console.error(er);
      }
    };

    fetchAndSetMentees();
  }, [fetchMentees, getUserById]);

  useEffect(() => {
    if (!mentees) {
      return;
    }
    const menteeWithUser = mentees.map((mentee) => {
      // const user = await getUserById(mentor.mentorId);
      return {...user, ...mentee};
    });
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm) {
        let results = [];
        if (selectedOption.value === 'id') {
          results = menteeWithUser.filter((mentee) =>
            mentee.id.toLowerCase().includes(searchTerm.toLowerCase())
          );
        } else if (selectedOption.value === 'name') {
          results = menteeWithUser.filter(
            (mentee) =>
              mentee.firstName
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
              mentee.lastName.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }
        console.log('menteeList', results, menteeList, searchTerm);
        setMenteeList(results);
      } else {
        setMenteeList(menteeWithUser);
      }
    }, 1200);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, mentees]);
  useEffect(() => {
    if (mentees) {
      const menteeWithUser = mentees.map((mentee) => {
        // const user = await getUserById(mentor.mentorId);
        return {
          ...mentee,
          mentee: user,
        };
      });
      setMenteeList(menteeWithUser);
      console.log('menteeWithUser', menteeWithUser);
    }
  }, [mentees]);
  console.log('mentees', mentees);

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
              <Breadcrumb.Item href="/mentee">Mentee</Breadcrumb.Item>
              {/* <Breadcrumb.Item>List</Breadcrumb.Item> */}
            </Breadcrumb>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
              Mentee
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
                    placeholder="Tìm mentee"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </form>
              <div style={{marginRight: 8, minWidth: 200}}>
                <Select
                  styles={{
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      color: '#374151',
                    }),
                    singleValue: (baseStyles, state) => ({
                      ...baseStyles,
                      color: '#374151',
                    }),
                    option: (baseStyles, state) => ({
                      ...baseStyles,
                      color: '#374151',
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
              <AllMentees mentees={menteeList} />
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
    color: 'black',
  },
};

const AllMentees: FC = function ({mentees}) {
  const [checkedItems, setCheckedItems] = useState({});
  console.log('Allmentees', mentees);
  const handleChange = (event) => {
    setCheckedItems({
      ...checkedItems,
      [event.target.name]: event.target.checked,
    });
  };
  console.log('checkbox', checkedItems);
  return (
    <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
      <Table.Head className="bg-gray-100 dark:bg-gray-700">
        <Table.HeadCell className="p-4">STT</Table.HeadCell>
        <Table.HeadCell>Id</Table.HeadCell>
        <Table.HeadCell>Tên mentee</Table.HeadCell>
        <Table.HeadCell style={{maxWidth: '150px'}}>
          Số điện thoại
        </Table.HeadCell>
        <Table.HeadCell>Ngày tạo</Table.HeadCell>
        <Table.HeadCell></Table.HeadCell>
      </Table.Head>

      <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
        {mentees.map((mentee, index) => (
          <Table.Row
            key={index}
            className="hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
              <div className="flex items-center">{index + 1}</div>
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
              <div className="flex items-center">
                {shortenId(mentee.id)}
                <button
                  onClick={() => handleCopyClick(mentee.id)}
                  className="ml-2"
                >
                  <FaCopy className="text-xl" />
                </button>
              </div>
            </Table.Cell>
            <Table.Cell className="mr-12 flex items-center space-x-6 whitespace-nowrap p-4 lg:mr-0">
              <img
                className="h-10 w-10 rounded-full"
                src={mentee.avatar}
                alt={`${mentee.firstName} avatar`}
              />
              <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                <div className="text-base font-semibold text-gray-900 dark:text-white">
                  {mentee.firstName} {mentee.lastName}
                </div>
                <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                  {mentee.email}
                </div>
              </div>
            </Table.Cell>
            <Table.Cell
              className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white"
              style={{
                maxWidth: '150px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {mentee.phoneNumber}
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
              {format(new Date(mentee.createdAt), 'dd-MM-yyyy')}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default MenteeListPage;
