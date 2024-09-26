/* eslint-disable react/no-unknown-property */
import {
  Button,
  Popover,
  PopoverContent,
  PopoverHandler,
} from "@material-tailwind/react";
import {
  iDashSelected,
  iDashUnselected,
} from "../../../utils/icons/dashboard-icons/dashicons";

import {
  useAllUsersQuery,
  useModifyUserInfoMutation,
  useRemoveUserByIdsMutation,
} from "../../../redux/features/users/usersApi";
import UsersTableRow from "../../../components/dashboard-components/overseer/UsersTableRow";
import { useEffect, useMemo, useState } from "react";
import UsersPagination from "../../../components/dashboard-components/overseer/UsersPagination";
import AddUserModal from "../../../components/dashboard-components/overseer/AddUserModal";
import { toast } from "react-toastify";
import { SpinnerCircularFixed } from "spinners-react";
import { ROLE_DATA } from "../../../lib/config";
import Loading from "../../../components/common/loadings/Loading";
import { useRouter } from "next/router";
import DashboardPrivateRoute from "@/middlewares/DashboardPrivateRoute";
import DashboardLayout from "@/layouts/DashboardLayout";

const roles = [
  ROLE_DATA.ADMIN,
  ROLE_DATA.MOD,
  ROLE_DATA.BRAND,
  ROLE_DATA.ARTIST,
  ROLE_DATA.USER,
];

const headers = [
  { name: "Username", styles: "min-w-[170px] max-w-[170px] ml-[37px]" },
  { name: "E-Mail", styles: "min-w-[190px] max-w-[190px] ml-[55px]" },
  { name: "User Role", styles: "min-w-[75px] max-w-[75px] ml-[55px]" },
  { name: "Status", styles: "min-w-[80px] max-w-[80px] ml-[55px]" },
  { name: "Verification", styles: "min-w-[90px] max-w-[90px] ml-[55px]" },
  { name: "Reports", styles: "min-w-[85px] max-w-[85px] ml-[55px]" },
  { name: "Location", styles: "min-w-[120px] max-w-[120px] ml-[55px]" },
  { name: "Last Active", styles: "min-w-[260px] max-w-[260px] ml-[55px]" },
];

const Overseer = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const router = useRouter();
  const search = router?.query?.search;
  const [removeUserByIds, { isLoading }] = useRemoveUserByIdsMutation();
  const [modifyUserInfo, { isLoading: modifyLoading }] =
    useModifyUserInfoMutation();
  const {
    data,
    isLoading: { userLoading },
  } = useAllUsersQuery(
    `?page=${currentPage}${search ? `&search=${search}` : ""}`
  );

  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [verify, setVerify] = useState("");

  const [open, setOpen] = useState(false);

  const handleSelect = async (userData) => {
    if (userData) {
      const stored = [...selectedItems];
      const findIndex = await selectedItems.findIndex(
        (item) => item._id === userData?._id
      );
      if (findIndex !== -1) {
        stored.splice(findIndex, 1);
        setSelectedItems(stored);
      } else {
        stored.push(userData);
        setSelectedItems(stored);
      }
    }
  };

  const handlePageChange = (page) => {
    if (page !== "...") {
      setCurrentPage(page);
    }
  };

  const handleAll = async () => {
    if (data?.data?.length === selectedItems?.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(data?.data);
    }
  };

  useEffect(() => {
    if (data?.data?.length > 0) {
      setTotalPages(data?.meta?.totalPages);
    }
  }, [data]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (e.target.search.value) {
      router.push(`/dashboard/overseer?search=${e.target.search.value}`);
    } else {
      router.push("/dashboard/overseer");
    }
  };

  const handleRemoveUsers = async (items = []) => {
    if (items?.length > 0) {
      const ids = await items?.map((item) => item?._id);
      const options = {
        data: { ids: ids },
      };

      const result = await removeUserByIds(options);
      if (result?.data?.success) {
        toast.success(result?.data?.message);
        setSelectedItems([]);
      } else {
        toast.error(result?.data?.message);
      }
    }
  };

  const handleSave = async () => {
    if (selectedItems?.length > 0) {
      const items = [];
      for (let i = 0; i < selectedItems.length; i++) {
        const item = selectedItems[i];
        const newItem = { _id: item?._id };
        if (role) {
          if (role === ROLE_DATA.BRAND || role === ROLE_DATA.ARTIST) {
            // if (!item?.name) {
            newItem["name"] = item?.username;
            // }
          }
          newItem["role"] = role;
        }
        if (status) {
          newItem["status"] = status;
        }
        if (verify === "Verified" || verify === "Unverified") {
          newItem["verified"] = verify === "Verified" ? true : false;
        }

        items.push(newItem);
      }

      if (items.length > 0) {
        const options = {
          data: {
            items: items,
          },
        };
        const result = await modifyUserInfo(options);
        setStatus("");
        setVerify("");
        setRole("");
        setSelectedItems([]);
        if (result?.data?.success) {
          toast.success("User info updated successfully");
        } else {
          toast.error("User info updated unSuccessfully");
        }
      }
    }
  };

  const selectedTotal = selectedItems?.length;
  useMemo(() => {
    if (selectedItems?.length === 0) {
      setStatus("");
      setVerify("");
      setRole("");
    }
  }, [selectedItems]);

  const isNeedUpdate = !!status || !!verify || !!role;

  return (
    <div className="bg-[#121212] h-full w-full pt-[22px] pr-[17px] pl-[16px] rounded-[10px] overflow-y-auto relative">
      <div className="flex justify-between items-start py-[15px] gap-[15px]">
        <div className="flex items-start gap-x-[40px] lg:gap-x-[80px] xl:gap-x-[175px] 2xl:gap-x-[175px] flex-grow">
          <h1 className="text-white font-bakbak-one text-[25px] text-nowrap">
            User Management
          </h1>
          <div className="w-full flex flex-col justify-start items-center max-w-[520px]">
            <form
              onSubmit={handleSearch}
              className="bg-[#D9D9D9] max-w-[490px] w-full h-[35px] rounded-[5px] px-[11px] flex justify-between items-center"
            >
              <div className="pr-[11px] flex justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                >
                  <circle
                    cx="6.875"
                    cy="6.875"
                    r="4.375"
                    stroke="#5A5A5A"
                    stroke-width="2"
                  />
                  <path
                    d="M12.5 12.5L10.625 10.625"
                    stroke="#5A5A5A"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>
              </div>
              <input
                name="search"
                type="text"
                placeholder="Search User"
                className="flex-grow w-full h-full bg-transparent font-lato text-[12px] text-[#5A5A5A] placeholder:text-[#5A5A5A] outline-none border-none"
              />
            </form>
            <div className="mt-[29px] w-full flex justify-center items-center gap-[35px]">
              <Popover placement="bottom">
                <PopoverHandler>
                  <Button
                    disabled={selectedTotal < 1}
                    className={`p-0 w-[88px] h-[36px] rounded-[5px] ${
                      selectedTotal > 0 ? "text-white" : "text-[#585858]"
                    }  !bg-[#232323] font-lato text-[15px] font-medium normal-case`}
                  >
                    {role ? role : "Role"}
                  </Button>
                </PopoverHandler>
                <PopoverContent className="w-[112px] h-[177px] rounded-[5px] py-[20px] flex flex-col justify-between items-center bg-[#232323] outline-none border-none shadow-none">
                  {roles.map((item, index) => (
                    <h1
                      key={index}
                      onClick={() => setRole(item)}
                      className="text-white hover:text-[#FDF516] font-lato text-[15px] font-medium cursor-pointer"
                    >
                      {item}
                    </h1>
                  ))}
                </PopoverContent>
              </Popover>
              <Popover>
                <PopoverHandler>
                  <Button
                    disabled={selectedTotal < 1}
                    className={`p-0 w-[88px] h-[36px] rounded-[5px] ${
                      selectedTotal > 0 ? "text-white" : "text-[#585858]"
                    } bg-[#232323] font-lato text-[15px] font-medium normal-case`}
                  >
                    {status ? status : "Status"}
                  </Button>
                </PopoverHandler>
                <PopoverContent className="w-[112px] h-[139px] rounded-[5px] py-[20px] flex flex-col justify-between items-center bg-[#232323] outline-none border-none shadow-none">
                  {["Active", "Suspended", "Banned"].map((item, index) => (
                    <h1
                      key={index}
                      onClick={() => setStatus(item)}
                      className="text-white hover:text-[#FDF516] font-lato text-[15px] font-medium cursor-pointer"
                    >
                      {item}
                    </h1>
                  ))}
                </PopoverContent>
              </Popover>
              <Popover placement="bottom">
                <PopoverHandler>
                  <Button
                    disabled={selectedTotal < 1}
                    className={`p-0 w-[88px] h-[36px] rounded-[5px] ${
                      selectedTotal > 0 ? "text-white" : "text-[#585858]"
                    } bg-[#232323] font-lato text-[15px] font-medium normal-case`}
                  >
                    {verify ? verify : "Unverified"}
                  </Button>
                </PopoverHandler>
                <PopoverContent className="w-[112px] h-fit rounded-[5px] py-[20px] flex flex-col gap-4 items-center bg-[#232323] outline-none border-none shadow-none">
                  <>
                    <h1
                      onClick={() => setVerify("Verified")}
                      className={`text-white hover:text-[#FDF516] font-lato text-[15px] font-medium cursor-pointer`}
                    >
                      Verified
                    </h1>
                    <h1
                      onClick={() => setVerify("Unverified")}
                      className={`text-white hover:text-[#FDF516] font-lato text-[15px] font-medium cursor-pointer`}
                    >
                      Unverified
                    </h1>
                  </>
                </PopoverContent>
              </Popover>
              <Button
                disabled={selectedTotal < 1}
                onClick={() => handleRemoveUsers(selectedItems)}
                className={`p-0 w-[88px] h-[36px] rounded-[5px] ${
                  selectedTotal > 0 ? "text-white" : "text-[#585858]"
                } font-lato text-[15px] font-medium normal-case flex justify-center items-center gap-2
                ${selectedItems?.length > 0 ? "bg-[#FF0000D4]" : "bg-[#232323]"}
                `}
              >
                {" "}
                {isLoading && (
                  <SpinnerCircularFixed
                    size={20}
                    thickness={180}
                    speed={300}
                    color="rgba(255, 255, 255, 1)"
                    secondaryColor="rgba(255, 255, 255, 0.42)"
                  />
                )}{" "}
                Delete
              </Button>
              <Button
                onClick={() => handleSave()}
                disabled={selectedTotal < 1 || !isNeedUpdate}
                className={`p-0 w-[88px] h-[36px] rounded-[5px] 
                    ${
                      selectedTotal < 1 || !isNeedUpdate
                        ? "text-[#585858] bg-[#232323]"
                        : "text-black bg-[#8FFF00]"
                    } font-lato text-[15px] font-medium normal-case
                `}
              >
                {modifyLoading ? "Saving..." : "Save"}
              </Button>
            </div>
          </div>
        </div>
        <Button
          onClick={() => setOpen(true)}
          className="p-0 max-w-[93px] min-w-[93px] h-[35px] rounded-[5px] text-[#000000] bg-[#8FFF00] font-lato text-[12px] font-medium normal-case"
        >
          Add User
        </Button>
      </div>
      {selectedItems?.length > 0 ? (
        <h1 className="font-lato text-[15px] font-medium text-white">
          {selectedItems?.length} Selected
        </h1>
      ) : (
        <h1 className="font-lato text-[15px] font-medium text-white opacity-0">
          Selected
        </h1>
      )}
      <div className="flex flex-col justify-between mt-[11px] w-full h-full max-h-[72vh]">
        <div className="relative w-full flex-grow h-full">
          <div className="h-[42px] bg-[#232323] text-left flex items-center w-full">
            <div className="text-white font-lato text-[15px] h-[42px] max-w-[50px] min-w-[50px] flex justify-center items-center font-medium mt-[7px]">
              <div onClick={() => handleAll()} className="cursor-pointer">
                {data?.data?.length === selectedItems?.length
                  ? iDashSelected
                  : iDashUnselected}
              </div>
            </div>
            {headers.map((item, index) => (
              <th
                key={index}
                className={`text-white font-lato text-[15px] font-medium text-left text-nowrap ${item?.styles}`}
              >
                <h1 className="oneLine">{item?.name}</h1>
              </th>
            ))}
          </div>
          {userLoading && (
            <div className="h-full">
              <Loading />
            </div>
          )}

          {data?.data?.length > 0 && !userLoading && (
            <div className="w-full max-h-full overflow-y-auto">
              <>
                {data?.data?.map((item, index) => (
                  <UsersTableRow
                    key={index}
                    data={item}
                    selectedItems={selectedItems}
                    handleSelect={handleSelect}
                    handleRemoveUsers={handleRemoveUsers}
                  />
                ))}
              </>
            </div>
          )}
        </div>
        <div className="flex justify-between items-center pl-[32px] w-full min-h-[42px] max-h-[42px] !bg-[#121212] z-50">
          <h1 className="font-lato text-[15px] font-medium text-[#454545]">
            Showing{" "}
            {currentPage * data?.meta?.limit > data?.meta?.total
              ? data?.meta?.total
              : currentPage * data?.meta?.limit}{" "}
            of {data?.meta?.total}
          </h1>
          <UsersPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
          <span></span>
        </div>
      </div>

      <AddUserModal open={open} setOpen={setOpen} />
    </div>
  );
};

export default DashboardPrivateRoute(
  [ROLE_DATA.ADMIN, ROLE_DATA.MOD],
  Overseer,
  DashboardLayout
);
