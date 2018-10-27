import React, { Suspense, Fragment, memo } from "react";
import { createCache, createResource } from "simple-cache-provider";

const cache = createCache();

const createFetcher = callback => {
  const resource = createResource(callback);
  return {
    read: () => resource.read(cache)
  };
};

const Fetcher = createFetcher(() =>
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
