import React from "react";
import axios from "axios";
import useAsync from "./useAsync";


async function getUser(id) {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/users/${id}`
  )
  return response.data;
}

function User({ id }) {
  const [state] = useAsync(() => getUser(id), [id])  // deps 에 id 를 넣어 id가 바뀔때마다 재호출 되도록 함
  const { loading, data: user, error } = state;

  if (loading) return <div>로딩중...</div>
  if (error) return <div>에러가 발생했습니다</div>
  if (!user) return null

  return (
    <div>
      <h2>{user.username}</h2>
      <p>
        <b>Email:</b> {user.email}
      </p>
    </div>
  )
}


export default User;