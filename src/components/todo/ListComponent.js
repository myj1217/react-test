import { useEffect, useState } from "react";
import { getList } from "../../api/todoApi";
import useCustomMove from "../../hooks/useCustomMove";
import PageComponent from "../common/PageComponent";

const initState = {
  dtoList: [],
  pageNumList: [],
  pageRequestDTO: null,
  prev: false,
  next: false,
  totalCount: 0,
  prevPage: 0,
  nextPage: 0,
  totalPage: 0,
  current: 0,
};

const ListComponent = () => {
  const { page, size, moveToList, refresh, moveToRead } = useCustomMove();
  const [serverData, setServerData] = useState(initState);

  useEffect(() => {
    getList({ page, size }).then((data) => {
      console.log(data);
      setServerData(data);
    });
  }, [page, size, refresh]);

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white rounded-lg shadow-lg">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800">게시글</h2>
        <div className="mt-6">
          {serverData.dtoList.map((todo) => (
            <div
              key={todo.tno}
              className="flex items-center p-4 bg-gray-100 rounded-md hover:bg-blue-100 cursor-pointer mb-4 transition duration-300 ease-in-out"
              onClick={() => moveToRead(todo.tno)}
            >
              <div className="text-lg font-semibold flex-grow">
                {todo.title}
              </div>
              <div className="ml-4 text-gray-600">{todo.dueDate}</div>
              <div className="text-sm font-medium text-gray-500">
                #{todo.tno}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-gray-50 p-4 rounded-b-lg">
        <PageComponent
          serverData={serverData}
          movePage={moveToList}
        ></PageComponent>
      </div>
    </div>
  );
};

export default ListComponent;
