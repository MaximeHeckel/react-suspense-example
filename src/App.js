import React, { Suspense, Fragment, memo } from "react";
import { unstable_createResource } from "react-cache";

const Fetcher = unstable_createResource(() =>
  fetch("https://jsonplaceholder.typicode.com/todos").then(r => r.json())
);

const List = () => {
  const data = Fetcher.read();
  return (
    <ul>
      {data.map(item => (
        <li style={{ listStyle: "none" }} key={item.id}>
          {item.title}
        </li>
      ))}
    </ul>
  );
};

const App = () => (
  <Fragment>
    <h2 style={{ textAlign: "center" }}>{`React: ${React.version} Demo`}</h2>
    <Suspense fallback={<div>Loading...</div>}>
      <List />
    </Suspense>
  </Fragment>
);

const MemoApp = memo(App);

export default MemoApp;
