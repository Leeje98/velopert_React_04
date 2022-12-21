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
  const [state] = useAsync(() => getUser(id), [id])
  // useAsync 를 사용 할 때, 파라미터를 포함시켜서 함수를 호출하는 새로운 함수 등록
  // id 가 바뀔 때 마다 재호출 되도록 deps 에 id
  const { loading, data: user, error } = state
  
  if (loading) return <div>내용을 불러오는 중...</div>
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