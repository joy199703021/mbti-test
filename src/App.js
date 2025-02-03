import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, Box } from '@mui/material';
import WelcomePage from './components/WelcomePage';
import TestPage from './components/TestPage';
import ResultPage from './components/ResultPage';
import { calculateResult } from './utils/calculateResult';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#f50057',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
});

function App() {
  const [currentPage, setCurrentPage] = useState('welcome');
  const [testResult, setTestResult] = useState(null);
  const [userName, setUserName] = useState('');
  const [answers, setAnswers] = useState({});

  const handleStartTest = (name) => {
    setUserName(name);
    setCurrentPage('test');
  };

  const handleSubmitTest = (answers) => {
    setAnswers(answers);
    const result = calculateResult(answers);
    setTestResult(result);
    setCurrentPage('result');
  };

  const handleReturnHome = () => {
    setCurrentPage('welcome');
    setTestResult(null);
    setUserName('');
    setAnswers({});
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md">
        <Box sx={{ minHeight: '100vh', py: 4 }}>
          {currentPage === 'welcome' && (
            <WelcomePage onStartTest={handleStartTest} />
          )}
          {currentPage === 'test' && (
            <TestPage onSubmit={handleSubmitTest} userName={userName} />
          )}
          {currentPage === 'result' && (
            <ResultPage result={answers} userName={userName} onReturnHome={handleReturnHome} />
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
