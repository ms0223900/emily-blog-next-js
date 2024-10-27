import { ApolloClient, InMemoryCache } from "@apollo/client";
import { API_URL } from "@/mapper/config";

const client = new ApolloClient({
  uri: `${API_URL}/graphql`,
  cache: new InMemoryCache(),
});

export default client;
