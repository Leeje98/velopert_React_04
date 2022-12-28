import React from "react";
import axios from "axios";
import { useAsync } from "react-async"; // 라이브러리 사용시 로딩중... 만 뜨는 상황발생 react 18 버전 오차인듯함 index.js 파일의 <React.StrictMode>태그 주석처리하면 해결됨
 


async function getUser({ id }) {    // useAsync 를 사용할 때에는 프로미스를 반환하는 함수의 파라미터를 객체형태로 해주어야 한다
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/users/${id}`
  );
  return response.data;
}

function User({ id }) {
  const { data: user, error, isLoading } = useAsync({
    promiseFn: getUser,
    id,
    watch: id
  });

  if (isLoading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!user) return null;

  return (
    <div>
      <h2>{user.username}</h2>
      <p>
        <b>Email:</b> {user.email}
      </p>
    </div>
  );
}

export default User;