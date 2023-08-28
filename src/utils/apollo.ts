import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { AUTH_TOKEN } from './constants';

const httpLink = createHttpLink({ uri: 'http://localhost:3000/graphql' });
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(AUTH_TOKEN);
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
});
// 创建一个 Apollo 客户端实例
export const client = new ApolloClient({
  // uri: 'http://localhost:3000/graphql', // 设置 GraphQL 服务器的地址
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(), // 设置缓存，这里使用了 InMemoryCache 内存缓存
});
