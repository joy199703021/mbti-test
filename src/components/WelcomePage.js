import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Card,
  CardContent,
  Grid,
  Avatar,
  Fade,
  useTheme
} from '@mui/material';
import {
  Psychology,
  EmojiEmotions,
  Work,
  Favorite,
  ArrowForward,
  Stars,
  School,
  Groups
} from '@mui/icons-material';

const WelcomePage = ({ onStartTest }) => {
  const theme = useTheme();
  const [name, setName] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  const features = [
    {
      icon: <Psychology fontSize="large" />,
      title: '认识自我',
      description: '了解你的MBTI性格类型，发现独特的自己！',
      color: '#FF6B6B'
    },
    {
      icon: <Work fontSize="large" />,
      title: '职业发展',
      description: '探索最适合你性格的职业方向',
      color: '#4ECDC4'
    },
    {
      icon: <Groups fontSize="large" />,
      title: '人际关系',
      description: '提升沟通技巧，建立更好的人际关系',
      color: '#45B7D1'
    },
    {
      icon: <School fontSize="large" />,
      title: '个人成长',
      description: '发掘潜能，找到适合的发展方向',
      color: '#96CEB4'
    }
  ];

  const handleStart = () => {
    if (name.trim()) {
      onStartTest(name);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #FFE5E5 0%, #E8F5FF 100%)',
        py: 4,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* 装饰背景 */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.4,
          background: `
            radial-gradient(circle at 20% 20%, rgba(255, 107, 107, 0.1) 0%, transparent 20%),
            radial-gradient(circle at 80% 50%, rgba(78, 205, 196, 0.1) 0%, transparent 20%),
            radial-gradient(circle at 40% 80%, rgba(150, 206, 180, 0.1) 0%, transparent 20%)
          `,
          zIndex: 0
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={4} alignItems="center" justifyContent="center">
          {/* 左侧欢迎内容 */}
          <Grid item xs={12} md={6}>
            <Fade in timeout={1000}>
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Stars sx={{ fontSize: 40, color: '#FFB400', mr: 2 }} />
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: 'bold',
                      background: 'linear-gradient(45deg, #2E3A59, #4A90E2)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }}
                  >
                    MBTI性格测试
                  </Typography>
                </Box>

                <Typography
                  variant="h5"
                  sx={{
                    mb: 3,
                    color: 'text.secondary',
                    lineHeight: 1.6
                  }}
                >
                  Hi! 想知道自己是什么性格类型吗？
                  <br />
                  让我们一起探索你的性格特质，发现更好的自己！
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    mb: 4,
                    color: 'text.secondary',
                    fontSize: '1.1rem'
                  }}
                >
                  通过科学的MBTI测试，了解你的性格类型、职业倾向、人际关系和个人发展方向。
                </Typography>
              </Box>
            </Fade>
          </Grid>

          {/* 右侧开始测试卡片 */}
          <Grid item xs={12} md={6}>
            <Fade in timeout={1000}>
              <Card
                elevation={3}
                sx={{
                  p: 4,
                  borderRadius: 4,
                  background: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>
                  开始探索之旅
                </Typography>
                <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
                  让我们一起来了解独特的你吧！
                </Typography>

                <TextField
                  fullWidth
                  label="你的名字是？"
                  variant="outlined"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  sx={{ mb: 3 }}
                />

                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  onClick={handleStart}
                  endIcon={<ArrowForward />}
                  sx={{
                    py: 1.5,
                    borderRadius: 2,
                    background: 'linear-gradient(45deg, #4A90E2 30%, #45B7D1 90%)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #357ABD 30%, #3CA1B9 90%)'
                    }
                  }}
                >
                  开始测试
                </Button>

                <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary', textAlign: 'center' }}>
                  🕒 大约需要10-15分钟，让我们一起来玩吧！
                </Typography>
              </Card>
            </Fade>
          </Grid>

          {/* 特性介绍 */}
          <Grid item xs={12}>
            <Grid container spacing={3} sx={{ mt: 4 }}>
              {features.map((feature, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Fade in timeout={1000 + index * 200}>
                    <Card
                      sx={{
                        height: '100%',
                        borderRadius: 3,
                        transition: 'transform 0.3s ease-in-out',
                        '&:hover': {
                          transform: 'translateY(-8px)'
                        }
                      }}
                    >
                      <CardContent sx={{ textAlign: 'center', p: 3 }}>
                        <Avatar
                          sx={{
                            width: 60,
                            height: 60,
                            bgcolor: feature.color,
                            mx: 'auto',
                            mb: 2
                          }}
                        >
                          {feature.icon}
                        </Avatar>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                          {feature.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {feature.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Fade>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
      {/* 添加版权信息 */}
      <Box sx={{ 
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        textAlign: 'center',
        py: 2,
        bgcolor: 'rgba(255,255,255,0.9)',
        borderTop: '1px solid rgba(0,0,0,0.1)'
      }}>
        <Typography variant="body2" color="text.secondary">
          {new Date().getFullYear()} 小白屋 | 联系微信：Joy10241128
        </Typography>
      </Box>
    </Box>
  );
};

export default WelcomePage;
