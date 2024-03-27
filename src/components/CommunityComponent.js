import { useCallback, useEffect, useState } from "react";
import useCustomMove from "../hooks/useCustomMove";

import { API_SERVER_HOST } from "../api/todoApi";
import PageComponent from "./common/PageComponent";
import useCustomLogin from "../hooks/useCustomLogin";
import { comList } from "../api/communityApi";

const host = API_SERVER_HOST;

const initState = {
  dtoList: [],
  pageNumList: [],
  pageRequestDTO: null,
  prev: false,
  next: false,
  totoalCount: 0,
  prevPage: 0,
  nextPage: 0,
  totalPage: 0,
  current: 0,
};

const CommunityComponent = () => {
  const { exceptionHandle } = useCustomLogin();
  const { page, size, refresh, moveToList, moveToRead } = useCustomMove();

  //serverData는 나중에 사용
  const [serverData, setServerData] = useState(initState);

  useEffect(() => {

    comList({ page, size })
      .then((data) => {
        console.log(data);
        setServerData(data);
      })
      .catch((err) => exceptionHandle(err));
  }, [page, size, refresh]);

  return (
    <div className="border-2 border-gray-300 mt-10 mr-2 ml-2">

      <div className="flex flex-wrap mx-auto p-6">
        {serverData.dtoList.map((com) => (
          <div
            key={com.comBoardBno}
            className="w-1/2 p-1 rounded shadow-md border-2"
            onClick={() => moveToRead(com.comBoardBno)}
          >
            <div className="flex flex-col  h-full">
              <div className="font-extrabold text-2xl p-2 w-full ">
                {com.comBoardBno}
              </div>
              <div className="text-1xl m-1 p-2 w-full flex flex-col">
                <div className="w-full overflow-hidden ">
                  <img
                    alt="product"
                    className="m-auto rounded-md w-60"
                    src={`${host}/api/products/view/s_${com.imagePath[0]}`}
                  />
                </div>

                <div className="bottom-0 font-extrabold bg-white">
                  <div className="text-center p-1">{com.comBoardWriter}</div>
                
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <PageComponent
        serverData={serverData}
        movePage={moveToList}
      ></PageComponent>
    </div>
  );
};

export default CommunityComponent;
