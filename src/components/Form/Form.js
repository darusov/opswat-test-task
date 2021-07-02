import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import { formatBytes } from '../../utils/formatBytes';
import { msToMinutesAndSeconds } from '../../utils/parseTime';
import { api } from '../../utils/constants';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const Form = ({ onSaveResponseData, switchView }) => {
  const [endpoint, setEndpoint] = useState('hash');
  const [apiKey, setApiKey] = useState('87924b41f615554eeb367230b4f0cbbe');
  const [fileHash, setFileHash] = useState('6D91B2F134D8D8D955F6BFC024A5D2B6CFE6BB36C4AE0E65BA33DAB2D2E5C529');
  const [isApiValid, setIsApiValid] = useState(true);
  const classes = useStyles();

  const onEndpointChange = useCallback((event) => {
    setEndpoint(event.target.value);
  }, [setEndpoint]);

  const onApiKeyChange = useCallback((event) => {
    if (!isApiValid) {
      setIsApiValid(true);
    }
    setApiKey(event.target.value);
  }, [setApiKey, setIsApiValid, isApiValid]);

  const onFileHashChange = useCallback((event) => {
    setFileHash(event.target.value);
  }, [setFileHash]);

  
  const onSearch = useCallback(async () => {
    
    const apiKeyStatus = await fetch(api + new URLSearchParams({
      apiKey,
      endpoint,
      fileHash,
    })).then((data) => data.json());

    if (!apiKeyStatus.error) {
      const {
        file_info: {
          file_size,
          md5,
          sha1,
          sha256,
          upload_timestamp,
          file_type_extension,
          file_type_category,
        },
        scan_results: {
          start_time,
          total_time,
        }
      } = apiKeyStatus;

      onSaveResponseData({
        sha256,
        sha1,
        md5,
        'Uploaded time': moment(upload_timestamp).format('Do MMM YYYY HH:mm:ss'),
        'Scanned time (started time)': moment(start_time).format('Do MMM YYYY HH:mm:ss'),
        'Scan Duration': msToMinutesAndSeconds(total_time),
        'File type': file_type_category,
        'File extension': file_type_extension,
        'File size': formatBytes(file_size),
      })
      switchView();
    } else {
      setIsApiValid(false);
    }
  }, [apiKey, endpoint, fileHash, onSaveResponseData, switchView]);

  return (
    <>
      <form className={classes.root} noValidate autoComplete="off">
        <FormControl>
          <InputLabel htmlFor="component-simple">REST API Endpoint</InputLabel>
          <Input id="component-simple" value={endpoint} onChange={onEndpointChange} />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="component-simple" error={!isApiValid}>REST API Apikey</InputLabel>
          <Input id="component-simple" value={apiKey} onChange={onApiKeyChange} />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="component-simple">File Hash string</InputLabel>
          <Input id="component-simple" value={fileHash} onChange={onFileHashChange} />
        </FormControl>
        <StyledButton variant="contained" color="primary" disabled={!(endpoint && apiKey && fileHash && isApiValid)} onClick={onSearch}>
          Search
        </StyledButton>
      </form>
      {!isApiValid && <WarningMsg>Api key in not valid, please try another one</WarningMsg>}
    </>
  );
}

export default Form;

const StyledButton = styled(Button)`
  height: 50px;
`

const WarningMsg = styled('div')`
  color: red;

`