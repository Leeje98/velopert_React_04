import React, { useEffect, useReducer } from "react";
import axios from "axios";
import useAsync from "./useAsync";


// useAsync 에서는 Promise 의 결과를 바로 data 에 담기 때문에 요청을 한 이후 response에서 data 추출하여 반환하는 함수를 따로 만듬
async function getUsers() {
  const response = await axios.get(
    'https://jsonplaceholder.typicode.com/users'
  )
  return response.data;
}

function Users() {
  const [state, refetch] = useAsync(getUsers, [])

  const { loading, data: users, error } = state; // state.data 를 users 키워드로 조회

  if (loading) return <div>로딩중...</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!users) return null;

  return (
    <>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.username} ({user.name})
          </li>
        ))}
      </ul>
      <button onClick={refetch}>다시 불러오기</button>
    </>
  );
}

export default Users;


// useReducer 로 구현했을 때의 장점은 useState 의 setState 함수를 여러번 사용하지 않아도 된다는점과, 
// 리듀서로 로직을 분리했으니 다른곳에서도 쉽게 재사용을 할 수 있다는 점 입니다.

// 물론, 취향에 따라 useState 로 구현을 해도 무방합니다.
