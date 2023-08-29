/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-props-no-spreading */
import {
  createContext, useContext, useMemo, useState,
} from 'react';
import { IPropChild } from './types';

interface IStore {
  key: string; // 多个store，key 类似命名空间
  store: Record<string, any>;
  setStore: (payload: Record<string, unknown>) => void;
}

const getCtxProvider = (
  key: string,
  defaultValue: Record<string, unknown>,
  AppContext: React.Context<IStore>,
) => ({ children }: IPropChild) => {
  const [store, setStore] = useState(defaultValue);

  const value = useMemo(() => ({
    key, store, setStore,
  }), [store]);

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

const ctxCatch: Record<string, Ctx> = {};

class Ctx {
  defaultStore: IStore;

  AppContext: React.Context<IStore>;

  Provider: ({ children }: IPropChild)=> JSX.Element;

  constructor(key: string, defaultValue: Record<string, unknown>) {
    this.defaultStore = {
      key,
      store: defaultValue,
      setStore: () => {},
    };
    this.AppContext = createContext(this.defaultStore);
    this.Provider = getCtxProvider(key, defaultValue, this.AppContext);
    ctxCatch[key] = this;
  }
}

/**
 *  获取指定的Context，对组件状态进行操控
 * @param key
 * @returns  return{store，setStore};
 */
export const useAppContext = (key:string) => {
  const ctx = ctxCatch[key];
  const app = useContext(ctx.AppContext);

  return {
    store: app.store,
    setStore: app.setStore,
  };
};

/**
 * 创建一个将特定的context提供给其子组件(jsx组件)
 * @param key
 * @param defaultValue
 * @returns  JSX.Element  返回的是JSX组件
 */
export const connectFactory = (
  key:string,
  defaultValue: Record<string, unknown>,
) => {
  const ctx = ctxCatch[key];
  let CurCtx: Ctx;

  if (ctx) {
    CurCtx = ctx;
  } else {
    CurCtx = new Ctx(key, defaultValue);
  }

  // 用()包裹这里注意最后返回的是一个jsx组件
  return (Child: React.FunctionComponent<any>) => (props: any) => (
    <CurCtx.Provider>
      <Child {...props} />
    </CurCtx.Provider>
  );
};
