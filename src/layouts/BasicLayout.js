import React, { useContext, createContext, useReducer } from 'react';
import { Layout } from 'antd';
import Header from './Header';
import MainFooter from './Footer.js';
import { reducer, initialState } from '../share/context';

const { Content } = Layout;
export const Context = createContext(null);

function BasicLayout({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <React.Fragment>
      <Layout>
        <Context.Provider value={{ state, dispatch: dispatch }}>
          <Header/>
          <Content>
            {children}
          </Content>
          <MainFooter/>
        </Context.Provider>
      </Layout>
    </React.Fragment>);
}

export default BasicLayout;
