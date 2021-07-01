import React, { useState, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import Container from '@material-ui/core/Container';
import Form from './Form';
import TableData from './TableData';

const MainScreen = () => {
  const [responseData, setResponseData] = useState({})
  const [formView, setFormView] = useState(true);

  const switchView = useCallback(() => {
    setFormView(!formView);
  }, [setFormView, formView]);

  const onSaveResponseData = useCallback((data) => {
    setResponseData(data)
  }, [setResponseData]);

  const FormView = useMemo(() =>
    formView && <Form onSaveResponseData={onSaveResponseData} switchView={switchView} />
  , [formView, onSaveResponseData, switchView]);

  const TableView = useMemo(() =>
    !formView && <TableData responseData={responseData} switchView={switchView} />
  , [formView, switchView, responseData]);

  return (
    <Application>
      {FormView}
      {TableView}
    </Application>
  )
}

export default MainScreen;

const Application = styled(Container)`
  display: flex;
  background-color: #eee;
  border-radius: 4px;
  padding-top: 2rem;
  height: 100vh;
`;
