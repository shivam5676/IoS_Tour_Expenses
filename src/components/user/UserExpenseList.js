import React, { useContext, useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import AddExpenseModal from "./AddExpenseModal";
import Context from "../../store/Context";
import AddtourDescriptionModal from "./AddtourDescription";
import { FaPenSquare } from "react-icons/fa";
import { RiDeleteBin2Fill } from "react-icons/ri";
import axios from "axios";
import { toast } from "react-toastify";

function UserExpenseList(props) {
  const [open, setOpen] = useState(false);
  const [openDescription, setOpenDescription] = useState(false);
  const connectionUrl = process.env.REACT_APP_CONNECTION_STRING;
  const user = JSON.parse(localStorage.getItem("token"));

  const ctx = useContext(Context);
  console.log(ctx.userCurrentTourExpenseData);
  const deleteExpenseHAndler = async (id) => {
    try {
      const response = await axios.post(`${connectionUrl}:${process.env.REACT_APP_BACKEND_PORT}/user/deleteExpense`, {
        expenseId: id,
        token: user.access_token,
        domain: user.domain,
      });
      ctx.deleteUserCurrentTourExpenseHandler(id);
      toast.success("expense deleted successfully");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <AddtourDescriptionModal
        open={openDescription}
        close={() => {
          setOpenDescription(false);
          props.removeOnGoingTour();
        }}
      ></AddtourDescriptionModal>
      <AddExpenseModal
        open={open}
        onClose={() => {
          setOpen(!open);
        }}
      ></AddExpenseModal>
      <div className="shadow-md shadow-gray-700 w-[100%] min-h-[250px] h-[40vh]  bg-white m-2 rounded-lg">
        <div className=" p-2 font-bold text-2xl flex justify-between rounded-t-lg text-white bg-[#2fc7f8] font-sans">
          <p> Expenses List</p>
          <p
            className="rounded-md cursor-pointer text-sm px-4 flex items-center bg-white text-black font-bold hover:bg-gray-300"
            onClick={() => setOpenDescription(true)}
          >
            submit
          </p>
          <p
            className="border-2 text-sm pe-4 flex items-center cursor-pointer"
            onClick={() => setOpen(!open)}
          >
            <FaPenSquare className="w-[25px] h-[25px] mx-2 " />
            Add
          </p>
        </div>{" "}
        {ctx.userCurrentTourExpenseData.length == 0 && (
          <>
            <div className="w-[100%] h-[calc(40vh-90px)] min-h-[calc(250px-90px)] text-black flex justify-center items-center flex-col">
              {/* <img src={pendingGif} className="h-[80px]" draggable={false}></img> */}
              <p className="font-bold">
                No Expenses ....plz add some expenses{" "}
              </p>
            </div>
          </>
        )}
        {ctx.userCurrentTourExpenseData.length > 0 && (
          <>
            <div className="w-[100%]">
              <div className="mx-2 bg-white text-black flex h-[40px] font-bold items-center border-b-2">
                <p className="w-[30%] px-1">Description</p>
                <p className="w-[20%] px-1">Category</p>
                <p className="w-[25%] px-1">Amount</p>
                <p className="w-[20%] px-1">Date</p>
                <p className="w-[15%] px-1 text-center"></p>
              </div>
            </div>
            <div className="w-[100%]  h-[calc(40vh-110px)] overflow-y-auto">
              {ctx.userCurrentTourExpenseData.map((current) => {
                console.log(current);
                return (
                  <div className="mx-2 bg-white text-black flex py-1 text-[.8rem] font-semibold">
                    <p className="w-[30%] px-1 overflow-hidden whitespace-nowrap overflow-ellipsis">
                      {current.description}
                    </p>
                    <p className="w-[20%] px-1 overflow-hidden whitespace-nowrap overflow-ellipsis">
                      {current.expenseType}{" "}
                    </p>
                    <p className="w-[25%] px-1 overflow-hidden whitespace-nowrap overflow-ellipsis">
                      {current.Amount}
                    </p>
                    <p className="w-[20%] px-1 overflow-hidden whitespace-nowrap overflow-ellipsis">
                      {current.date}{" "}
                    </p>
                    <div className="w-[15%] px-1 overflow-hidden whitespace-nowrap overflow-ellipsis flex ">
                      {/* <p className="bg-blue-300 text-white font-bold text-center rounded hover:bg-blue-500">
                        {" "}
                        View
                      </p> */}
                      <p className="bg-blue-500 text-white font-bold text-center rounded hover:bg-blue-600 p-1 cursor-pointer">
                        View
                      </p>
                      <div>
                        <RiDeleteBin2Fill
                          className="w-[25px] h-[25px] mx-2 text-red-500 hover:text-red-700 cursor-pointer"
                          onClick={() => {
                            deleteExpenseHAndler(current.id);
                          }}
                        ></RiDeleteBin2Fill>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default UserExpenseList;
