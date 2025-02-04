import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Card,
  CardContent,
  Grid,
  Divider,
  IconButton,
  Tooltip,
  LinearProgress,
  Zoom
} from '@mui/material';
import { Info as InfoIcon, Star, StarBorder, ArrowBack, ArrowForward } from '@mui/icons-material';
import { questions } from '../data/questions';

function TestPage({ onSubmit, userName }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [error, setError] = useState('');
  const [hoveredScore, setHoveredScore] = useState(null);

  const handleScoreSelect = (option, score) => {
    const otherOption = option === 'A' ? 'B' : 'A';
    const otherScore = 5 - score;
    
    const newAnswers = {
      ...answers,
      [currentQuestion]: {
        ...answers[currentQuestion],
        [option]: score,
        [otherOption]: otherScore
      }
    };
    
    setAnswers(newAnswers);
    setError('');

    // 检查总分是否为5，如果是则自动跳转
    const currentAnswer = newAnswers[currentQuestion];
    if (currentAnswer.A + currentAnswer.B === 5) {
      setTimeout(() => {
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
        } else {
          onSubmit(newAnswers);
        }
      }, 500); // 添加短暂延迟，让用户看到选择的效果
    }
  };

  const handleNext = () => {
    if (!answers[currentQuestion] || 
        !answers[currentQuestion].A || 
        !answers[currentQuestion].B ||
        answers[currentQuestion].A + answers[currentQuestion].B !== 5) {
      setError('请为A和B选项分配总计5颗星星哦！');
      return;
    }
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      onSubmit(answers);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const currentAnswer = answers[currentQuestion] || { A: null, B: null };
  const progress = (currentQuestion / questions.length) * 100;

  const renderStarRating = (option) => {
    const score = currentAnswer[option];
    const stars = [];
    
    for (let i = 0; i < 5; i++) {
      stars.push(
        <IconButton
          key={i}
          onClick={() => handleScoreSelect(option, i + 1)}
          onMouseEnter={() => setHoveredScore({ option, score: i + 1 })}
          onMouseLeave={() => setHoveredScore(null)}
          sx={{
            color: (hoveredScore?.option === option && i < hoveredScore.score) || i < (score || 0)
              ? '#FFB400'
              : '#E0E0E0',
            transform: (hoveredScore?.option === option && i < hoveredScore.score) || i < (score || 0)
              ? 'scale(1.2)'
              : 'scale(1)',
            transition: 'all 0.2s ease',
            '&:hover': {
              transform: 'scale(1.3)',
            }
          }}
        >
          {(hoveredScore?.option === option && i < hoveredScore.score) || i < (score || 0) 
            ? <Star fontSize="large" />
            : <StarBorder fontSize="large" />
          }
        </IconButton>
      );
    }
    return stars;
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: { xs: 2, md: 4 } }}>
      {/* 进度条 */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 3,
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ color: '#2E3A59', fontWeight: 600 }}>
            完成进度
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              ml: 'auto',
              color: progress === 100 ? '#4CAF50' : '#666'
            }}
          >
            {currentQuestion + 1} / {questions.length}
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: 10,
            borderRadius: 5,
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            '& .MuiLinearProgress-bar': {
              backgroundColor: progress === 100 ? '#4CAF50' : '#FFB400',
              borderRadius: 5
            }
          }}
        />
      </Paper>

      {/* 问题卡片 */}
      <Paper
        elevation={0}
        sx={{
          p: 4,
          borderRadius: 3,
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            color: '#2E3A59',
            fontWeight: 600,
            textAlign: 'center',
            mb: 4
          }}
        >
          第 {currentQuestion + 1} 题：{questions[currentQuestion].question}
        </Typography>

        {/* 选项A */}
        <Card
          elevation={0}
          sx={{
            mb: 3,
            borderRadius: 2,
            border: '1px solid rgba(0, 0, 0, 0.1)',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
            }
          }}
        >
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Typography
                variant="h6"
                sx={{
                  color: '#FF6B6B',
                  fontWeight: 600,
                  mr: 2
                }}
              >
                选项 A
              </Typography>
              <Typography variant="body1" sx={{ color: '#666', flex: 1 }}>
                {questions[currentQuestion].optionA}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              {renderStarRating('A')}
            </Box>
          </CardContent>
        </Card>

        {/* 选项B */}
        <Card
          elevation={0}
          sx={{
            mb: 3,
            borderRadius: 2,
            border: '1px solid rgba(0, 0, 0, 0.1)',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
            }
          }}
        >
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Typography
                variant="h6"
                sx={{
                  color: '#4ECDC4',
                  fontWeight: 600,
                  mr: 2
                }}
              >
                选项 B
              </Typography>
              <Typography variant="body1" sx={{ color: '#666', flex: 1 }}>
                {questions[currentQuestion].optionB}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              {renderStarRating('B')}
            </Box>
          </CardContent>
        </Card>

        {/* 错误提示 */}
        {error && (
          <Typography
            color="error"
            sx={{
              textAlign: 'center',
              mb: 2,
              animation: 'shake 0.5s'
            }}
          >
            {error}
          </Typography>
        )}

        {/* 导航按钮 */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            mt: 4
          }}
        >
          <Button
            variant="outlined"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            startIcon={<ArrowBack />}
            sx={{
              borderRadius: 2,
              color: '#666',
              borderColor: '#666',
              '&:hover': {
                borderColor: '#2E3A59',
                color: '#2E3A59'
              }
            }}
          >
            上一题
          </Button>
          <Button
            variant="contained"
            onClick={handleNext}
            endIcon={currentQuestion < questions.length - 1 ? <ArrowForward /> : null}
            sx={{
              borderRadius: 2,
              bgcolor: '#FFB400',
              '&:hover': {
                bgcolor: '#FF9800'
              }
            }}
          >
            {currentQuestion < questions.length - 1 ? '下一题' : '完成测试'}
          </Button>
        </Box>
      </Paper>
      {/* 添加版权信息 */}
      <Box sx={{ 
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        textAlign: 'center',
        py: 2,
        bgcolor: 'rgba(255,255,255,0.9)',
        borderTop: '1px solid rgba(0,0,0,0.1)',
        zIndex: 1000
      }}>
        <Typography variant="body2" color="text.secondary">
          {new Date().getFullYear()} 小白屋 | 联系微信：Joy10241128
        </Typography>
      </Box>
    </Box>
  );
}

export default TestPage;
