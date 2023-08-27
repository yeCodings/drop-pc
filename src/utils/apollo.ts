import { ApolloClient, InMemoryCache } from '@apollo/client';

// 创建一个 Apollo 客户端实例
export const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql', // 设置 GraphQL 服务器的地址
  cache: new InMemoryCache(), // 设置缓存，这里使用了 InMemoryCache 内存缓存
});
