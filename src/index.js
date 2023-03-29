import React from "react";

import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { resolvers, typeDefs } from "./graphql/resolvers";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";

import { store, persistor } from "./redux/store";

import "./index.css";
import App from "./App";

const httpLink = createHttpLink({
  uri: "https://crwn-clothing.com",
});
const cache = new InMemoryCache();
const client = new ApolloClient({
  link: httpLink,
  cache,
  resolvers,
  typeDefs,
});

client.writeData({
  data: {
    cartHidden: true,
  },
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <BrowserRouter>
        <PersistGate persistor={persistor} />
        <App />
      </BrowserRouter>
    </Provider>
  </ApolloProvider>,
  document.getElementById("root")
);
