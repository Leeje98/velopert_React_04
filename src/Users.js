import React, { useState } from 'react';
import axios from 'axios';
import { useAsync } from 'react-async';
import User from './User';


// useAsync 에서는 Promise 의 결과를 바로 data 에 담기 때문에,
// 요청을 한 이후 response 에서 data 추출하여 반환하는 함수를 따로 만듬
async function getUsers() {
  const response = await axios.get(
    'https://jsonplaceholder.typicode.com/users'
  );
  return response.data;
}

function Users() {
  const [userId, setUserId] = useState(null);

  // const [state, refetch] = useAsync(getUsers, [], true);  // 1. 배열 대신
  // const { data: users, error, isLoading, reload } = useAsync({  // 2. useAsync 를 사용할 때에는 프로미스를 반환하는 함수의 파라미터를 객체형태로  // 1. 렌더링 시 데이터 바로 호출
  const { data: users, error, isLoading, run } = useAsync({  // 2. 버튼을 눌러야 데이터 호출
    // promiseFn: getUsers
    deferFn: getUsers
  });

  if (isLoading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!users) return <button onClick={run}>불러오기</button>;
  return (
    <>
      <ul>
        {users.map(user => (
          <li
            key={user.id}
            onClick={() => setUserId(user.id)}
            style={{ cursor: 'pointer' }}
          >
            {user.username} ({user.name})
          </li>
        ))}
      </ul>
      {/* <button onClick={reload}>다시 불러오기</button>   // 1. 렌더링 시 데이터 바로 호출 */} 
      <button onClick={run}>다시 불러오기</button>  {/*  // 2. 버튼을 눌러야 데이터 호출 */}
      {userId && <User id={userId} />}
    </>
  );
}

export default Users;



// * 렌더링하는 시점이 아닌 사용자의 특정 인터랙션에 따라 API 를 호출하고 싶을 땐 promiseFn 대신 deferFn 을 사용하고, reload 대신 run 함수를 사용하면 된다