/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  Avatar,
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
  HiOutlineEye,
  HiTrash,
  HiX,
} from 'react-icons/hi';
import {FaCopy} from 'react-icons/fa';
import NavbarSidebarLayout from '../../layouts/navbar-sidebar';
import {format} from 'date-fns';
import {useApplicationStore} from '../../store/application';
import {useUserStore} from '../../store/user';
import {ApprovalStatus} from '../../constants';
import {applicationToExcelData} from '../../utils/excelDataHelper';
import {exportExcel} from '../../utils/excelHelper';
import {handleCopyClick, shortenId} from '../../utils/dataHelper';
import sendMail from '../../service/sendMail';
import firebaseInstance from '../../service/firebaseService';
// import { Datepicker } from "../../components/datepicker";

const dropdownOption = [
  {value: 'id', label: 'Id'},
  {value: 'displayName', label: 'Tên ứng viên'},
];

const ApplicationListPage: FC = function () {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [applicationList, setApplicationList] = useState([]);

  const [selectedOption, setSelectedOption] = useState(dropdownOption[1]);

  const [show, setShow] = useState(false);
  const {applications, setApplications, fetchApplications} =
    useApplicationStore();
  const {user, getUserById} = useUserStore();

  const handleClose = (state: boolean) => {
    setShow(state);
  };

  // const createApplications = async () => {
  //   // Tạo các mentor
  //   const mentor1 = {
  //     id: null,
  //     applicationId: null,
  //     jobTitle: "Software Engineer",
  //     avatar: "",
  //     email: "",
  //     firstName: "Nguyen",
  //     lastName: "A",
  //     company: "",
  //     location: "",
  //     phoneNumber: "",
  //     dateOfBirth: null,
  //     bio: "",
  //     linkedIn: "",
  //     twitter: "",
  //     skillIds: ["657eeb8c6d4e50c8c5649cbf", "657eeb8d6d4e50c8c5649cc0"], // Giả sử "id1", "657eeb8d6d4e50c8c5649cc0", "id3" là các ID của kỹ năng trong lĩnh vực Công nghệ
  //     imageUrls: [],
  //     createdAt: new Date(),
  //   };

  //   // ... other mentors ...

  //   const application1 = {
  //     mentorProfile: mentor1,
  //     reasonToBeMentor:
  //       "I want to share my knowledge and experience in software engineering.",
  //   };

  //   // ... other applications ...

  //   // Sử dụng API để lưu đơn ứng tuyển vào cơ sở dữ liệu
  //   await applicationApi.createApplication(application1);
  //   // ... other API calls ...
  // };

  // useEffect(() => {
  //   createApplications();
  // }, []);

  useEffect(() => {
    const fetchAndSetApplications = async () => {
      try {
        await fetchApplications();
      } catch (er) {
        console.error(er);
      }
    };

    fetchAndSetApplications();
  }, [fetchApplications]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm) {
        let results = [];
        if (selectedOption.value === 'id') {
          results = applications.filter((application) =>
            application.id.toLowerCase().includes(searchTerm.toLowerCase())
          );
        } else if (selectedOption.value === 'displayName') {
          results = applications.filter(
            (application) =>
              application.mentorProfile.firstName
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
              application.mentorProfile.lastName
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
          );
        }
        setApplicationList(results);
      } else {
        setApplicationList(applications);
      }
    }, 1200);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, applications, selectedOption]);
  useEffect(() => {
    setApplicationList(applications);
  }, [applications]);
  console.log('setApplicationList', applications);
  const handleChange = (date) => {
    setSelectedDate(date);
    console.log(('seletedDate', date.getTime()));
    const filtered = applications.filter((application) => {
      const month = application.applicationDate.getMonth();
      const year = application.applicationDate.getFullYear();
      const d = application.applicationDate.getDate();

      const submitDateTimeStamp = new Date(year, month, d).getTime();

      console.log('submitDate', submitDateTimeStamp, date.getTime());
      return submitDateTimeStamp === date.getTime();
    });
    setApplicationList(filtered);
  };

  const options = {
    title: 'Select date',
    autoHide: true,
    todayBtn: false,
    clearBtn: true,
    clearBtnText: 'Clear',
    maxDate: new Date('2030-01-01'),
    minDate: new Date('1950-01-01'),
    theme: {
      background: 'bg-gray-700 dark:bg-gray-800',
      todayBtn: '',
      clearBtn: '',
      icons: '',
      text: '',

      input: '',
      inputIcon: '',
      selected: '',
    },
    icons: {
      // () => ReactElement | JSX.Element
    },
    datepickerClassNames: 'top-12',
    defaultDate: new Date(),
    language: 'en',
    disabledDates: [],
    weekDays: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
    inputNameProp: 'date',
    inputIdProp: 'date',
    inputPlaceholderProp: 'Select Date',
    inputDateFormatProp: {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    },
  };

  const handleExportFileExcel = () => {
    const jsonData = applicationList.map((a) => applicationToExcelData(a));
    console.log('jsonData', jsonData);
    exportExcel(jsonData, 'application_list');
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
              <Breadcrumb.Item href="/application">
                Đơn ứng tuyển
              </Breadcrumb.Item>
              {/* <Breadcrumb.Item>List</Breadcrumb.Item> */}
            </Breadcrumb>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
              Đơn ứng tuyển
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
                    placeholder="Tìm đơn ứng tuyển"
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
              <AllApplications applications={applicationList} />
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

type ViewApplicationDetailProps = {
  application: Application;
};
const ViewApplicationDetail: FC = function ({
  application,
}: ViewApplicationDetailProps) {
  const profileInfor = application.mentorProfile;
  const [isOpen, setOpen] = useState(false);
  const [isShow, setShow] = useState(false);
  const {applications, updateApplicationStatus} = useApplicationStore();
  const onImageClick = () => {
    setShow(true);
  };

  const closeModal = () => {
    if (isOpen && !isShow) {
      setOpen(false);
    }
    setShow(false);
  };
  const handleAcceptApplication = async () => {
    try {
      await updateApplicationStatus(application.id, ApprovalStatus.APPROVED);
      setOpen(false);
    } catch (er) {
      console.error('update application er', er);
    }
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const modal = document.getElementById('modal');
      if (modal && !modal.contains(event.target as Node)) {
        closeModal();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
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
      <Modal onClose={() => setOpen(false)} show={isOpen}>
        <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
          <strong>Thông tin ứng viên</strong>
        </Modal.Header>
        <Modal.Body>
          <div
            style={{
              display: 'flex',

              flexDirection: 'row',
            }}
          >
            <img
              style={{marginRight: 20}}
              src={application.mentorProfile.avatar}
              alt="avatar"
              width={200}
              height={160}
            ></img>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <Label htmlFor="firstName">Họ và tên</Label>
                <div className="mt-1">
                  <p style={styles.text}>
                    {profileInfor.firstName} {profileInfor.lastName}
                  </p>
                </div>
              </div>
              <div>
                <Label htmlFor="lastName">Ngày sinh</Label>
                <div className="mt-1">
                  <p style={styles.text}>
                    {format(
                      new Date(application.mentorProfile.dateOfBirth),
                      'dd-MM-yyyy'
                    )}
                  </p>
                </div>
              </div>
              <div>
                <Label htmlFor="email">Số điện thoại</Label>
                <div className="mt-1">
                  <p style={styles.text}>{profileInfor.phoneNumber}</p>
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <div className="mt-1">
                  <p style={styles.text}>{profileInfor.email}</p>
                </div>
              </div>
              <div>
                <Label htmlFor="phone">Nghề nghiệp</Label>
                <div className="mt-1">
                  <p style={styles.text}>{profileInfor.jobTitle}</p>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              marginTop: '12px',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
            }}
          >
            <div>
              <Label htmlFor="department">Lý lịch</Label>
              <div className="mt-1">
                <p style={styles.text}>{profileInfor.bio}</p>
              </div>
            </div>
            <div>
              <Label style={{marginTop: 12}} htmlFor="department">
                Chứng chỉ
              </Label>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-4">
                {profileInfor.imageUrls.map((url) => {
                  return (
                    <div
                      style={{alignItems: 'center', justifyContent: 'center'}}
                    >
                      <img
                        onClick={onImageClick}
                        src={url}
                        style={{
                          objectFit: 'cover',
                          backgroundColor: 'tomato',
                          margin: 0,
                        }}
                        width={180}
                        height={40}
                      ></img>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={{alignSelf: 'flex-end', marginLeft: 'auto'}}
            color="primary"
            onClick={handleAcceptApplication}
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
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <img
              style={{marginRight: 20}}
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

const AllApplications: FC = function ({applications}) {
  const [checkedItems, setCheckedItems] = useState({});
  console.log('Allapplication', applications);
  const handleChange = (event) => {
    setCheckedItems({
      ...checkedItems,
      [event.target.name]: event.target.checked,
    });
  };
  console.log('checkbox', checkedItems);

  const getStatusColor = (status) => {
    switch (status) {
      case ApprovalStatus.PENDING:
        return 'bg-yellow-500'; // Hoặc màu khác tùy thuộc vào yêu cầu của bạn
      case ApprovalStatus.APPROVED:
        return 'bg-green-400';
      case ApprovalStatus.REJECTED:
        return 'bg-red-500';
      default:
        return '';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case ApprovalStatus.PENDING:
        return 'Đang chờ duyệt';
      case ApprovalStatus.APPROVED:
        return 'Đã duyệt';
      case ApprovalStatus.REJECTED:
        return 'Bị từ chối';
      default:
        return '';
    }
  };

  return (
    <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
      <Table.Head className="bg-gray-100 dark:bg-gray-700">
        {/* <Table.HeadCell>
          <Label htmlFor="select-all" className="sr-only">
            Select all
          </Label>
          <Checkbox id="select-all" name="select-all" />
        </Table.HeadCell> */}
        <Table.HeadCell>Id</Table.HeadCell>
        <Table.HeadCell>Tên</Table.HeadCell>
        <Table.HeadCell>Ngày gửi</Table.HeadCell>
        <Table.HeadCell>Trạng thái</Table.HeadCell>
        <Table.HeadCell></Table.HeadCell>
      </Table.Head>

      <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
        {applications.map((application, index) => (
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
                {shortenId(application.id)}
                <button
                  onClick={() => handleCopyClick(application.id)}
                  className="ml-2"
                >
                  <FaCopy className="text-xl" />
                </button>
              </div>
            </Table.Cell>
            <Table.Cell className="mr-12 flex items-center space-x-6 whitespace-nowrap p-4 lg:mr-0">
              <div>
                <Avatar
                  // className="h-10!important w-10 rounded-full"
                  img={application.mentorProfile.avatar}
                  alt={`${application.name} avatar`}
                  // rounded
                />
              </div>
              <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                <div className="text-base font-semibold text-gray-900 dark:text-white">
                  {application.mentorProfile.firstName}{' '}
                  {application.mentorProfile.lastName}
                </div>
                <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                  {application.mentorProfile.email}
                  {application.mentorProfile.email}
                </div>
              </div>
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
              {format(new Date(application.applicationDate), 'dd-MM-yyyy')}
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap p-4 text-base font-normal text-gray-900 dark:text-white">
              <div className="flex items-center">
                <div
                  className={`mr-2 h-2.5 w-2.5 rounded-full ${getStatusColor(
                    application.status
                  )}`}
                ></div>
                {getStatusText(application.status)}
              </div>
            </Table.Cell>

            <Table.Cell>
              <div className="flex items-center gap-x-3 whitespace-nowrap">
                <ViewApplicationDetail application={application} />
                <RejectButton application={application} />
              </div>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

const RejectButton: FC = function ({application}) {
  const [isOpen, setOpen] = useState(false);
  const {applications, updateApplicationStatus} = useApplicationStore();

  const handleRejectApplication = async () => {
    try {
      await updateApplicationStatus(application.id, ApprovalStatus.REJECTED);
      setOpen(false);
    } catch (er) {
      console.error('update application er', er);
    }
  };
  return (
    <>
      <Button color="failure" onClick={handleRejectApplication}>
        <div className="flex items-center gap-x-2">
          <HiX className="text-lg" />
          Từ chối
        </div>
      </Button>
    </>
  );
};

export const Pagination: FC = function () {
  return (
    <div className="sticky bottom-0 right-0 w-full items-center border-t border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex sm:justify-between">
      <div className="mb-4 flex items-center sm:mb-0">
        <a
          href="#"
          className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          <span className="sr-only">Trang trước</span>
          <HiChevronLeft className="text-2xl" />
        </a>
        <a
          href="#"
          className="mr-2 inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          <span className="sr-only">Trang sau</span>
          <HiChevronRight className="text-2xl" />
        </a>
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
          Hiển thị&nbsp;
          <span className="font-semibold text-gray-900 dark:text-white">
            1-20
          </span>
          &nbsp;tr&nbsp;
          <span className="font-semibold text-gray-900 dark:text-white">
            2290
          </span>
        </span>
      </div>
      <div className="flex items-center space-x-3">
        <a
          href="#"
          className="inline-flex flex-1 items-center justify-center rounded-lg bg-primary-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          <HiChevronLeft className="mr-1 text-base" />
          Trước
        </a>
        <a
          href="#"
          className="inline-flex flex-1 items-center justify-center rounded-lg bg-primary-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          Sau
          <HiChevronRight className="ml-1 text-base" />
        </a>
      </div>
    </div>
  );
};

export default ApplicationListPage;
