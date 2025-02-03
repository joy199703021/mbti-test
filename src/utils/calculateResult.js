import { questionGroups, dimensionMap, questions } from '../data/questions';

export function calculateResult(answers) {
  // 初始化得分
  const scores = {
    E: 0, I: 0,
    S: 0, N: 0,
    T: 0, F: 0,
    J: 0, P: 0
  };

  // 定义各维度对应的题号（索引从0开始，所以题号需要减1）
  const questionGroups = {
    EI: [0,4,8,12,16,20,24,28,32,36,40,44],  // 题号1,5,9,13,17,21,25,29,33,37,41,45
    SN: [1,5,9,13,17,21,25,29,33,37,41,45],  // 题号2,6,10,14,18,22,26,30,34,38,42,46
    TF: [2,6,10,14,18,22,26,30,34,38,42,46], // 题号3,7,11,15,19,23,27,31,35,39,43,47
    JP: [3,7,11,15,19,23,27,31,35,39,43,47]  // 题号4,8,12,16,20,24,28,32,36,40,44,48
  };

  // 计算每个维度的得分
  Object.entries(questionGroups).forEach(([dimension, questions]) => {
    questions.forEach(questionIndex => {
      const answer = answers[questionIndex];
      if (answer && typeof answer.A === 'number' && typeof answer.B === 'number') {
        switch(dimension) {
          case 'EI':
            scores.E += answer.A;
            scores.I += answer.B;
            break;
          case 'SN':
            scores.S += answer.A;
            scores.N += answer.B;
            break;
          case 'TF':
            scores.T += answer.A;
            scores.F += answer.B;
            break;
          case 'JP':
            scores.J += answer.A;
            scores.P += answer.B;
            break;
        }
      }
    });
  });

  // 确定最终类型
  const type = [
    scores.E > scores.I ? 'E' : 'I',
    scores.S > scores.N ? 'S' : 'N',
    scores.T > scores.F ? 'T' : 'F',
    scores.J > scores.P ? 'J' : 'P'
  ].join('');

  return {
    type,
    scores
  };
}

export function getPersonalityDescription(type) {
  const descriptions = {
    ISTJ: "严谨认真的检查者",
    ISFJ: "温暖细心的守护者",
    INFJ: "富有洞见的智者",
    INTJ: "独立自主的战略家",
    ISTP: "灵活多变的冒险家",
    ISFP: "敏感随和的艺术家",
    INFP: "理想主义的梦想家",
    INTP: "创新独特的思想家",
    ESTP: "活力四射的挑战者",
    ESFP: "热情开朗的表演者",
    ENFP: "充满激情的梦想家",
    ENTP: "善于创新的发明家",
    ESTJ: "务实果断的管理者",
    ESFJ: "亲切友善的照顾者",
    ENFJ: "富有同理心的教导者",
    ENTJ: "果断坚定的领导者"
  };

  return descriptions[type] || "独特的性格组合";
}
