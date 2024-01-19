/* eslint-disable jsx-a11y/anchor-is-valid */
import {format, set} from 'date-fns';
import {
  Breadcrumb,
  Button,
  Checkbox,
  Label,
  Modal,
  Table,
  TextInput,
} from 'flowbite-react';
import type {FC} from 'react';
import {useEffect, useState} from 'react';
import {
  HiDocumentDownload,
  HiHome,
  HiOutlineExclamationCircle,
  HiOutlineEye,
  HiX,
} from 'react-icons/hi';
import Select from 'react-select';
import NavbarSidebarLayout from '../../layouts/navbar-sidebar';
import {useSkillStore} from '../../store/skill';
import {useUserStore} from '../../store/user';
import {shortenId} from '../../utils/dataHelper';
// import { Datepicker } from "../../components/datepicker";

const dropdownOption = [
  {value: 'id', label: 'Id'},
  {value: 'displayName', label: 'Name'},
];

const SkillListPage: FC = function () {
  const [searchTerm, setSearchTerm] = useState('');
  const [skillList, setSkillList] = useState([]);

  const [selectedOption, setSelectedOption] = useState({
    value: 'displayName',
    label: 'Name',
  });

  const [show, setShow] = useState(false);
  const {skills, setSkills, fetchSkills} = useSkillStore();
  const {user, getUserById} = useUserStore();

  const handleClose = (state: boolean) => {
    setShow(state);
  };

  // useEffect(() => {
  //   createApplications();
  // }, []);

  useEffect(() => {
    const fetchAndSetSkills = async () => {
      try {
        await fetchSkills();
      } catch (er) {
        console.error(er);
      }
    };

    fetchAndSetSkills();
  }, [fetchSkills, getUserById]);

  // useEffect(() => {
  //   if (skills.length > 0) {
  //     setSkillList(skills);
  //   }
  // }, [skills]);

  useEffect(() => {
    const skillsWithUser = skills.map((skill) => {
      // const user = await getUserById(skill.mentorId);
      return {...user, ...skill};
    });
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm) {
        let results = [];
        if (selectedOption.value === 'id') {
          results = skillsWithUser.filter((skill) =>
            skill.id.toLowerCase().includes(searchTerm.toLowerCase())
          );
        } else if (selectedOption.value === 'displayName') {
          results = skillsWithUser.filter((skill) =>
            skill.name.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }

        console.log('skillList', results, skillList, searchTerm);
        setSkillList(results);
      } else {
        setSkillList(skillsWithUser);
      }
    }, 1200);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);
  console.log('skills', skills);

  const handleExportFileExcel = () => {
    // const jsonData = skillList.map((a) => skillToExcelData(a));
    // console.log("jsonData", jsonData);
    // exportExcel(jsonData, "skill_list");
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
              <Breadcrumb.Item href="/skill">Kĩ năng</Breadcrumb.Item>
              {/* <Breadcrumb.Item>List</Breadcrumb.Item> */}
            </Breadcrumb>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
              Danh sách kĩ năng
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
                    placeholder="Tìm kĩ năng"
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
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow">
              {skills.length > 0 && <AllSkills skills={skillList} />}
            </div>
          </div>
        </div>
      </div>
      {/* <Pagination /> */}
    </NavbarSidebarLayout>
  );
};

const styles = {
  text: {
    color: 'white',
  },
};

const AllSkills: FC = function ({skills}) {
  const [checkedItems, setCheckedItems] = useState({});
  console.log('skills', skills);
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
        <Table.HeadCell>Tên</Table.HeadCell>
        <Table.HeadCell>Ngày tạo</Table.HeadCell>
        <Table.HeadCell></Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
        {skills.length > 0 && (
          <>
            {skills.map((skill, index) => (
              <Table.Row
                key={index}
                className="hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
                  <div className="flex items-center">{index + 1}</div>
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
                  {shortenId(skill.id)}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {skill.name}
                  </div>
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
                  {format(new Date(skill.createdAt), 'dd-MM-yyyy')}
                </Table.Cell>

                <Table.Cell>
                  <div className="flex items-center gap-x-3 whitespace-nowrap">
                    <DeleteUserModal skill={skill} />
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
          </>
        )}
      </Table.Body>
    </Table>
  );
};

const DeleteUserModal: FC = function ({skill}) {
  const [isOpen, setOpen] = useState(false);
  const {skills} = useSkillStore();

  const handleRejectSkill = async () => {
    try {
      setOpen(true);
    } catch (er) {
      console.error('update skill er', er);
    }
  };
  return (
    <>
      <Button color="failure" onClick={handleRejectSkill}>
        <div className="flex items-center gap-x-2">
          <HiX className="text-lg" />
          Xóa
        </div>
      </Button>
      <Modal onClose={() => setOpen(false)} show={isOpen} size="md">
        <Modal.Header className="px-6 pb-0 pt-6">
          <span className="sr-only">Xóa kĩ năng</span>
        </Modal.Header>
        <Modal.Body className="px-6 pb-6 pt-0">
          <div className="flex flex-col items-center gap-y-6 text-center">
            <HiOutlineExclamationCircle className="text-7xl text-red-500" />
            <p className="text-xl text-gray-500">
              Bạn có muốn xóa kĩ năng này không?
            </p>
            <div className="flex items-center gap-x-3">
              <Button color="failure" onClick={() => setOpen(false)}>
                Có
              </Button>
              <Button color="gray" onClick={() => setOpen(false)}>
                Không
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SkillListPage;
