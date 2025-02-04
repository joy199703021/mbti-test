import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import {
  Box,
  Typography,
  Paper,
  Container,
  Grid,
  Card,
  CardContent,
  Button,
  alpha,
  useTheme,
  Chip,
  Avatar
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Psychology,
  Star,
  TrendingUp,
  WorkOutline,
  EmojiObjects,
  Download,
  RestartAlt
} from '@mui/icons-material';

// MBTI性格类型详细描述
const personalityDescriptions = {
  ISTJ: {
    title: "内向感觉思考判断型 (ISTJ)",
    brief: "认真的，安静的，通过专心和投入来获得成功。实践的，传统的，实事求是的，合乎逻辑的，现实的，可靠的。注意事情的组织性。负责。下决心做某事就会稳定地工作，而不会抗议或分心。",
    characteristics: [
      "实际的，敏感的，现实的",
      "有系统有组织的",
      "逻辑性的，分析性的",
      "公正的，通情达理的",
      "冷静的，自制的，严肃的",
      "一致的，有序的",
      "传统的价值判断",
      "对数字和事实有很强的记忆力",
      "做事负责，不辞劳苦",
      "对细节和过程精心谨慎"
    ],
    strengths: [
      "对责任有强烈的感情",
      "注重组织和计划",
      "可以克服一切困难完成任务",
      "善于独立工作并对结果负责",
      "现实的判断力强",
      "做事稳定有条理",
      "对过程和细节的把控能力强",
      "工作态度认真负责",
      "具有很强的逻辑分析能力",
      "可靠且值得信赖"
    ],
    careers: [
      "会计师",
      "工程师",
      "律师",
      "项目经理",
      "建筑师",
      "电影制片",
      "卫生健康管理",
      "行政管理",
      "质量监督",
      "系统分析师"
    ],
    growth: [
      "尝试接受新的想法和方法",
      "多关注他人的情感需求",
      "培养创新思维",
      "保持灵活性",
      "避免过于墨守成规",
      "学会表达感激之情",
      "注意培养耐心",
      "关注问题的更广泛影响",
      "平衡工作与生活",
      "提高对新技术的适应能力"
    ],
    description: "ISTJ型的人对责任有强烈的感情，对生活中的组织、家庭和人际关系非常重视。他们用稳定的能量工作来固定、按时地履行义务。他们几乎可以克服一切困难去完成必要的事情。他们喜欢独自工作并对结果负责，但在团队中也能很好地完成明确的任务。"
  },
  ISFJ: {
    title: "内向感觉情感判断型 (ISFJ)",
    brief: "安静，友好，可靠，尽责的。尽心尽责地工作。在任何计划或团队中都比较稳定。彻底，刻苦，精确。他们的兴趣通常不是技术性的。能够对必要的细节保持耐心。忠诚，考虑周到，观察入微，关心他人的感受。",
    characteristics: [
      "实际的，现实的",
      "具体的，确切的",
      "合作的，为他人着想",
      "善良的，敏感的",
      "沉默、严肃和正直的",
      "体谅的，优秀的看护者",
      "致力于荣誉，保留传统",
      "友好而富有同情心",
      "机敏而真诚",
      "对细节有耐心"
    ],
    strengths: [
      "可信赖和体谅他人",
      "忠实于执行责任",
      "能克服困难完成任务",
      "关注他人需求",
      "建立有秩序的工作流程",
      "观察细致入微",
      "工作认真负责",
      "热心接受职责",
      "实用而现实",
      "安排事情井井有条"
    ],
    careers: [
      "教师",
      "护士",
      "行政助理",
      "社工",
      "客户服务",
      "人事管理",
      "医疗保健",
      "幼儿教育",
      "图书管理",
      "办公室管理"
    ],
    growth: [
      "以积极态度看待未来",
      "学会直接表达观点",
      "适当展示自己的成就",
      "保持开放和灵活",
      "发展独断性",
      "培养创新思维",
      "注意工作与生活平衡",
      "学会说不",
      "接受变化",
      "关注自我需求"
    ],
    description: "ISFJ类型的人是可信赖的，体谅的，受人们和小组委托的，忠实于执行责任。他们用稳定的工作能量来按时完成义务。他们可以克服大量困难来完成必要的事情。ISFJ类型的人焦点集中在人们需要和想要些什么，他们会建立有秩序的过程来实现这些。他们认真地扮演角色，有责任感，并希望其他人也能如此。"
  },
  INFJ: {
    title: "内向直觉情感判断型 (INFJ)",
    brief: "由于坚定不移和创新而成功，希望做所需要或所希望的任何事。用最大的努力工作。相当有说服力，尽责，关心他人。可能会比较协调和遵循他们的敏锐的洞察力——对于如何最好地为公共利益服务。",
    characteristics: [
      "有洞察力的，创造性的",
      "概念的，象征的",
      "理想主义的，复杂的，深刻的",
      "敏感的，有同情心的",
      "对价值观有强烈责任感",
      "私人的，神秘的",
      "紧张的，独立的",
      "沉静而有力",
      "坚持原则",
      "富有创造力"
    ],
    strengths: [
      "对复杂问题有天赋的理解力",
      "能移情理解他人情感",
      "具有前瞻性思维",
      "追求意义和联结",
      "对价值观和社会事业忠实",
      "有说服力的领导能力",
      "创新和独创性强",
      "关注他人福祉",
      "思维深刻复杂",
      "追求卓越完美"
    ],
    careers: [
      "教育工作者",
      "心理咨询师",
      "作家",
      "艺术家",
      "研究员",
      "科学家",
      "社会工作者",
      "人力资源专家",
      "组织发展顾问",
      "宗教工作者"
    ],
    growth: [
      "发展政治机智",
      "学会果断决策",
      "给予建设性反馈",
      "保持开放和灵活",
      "学会放松",
      "注意实际细节",
      "平衡理想与现实",
      "接受不同观点",
      "培养表达能力",
      "避免过度完美主义"
    ],
    description: "INFJ型的人对直觉的理解复杂问题和人际关系有一种天赋。他们相信他们的直觉感知，通常能在其他人意识到之前，移情地理解他人的情感和感受。他们善于发展复杂的思维结构和对未来的洞察，能够将个人价值观与对他人的理解结合起来做出决策。"
  },
  INTP: {
    title: "内向直觉思考知觉型 (INTP)",
    brief: "安静，缄默的。特别喜欢理论或科学的追求。喜欢用逻辑和分析的方法来解决问题。对思想比较感兴趣，对聚会或闲聊不是很感兴趣。兴趣不多。需要那种能够体现强烈的兴趣的职业。",
    characteristics: [
      "逻辑的，分析的",
      "客观的，批判的",
      "独立的，沉默的",
      "精神敏捷的",
      "洞察力强的",
      "理论导向的",
      "重视智慧的",
      "追求真理的",
      "善于思考的",
      "注重系统的"
    ],
    strengths: [
      "强大的分析能力",
      "独立的问题解决能力",
      "创新思维",
      "理论构建能力",
      "逻辑推理能力",
      "抽象思维能力",
      "系统化思维",
      "客观判断力",
      "批判性思维",
      "概念性理解"
    ],
    careers: [
      "科学家",
      "程序员",
      "系统分析师",
      "建筑师",
      "工程师",
      "数学家",
      "研究员",
      "战略分析师",
      "哲学家",
      "技术专家"
    ],
    growth: [
      "关注实际细节",
      "发展执行能力",
      "简化表达方式",
      "培养情感表达",
      "加强人际交往",
      "提高沟通效率",
      "注意他人感受",
      "平衡理论与实践",
      "培养耐心",
      "发展团队协作"
    ],
    description: "INTP型的人是独立的问题解决者。他们在对一个想法或情景提供简明的、独立的分析方面表现出色。他们善于提出深刻的问题，通过与自己和他人的思维碰撞来发展新的逻辑方法。他们能迅速看出不协调和不符合逻辑的事，并自然地构建复杂的理论系统来解释所观察到的现实。"
  },
  ENFJ: {
    title: "外向直觉情感判断型 (ENFJ)",
    brief: "热情，富有同情心，敏感，有责任心。非常注重他人的感受，需求和动机。善于发现他人的潜能，并希望帮助他们实现。能够成为团队的催化剂，激发他人的积极性。忠诚，对赞扬和批评都很敏感。善于社交和促进他人的成长。",
    characteristics: [
      "富有同理心的，温暖的",
      "热情的，理想主义的",
      "善于表达的，外向的",
      "有组织能力的，果断的",
      "负责任的，可靠的",
      "善于激励的，有感染力的",
      "合作的，关心他人的",
      "善解人意的，体贴的",
      "有远见的，有洞察力的",
      "重视和谐的"
    ],
    strengths: [
      "领导能力强",
      "沟通能力出色",
      "激励他人能力强",
      "组织协调能力强",
      "同理心强",
      "人际关系能力强",
      "创造力强",
      "解决问题能力强",
      "团队建设能力强",
      "洞察力敏锐"
    ],
    careers: [
      "教育工作者",
      "心理咨询师",
      "人力资源专家",
      "培训师",
      "职业顾问",
      "市场营销",
      "公共关系",
      "非营利组织负责人",
      "组织发展顾问",
      "社会工作者"
    ],
    growth: [
      "学会照顾自己",
      "平衡理想与现实",
      "培养独立决策能力",
      "建立个人界限",
      "接受不完美",
      "处理负面反馈",
      "发展批判性思维",
      "控制情绪投入",
      "提高工作效率",
      "培养耐心"
    ],
    description: "ENFJ型的人善于理解和激励他人，能够敏锐地察觉他人的需求和潜能。他们是天生的领导者和教育者，善于创造积极的氛围，帮助他人实现个人成长。他们富有远见和理想主义精神，同时也具备实现这些理想的组织能力和行动力。他们在团队中能够发挥催化剂的作用，促进团队和谐与发展。"
  },
  ENTP: {
    title: "外向直觉思考知觉型 (ENTP)",
    brief: "敏捷，机灵，善于许多事情。激励同伴，警惕和坦率直言。可能争论一个问题的两个方面。善于解决新的有挑战性的问题，但可能忽视例行公事。易于改变兴趣。善于为他们想要的找到合理的原因。",
    characteristics: [
      "创造性的，有想象力的",
      "聪明的，善于推理的",
      "概念性思维强的",
      "好奇的，求知欲强的",
      "分析的，逻辑的",
      "理智的，客观的",
      "独断的，探询的",
      "独立的，自主的",
      "活泼的，热心的",
      "直率的，坦诚的"
    ],
    strengths: [
      "创新能力强",
      "分析能力强",
      "解决问题能力强",
      "适应力强",
      "战略思维出色",
      "领导能力强",
      "谈判能力强",
      "学习能力强",
      "创业精神强",
      "洞察力敏锐"
    ],
    careers: [
      "发明家",
      "科学家",
      "记者",
      "企业家",
      "律师",
      "咨询顾问",
      "系统分析师",
      "市场营销",
      "投资分析师",
      "创业者"
    ],
    growth: [
      "关注细节",
      "提高执行力",
      "培养耐心",
      "加强时间管理",
      "发展同理心",
      "提高完成率",
      "注意他人感受",
      "培养持续性",
      "平衡理论与实践",
      "建立工作规划"
    ],
    description: "ENTP型的人不断观察环境中的机遇和可能性，善于发现他人看不到的规律和联系。他们擅长产生创新概念并进行战略分析，对系统运作有深刻理解。他们是热心的改革者，世界对他们来说充满了有趣的概念和令人兴奋的挑战，能够被困难所激励并快速提出创新解决方案。"
  },
  ENTJ: {
    title: "外向直觉思考判断型 (ENTJ)",
    brief: "坦率，果断，有领导能力。能很快看到不合理或低效的程序和政策，发展并实施全面的系统以解决组织问题。善于长期规划和设定目标。通常见多识广，博览群书，喜欢将知识传播给他人。在陈述自己的想法时非常强而有力。",
    characteristics: [
      "果断的，直接的",
      "战略性的，有远见的",
      "自信的，有主见的",
      "有组织的，有计划的",
      "逻辑的，分析的",
      "雄心勃勃的，有抱负的",
      "高效的，注重结果的",
      "领导力强的",
      "独立的，自主的",
      "竞争性的，有挑战精神的"
    ],
    strengths: [
      "领导能力出色",
      "战略思维强",
      "决策能力强",
      "组织能力强",
      "执行力强",
      "分析能力强",
      "规划能力强",
      "问题解决能力强",
      "创新能力强",
      "目标导向能力强"
    ],
    careers: [
      "企业高管",
      "管理咨询师",
      "项目经理",
      "企业家",
      "战略规划师",
      "投资银行家",
      "政府管理者",
      "法律工作者",
      "商业分析师",
      "技术总监"
    ],
    growth: [
      "培养同理心",
      "提高情商",
      "发展耐心",
      "注意倾听",
      "关注细节",
      "平衡工作与生活",
      "接纳不同观点",
      "控制情绪",
      "建立人际关系",
      "学会放松"
    ],
    description: "ENTJ型的人是天生的领导者，他们善于制定战略目标并带领团队实现这些目标。他们具有出色的组织能力和决策能力，能够快速识别问题并提出有效的解决方案。他们追求效率和卓越，善于建立系统化的工作流程，并且能够激励他人追求更高的目标。他们在竞争和挑战中表现出色，始终保持前进的动力。"
  },
  ESTP: {
    title: "外向感觉思考知觉型 (ESTP)",
    brief: "善于解决紧急问题。喜欢活动，不管以后会发生什么。趋向于喜欢呆板的事物和运动，有朋友在身边。适应力强，有容忍力，注重实效；注意力集中在结果上。不喜欢长的解释。和能够操作，控制，分离和组装的真实事物在一起是最好的。",
    characteristics: [
      "实际的，现实的",
      "善于观察的",
      "注重直接经验",
      "分析的，理智的",
      "直接的，独断的",
      "合群的，爱开玩笑的",
      "大胆的，爱冒险的",
      "灵活的，适应性强的",
      "行动导向的",
      "善于解决问题的"
    ],
    strengths: [
      "处理危机能力强",
      "实践动手能力强",
      "适应力强",
      "问题解决能力强",
      "创造性思维",
      "团队协作能力",
      "现实主义思维",
      "果断决策能力",
      "灵活应变能力",
      "善于谈判协调"
    ],
    careers: [
      "企业家",
      "销售代表",
      "警察",
      "运动员",
      "工程师",
      "建筑师",
      "技术人员",
      "市场营销",
      "紧急救援人员",
      "娱乐行业从业者"
    ],
    growth: [
      "发展长远规划",
      "注意他人感受",
      "培养耐心",
      "加强时间管理",
      "发展同理心",
      "提高完成率",
      "克制冲动",
      "培养持续性",
      "发展判断力",
      "建立工作规划"
    ],
    description: "ESTP型的人是充满精力的、积极的问题解决者，善于用创造性的方式应对挑战。他们不拘泥于规则和标准程序，能找到新方法来利用现有系统。他们以轻松的方式解决困难问题，善于将多种冲突因素整合在一起。他们是优秀的团队成员，因为热爱生活和乐观态度而受欢迎。"
  },
  ESFP: {
    title: "外向感觉情感知觉型 (ESFP)",
    brief: "外向，友好，接受性强。热爱生活，人和事物。喜欢和他人一起积极地行动。喜欢物质享受和时尚。学习新事物最得益于实践。",
    characteristics: [
      "热情开朗",
      "善于交际",
      "实际性强",
      "富有同情心"
    ],
    strengths: [
      "良好的人际关系",
      "乐观积极",
      "适应力强",
      "富有同理心"
    ],
    careers: [
      "演艺人员",
      "导游",
      "活动策划",
      "销售代表",
      "幼儿教师"
    ],
    growth: [
      "加强计划性",
      "提高决策能力",
      "培养独立性",
      "注意长远目标"
    ],
    description: "ESFP型的人是丰富的生活爱好者，善于在当下找到快乐。他们在人际交往、自然世界和各种活动中找到乐趣，用创造性的方法解决问题。作为优秀的团队成员，他们能以最大的乐趣和最小的烦扰来适应工作。他们是人类行为的敏感观察者，能快速察觉并响应他人的需求，善于在危机时刻调动人心。"
  },
  ESFJ: {
    title: "外向感觉情感判断型 (ESFJ)",
    brief: "热心，有责任感，合作性强。希望周围的环境温馨而和谐，并为此果断地采取行动。喜欢和他人一起精确并及时地完成任务。重视传统和社会认可，关心他人感受，善于创造和谐氛围。",
    characteristics: [
      "热心的，友善的",
      "善解人意的，体贴的",
      "负责任的，可靠的",
      "合作的，乐于助人的",
      "传统的，重视秩序的",
      "实际的，注重细节的",
      "有条理的，有组织的",
      "外向的，社交的",
      "关心他人的",
      "重视和谐的"
    ],
    strengths: [
      "人际关系能力强",
      "组织能力强",
      "执行力强",
      "团队合作能力强",
      "服务精神强",
      "责任心强",
      "关怀他人",
      "善于沟通",
      "注重细节",
      "实践能力强"
    ],
    careers: [
      "人力资源管理",
      "医护人员",
      "教师",
      "社工",
      "客户服务",
      "行政管理",
      "销售代表",
      "活动策划",
      "公共关系",
      "护理工作"
    ],
    growth: [
      "培养独立性",
      "学会说不",
      "接受变化",
      "处理冲突",
      "发展创新思维",
      "平衡付出与回报",
      "建立界限",
      "提高决策能力",
      "培养批判性思维",
      "关注自我需求"
    ],
    description: "ESFJ型的人善于创造和谐的环境，能够敏锐地察觉他人的需求并提供帮助。他们是优秀的组织者和协调者，能够有效地管理人际关系和日常事务。他们重视传统和社会价值观，通过服务他人和维护社会秩序来获得满足感。他们在团队中表现出色，能够创造积极、温暖的氛围。"
  },
  ESTJ: {
    title: "外向思维感觉型 (ESTJ)",
    brief: "实践的，现实主义的，实事求是。对抽象的理论不感兴趣；希望学到些能够直接，即刻见效的东西。喜欢组织和管理活动。经常是好的管理者；果断；关心例行公事的细节。",
    characteristics: [
      "逻辑的，分析的",
      "客观的，批判性的",
      "果断的，明确的",
      "自信的，坚定的",
      "实践的，现实的",
      "系统的，实用的",
      "正直的，可信赖的",
      "率直的，坦诚的",
      "有责任心的",
      "注重传统的"
    ],
    strengths: [
      "组织能力强",
      "执行力强",
      "领导能力强",
      "决策能力强",
      "计划性强",
      "注重效率",
      "责任心强",
      "实践能力强",
      "问题解决能力强",
      "时间管理能力强"
    ],
    careers: [
      "项目经理",
      "行政管理",
      "财务主管",
      "军警人员",
      "生产主管",
      "物流经理",
      "质量管理",
      "审计师",
      "法务人员",
      "运营总监"
    ],
    growth: [
      "培养灵活性",
      "发展同理心",
      "提高包容性",
      "关注创新",
      "平衡工作与生活",
      "注意他人感受",
      "培养耐心",
      "接受新观点",
      "放松控制欲",
      "提高情商"
    ],
    description: "ESTJ型的人喜欢组织项目、操作、程序和人员，并采取行动完成任务。他们依靠一套清晰的准则和信念生活，并期望他人也遵循这些准则。他们重视能力、效率和结果，是优秀的管理者，因为他们理解系统和逻辑，能够规划工作步骤，预见潜在问题，分配责任，并确保工作按时完成。"
  },
  ENFP: {
    title: "外向直觉情感知觉型 (ENFP)",
    brief: "热情洋溢，富有创造性，充满活力。视生活充满各种可能性。能很快地将事情和信息联系起来，并根据自己的判断自信地解决问题。",
    characteristics: [
      "富有创意",
      "热情活力",
      "善于沟通",
      "充满好奇心"
    ],
    strengths: [
      "创新能力强",
      "适应力强",
      "理解他人",
      "激发潜能"
    ],
    careers: [
      "记者",
      "艺术家",
      "心理咨询师",
      "教师",
      "创意总监"
    ],
    growth: [
      "提高执行力",
      "注意细节",
      "培养耐心",
      "坚持完成目标"
    ],
    description: "对于ENFP型的人，生活就是充满兴奋的可能性的、创造性的冒险。他们对人和周围的世界有敏锐的洞察力，并对现在和将来有独特的见解。他们体验丰富的情感范围，需要他人的肯定，也乐于给予他人尊重和支持。他们是天生的改革家，能够将巨大的能量投入到计划的实施中。"
  },
  INFP: {
    title: "内向直觉情感知觉型 (INFP)",
    brief: "安静的观察者，理想主义的，忠诚的。外部的生活适应内部的价值观很重要。好奇的，很快地看出可能性，常常是实现想法的催化剂。适应力强，变通，接受任何价值观，除非它是受到威胁的。希望理解实现人类潜能的方式和人。不是很关心拥有或环境。",
    characteristics: [
      "敏感的，焦虑的，担心的",
      "对人和目标忠实的",
      "好奇的，创造性的",
      "有远见的",
      "理想主义的",
      "内省的，复杂的",
      "新型的，独立的",
      "富有同情心的",
      "重视个人价值观的",
      "追求完美的"
    ],
    strengths: [
      "强烈的内部价值观",
      "创造性思维",
      "对他人富有同理心",
      "适应性强",
      "善于观察洞察",
      "追求个人成长",
      "对语言和表达有天赋",
      "富有想象力",
      "坚持理想",
      "善于激励他人"
    ],
    careers: [
      "作家",
      "心理咨询师",
      "教师",
      "艺术家",
      "记者",
      "社会工作者",
      "人力资源专家",
      "翻译",
      "音乐家",
      "宗教工作者"
    ],
    growth: [
      "培养实践能力",
      "发展行动计划",
      "学会说不",
      "平衡理想与现实",
      "提高决策效率",
      "克服拖延习惯",
      "增强自信心",
      "接受不完美",
      "培养时间管理能力",
      "加强逻辑思维"
    ],
    description: "INFP型的人的内部核心价值观指导着他们的行动和决策。他们希望工作能对自己的成长和内部发展有贡献，同时也能帮助他人实现潜能。他们对于与价值观一致的生活做出优先考虑，在能量爆发时能够全身心投入项目，展现出极强的创造力和洞察力。"
  },
  ISTP: {
    title: "内向思考感觉判断型 (ISTP)",
    brief: "冷静的旁观者，缄默的，带着超然的好奇心观察和分析生活。对因和果感兴趣，用逻辑的方式处理问题。喜欢组织事实和数据。",
    characteristics: [
      "独立的，客观的批评者",
      "分析的，逻辑的问题解决者",
      "实际的，现实的",
      "冷静的，可适应的",
      "自信的，独立的",
      "自我决定的",
      "讲求逻辑和分析",
      "善于动手操作",
      "喜欢运动和户外活动",
      "有独特的幽默感"
    ],
    strengths: [
      "擅长观察和分析问题",
      "能快速抓住问题核心",
      "高效解决实际问题",
      "适应性强",
      "善于处理危机",
      "技术领域天赋",
      "独立思考能力强",
      "实用主义者",
      "灵活变通",
      "动手能力强"
    ],
    careers: [
      "技术专家",
      "工程师",
      "机械师",
      "法律工作者",
      "经济分析师",
      "统计师",
      "运动员",
      "警察",
      "飞行员",
      "自由职业者"
    ],
    growth: [
      "学会表达感情",
      "发展坚毅力",
      "培养目标设定习惯",
      "加强长期规划",
      "增进人际交流",
      "注意他人感受",
      "提高决策效率",
      "平衡理性与感性",
      "培养耐心",
      "加强团队合作"
    ],
    description: "ISTP型的人十分仔细地观察周围发生的事情，能在需要时快速抓住问题核心，用最小努力达到最大的效果。他们喜欢探究事物运作的原理和方式，对实用性强的理论特别感兴趣。他们不拘泥于常规，喜欢多样性和新鲜事物，善于解决具体的、实际的事务。"
  },
  ISFP: {
    title: "内向感觉情感知觉型 (ISFP)",
    brief: "不爱交际的，相当友好，敏感的，和蔼的，对他们的能力保持谦虚。避免不同意见，不会将自己的意见强加于别人头上。通常不喜欢被领导，但是好的合作伙伴。经常做事随意，因为他们喜欢现在，而不想被不适当的匆忙或努力所破坏。",
    characteristics: [
      "相信的，热心的，体谅的",
      "敏感的，亲切的",
      "善于观察的",
      "现实的，实践的",
      "安静的，自制的",
      "自然的，容忍的",
      "谦逊的，低调的",
      "忠诚的，有原则的",
      "富有同情心的",
      "重视个人空间的"
    ],
    strengths: [
      "关注他人需求",
      "富有同理心",
      "实践能力强",
      "适应性好",
      "忠于自己的价值观",
      "善于合作",
      "注重和谐",
      "创造性思维",
      "审美能力强",
      "行动导向"
    ],
    careers: [
      "艺术家",
      "音乐家",
      "设计师",
      "护理师",
      "社工",
      "心理咨询师",
      "美容师",
      "兽医",
      "教师",
      "自由职业者"
    ],
    growth: [
      "发展分析能力",
      "学会提供反馈",
      "增强自信心",
      "培养决断力",
      "提高表达能力",
      "设定明确目标",
      "建立工作体系",
      "接受批评意见",
      "培养领导能力",
      "平衡理想与现实"
    ],
    description: "ISFP型的人生活在现在，对生活有一种平静的感觉。他们追求自由，渴望有自己的空间和时间体系。他们对自己重视的人和事非常忠诚，愿意为之付出努力。他们通过行动而不是言语来表达关心，在实践中能够学到很多，尤其擅长处理具体的、实际的事务。"
  },
  ESFP: {
    title: "外向感觉情感知觉型 (ESFP)",
    brief: "对人友好，能够接受他人的，友好的。享受一切，通过他们的享受使事物对于别人来说更加有趣。喜欢活动和做事。知道什么正在发生，并热心地加入。找到记忆中的事实，而不是掌握理论。在需要很强的普通感觉和实践能力中，是最好的。",
    characteristics: [
      "实际的，现实的",
      "善于观察的",
      "聚焦当下的",
      "慷慨大方的",
      "乐观的，有说服力的",
      "温暖的，仁慈的",
      "机智的，富有同情心的",
      "合群的，爱热闹的",
      "幽默的，自然的",
      "适应性强的"
    ],
    strengths: [
      "人际交往能力强",
      "观察力敏锐",
      "实践能力强",
      "适应力强",
      "乐观积极",
      "富有同理心",
      "善于化解危机",
      "创造性解决问题",
      "团队协作能力强",
      "生活艺术家"
    ],
    careers: [
      "销售代表",
      "演艺人员",
      "教师",
      "社工",
      "健康服务人员",
      "公关专员",
      "活动策划师",
      "客户服务",
      "餐饮服务",
      "人力资源专员"
    ],
    growth: [
      "培养长期规划",
      "加强逻辑分析",
      "提高时间管理",
      "平衡工作与社交",
      "发展持久性",
      "注意细节",
      "培养耐心",
      "加强项目管理",
      "控制冲动",
      "建立工作规划"
    ],
    description: "ESFP型的人是丰富的生活爱好者，善于在当下找到快乐。他们在人际交往、自然世界和各种活动中找到乐趣，用创造性的方法解决问题。作为优秀的团队成员，他们能以最大的乐趣和最小的烦扰来适应工作。他们是人类行为的敏感观察者，能快速察觉并响应他人的需求，善于在危机时刻调动人心。"
  },
  ENFP: {
    title: "外向直觉情感知觉型 (ENFP)",
    brief: "热心肠，非常有精神，机灵的，有想象力。能够做几乎所有使他们感兴趣的事。能够很快找出困难的解决办法，愿意帮助有困难的人。总是依赖于他们的能力临时准备，而不是提前准备。对于他们想要的，通常能够找到令人佩服的原因。",
    characteristics: [
      "好奇的，创造性的",
      "富有想象力的",
      "有精力的，热情的",
      "自然的，真诚的",
      "温暖的，关心他人的",
      "合作的，有支持力的",
      "活泼的，好交际的",
      "有人缘的，受欢迎的",
      "气质好的，有洞察力的",
      "有说服力的，多才多艺的"
    ],
    strengths: [
      "创新能力强",
      "人际交往能力强",
      "适应力强",
      "洞察力敏锐",
      "解决问题能力强",
      "表达能力出色",
      "同理心强",
      "激发他人潜能",
      "创造性思维",
      "热情积极"
    ],
    careers: [
      "教师",
      "咨询师",
      "艺术家",
      "记者",
      "作家",
      "广告创意",
      "市场营销",
      "公关顾问",
      "人力资源",
      "创业者"
    ],
    growth: [
      "培养计划性",
      "加强执行力",
      "注意细节",
      "提高专注度",
      "控制冲动",
      "坚持完成任务",
      "建立优先级",
      "提高时间管理",
      "平衡理想与现实",
      "发展判断力"
    ],
    description: "对于ENFP型的人，生活就是充满兴奋的可能性的、创造性的冒险。他们对人和周围的世界有敏锐的洞察力，并对现在和将来有独特的见解。他们体验丰富的情感范围，需要他人的肯定，也乐于给予他人尊重和支持。他们是天生的改革家，能够将巨大的能量投入到计划的实施中。"
  }
};

const COLORS = {
  primary: '#2D3436',
  secondary: '#636E72',
  accent: '#00B894',
  accentDark: '#00896F', // 手动定义深色版本
  background: '#F5F6FA',
  cardBg: '#FFFFFF',
  text: {
    primary: '#2D3436',
    secondary: '#636E72',
    light: '#B2BEC3'
  },
  dimension: {
    EI: '#00B894',
    SN: '#6C5CE7',
    TF: '#FF7675',
    JP: '#FDCB6E'
  }
};

const StyledCard = styled(Card)(({ theme }) => ({
  background: COLORS.cardBg,
  borderRadius: theme.spacing(2),
  boxShadow: '0 10px 40px rgba(0,0,0,0.05)',
  overflow: 'hidden',
  position: 'relative',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  border: 'none',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
  }
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(12),
  height: theme.spacing(12),
  margin: '0 auto',
  marginBottom: theme.spacing(4),
  background: `linear-gradient(135deg, ${COLORS.accent} 0%, ${alpha(COLORS.accent, 0.8)} 100%)`,
  boxShadow: `0 8px 32px ${alpha(COLORS.accent, 0.2)}`,
  border: `4px solid ${COLORS.cardBg}`,
}));

const StyledChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
  padding: theme.spacing(1.5),
  background: alpha(COLORS.accent, 0.1),
  color: COLORS.accent,
  fontWeight: 500,
  borderRadius: '16px',
  '&:hover': {
    background: alpha(COLORS.accent, 0.15),
  }
}));

const DimensionBar = ({ label1, score1, label2, score2, color }) => {
  const total = score1 + score2;
  const percentage1 = total === 0 ? 50 : Math.round((score1 / total) * 100);
  const percentage2 = total === 0 ? 50 : Math.round((score2 / total) * 100);

  return (
    <Box sx={{ mb: 4, position: 'relative' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
        <Typography variant="subtitle2" sx={{ 
          fontWeight: 600, 
          color: COLORS.text.primary,
          fontSize: '0.875rem'
        }}>
          {label1} ({score1}分)
        </Typography>
        <Typography variant="subtitle2" sx={{ 
          fontWeight: 600, 
          color: COLORS.text.primary,
          fontSize: '0.875rem'
        }}>
          {label2} ({score2}分)
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          height: '12px',
          borderRadius: '6px',
          overflow: 'hidden',
          background: alpha(color, 0.1),
        }}
      >
        <Box
          sx={{
            width: `${percentage1}%`,
            background: color,
            transition: 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />
        <Box
          sx={{
            width: `${percentage2}%`,
            background: alpha(color, 0.3),
            transition: 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />
      </Box>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        mt: 0.5,
        opacity: 0.7,
        fontSize: '0.75rem'
      }}>
        <Typography variant="caption" sx={{ color: COLORS.text.secondary }}>
          {percentage1}%
        </Typography>
        <Typography variant="caption" sx={{ color: COLORS.text.secondary }}>
          {percentage2}%
        </Typography>
      </Box>
    </Box>
  );
};

const calculateDimensionScores = (answers) => {
  // 定义各维度对应的题号（索引从0开始，所以题号需要减1）
  const questionGroups = {
    EI: [0,4,8,12,16,20,24,28,32,36,40,44],  // 题号1,5,9,13,17,21,25,29,33,37,41,45
    SN: [1,5,9,13,17,21,25,29,33,37,41,45],  // 题号2,6,10,14,18,22,26,30,34,38,42,46
    TF: [2,6,10,14,18,22,26,30,34,38,42,46], // 题号3,7,11,15,19,23,27,31,35,39,43,47
    JP: [3,7,11,15,19,23,27,31,35,39,43,47]  // 题号4,8,12,16,20,24,28,32,36,40,44,48
  };

  // 初始化得分
  const scores = {
    E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0
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

  return scores;
};

const calculateMBTIType = (scores) => {
  if (!scores) return null;
  
  return [
    scores.E > scores.I ? 'E' : 'I',
    scores.S > scores.N ? 'S' : 'N',
    scores.T > scores.F ? 'T' : 'F',
    scores.J > scores.P ? 'J' : 'P'
  ].join('');
};

const ResultPage = ({ result = null, userName }) => {
  const theme = useTheme();
  const resultRef = useRef(null);
  
  // 导出图片功能
  const exportAsImage = async () => {
    try {
      // 显示加载状态
      const button = document.querySelector('#export-button');
      if (button) {
        button.disabled = true;
        button.textContent = '导出中...';
      }

      const element = resultRef.current;
      const canvas = await html2canvas(element, {
        scale: 2, // 提高清晰度
        useCORS: true,
        logging: false,
        backgroundColor: null,
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight
      });

      // 创建下载链接
      const image = canvas.toDataURL('image/png', 1.0);
      const link = document.createElement('a');
      link.download = `${userName ? userName + '-' : ''}MBTI测试结果.png`;
      link.href = image;
      link.click();

      // 恢复按钮状态
      if (button) {
        button.disabled = false;
        button.textContent = '导出结果';
      }
    } catch (error) {
      console.error('导出图片失败:', error);
      alert('导出图片失败，请重试');
    }
  };

  // 计算维度得分
  const dimensionScores = result ? calculateDimensionScores(result) : null;
  const mbtiType = dimensionScores ? calculateMBTIType(dimensionScores) : null;
  const personality = mbtiType ? personalityDescriptions[mbtiType] : null;

  console.log('Result:', result);
  console.log('Dimension Scores:', dimensionScores);
  console.log('MBTI Type:', mbtiType);

  if (!personality || !dimensionScores) {
    return (
      <Container maxWidth="sm" sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h4" color="error" gutterBottom>
          未找到测试结果
        </Typography>
        <Typography variant="body1" color="textSecondary">
          请先完成MBTI性格测试。
        </Typography>
        <Button
          variant="contained"
          onClick={() => window.location.reload()}
          sx={{ mt: 3 }}
        >
          开始测试
        </Button>
      </Container>
    );
  }

  return (
    <Box
      ref={resultRef}
      sx={{
        minHeight: '100vh',
        background: COLORS.background,
        py: 6,
        px: 2,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* 头部区域 */}
          <Grid item xs={12}>
            <StyledCard>
              <CardContent sx={{ textAlign: 'center', py: 6 }}>
                <StyledAvatar>
                  <Psychology sx={{ fontSize: 40, color: COLORS.cardBg }} />
                </StyledAvatar>
                <Typography variant="h4" gutterBottom sx={{ 
                  fontWeight: 700, 
                  color: COLORS.text.primary,
                  mb: 2,
                  letterSpacing: '-0.5px'
                }}>
                  {userName ? `${userName}的` : ''}性格测试结果
                </Typography>
                <Typography variant="h5" sx={{ 
                  mb: 3, 
                  color: COLORS.text.secondary,
                  fontWeight: 500,
                  letterSpacing: '-0.3px'
                }}>
                  {personality.title}
                </Typography>
                <Typography variant="body1" sx={{ 
                  maxWidth: '800px', 
                  mx: 'auto', 
                  mb: 5,
                  color: COLORS.text.secondary,
                  lineHeight: 1.8,
                  fontSize: '1.1rem'
                }}>
                  {personality.brief}
                </Typography>
                <Button
                  id="export-button"
                  variant="contained"
                  size="large"
                  startIcon={<Download sx={{ color: COLORS.cardBg }} />}
                  onClick={exportAsImage}
                  sx={{ 
                    mt: 2,
                    px: 6,
                    py: 1.5,
                    borderRadius: '30px',
                    background: COLORS.accent,
                    boxShadow: `0 8px 32px ${alpha(COLORS.accent, 0.3)}`,
                    color: COLORS.cardBg,
                    fontSize: '1rem',
                    fontWeight: 500,
                    '&:hover': {
                      background: COLORS.accentDark,
                      boxShadow: `0 12px 48px ${alpha(COLORS.accent, 0.4)}`,
                    }
                  }}
                >
                  导出结果
                </Button>
              </CardContent>
            </StyledCard>
          </Grid>

          {/* 维度得分展示 */}
          <Grid item xs={12}>
            <StyledCard>
              <CardContent sx={{ py: 4 }}>
                <Typography variant="h6" gutterBottom sx={{ 
                  mb: 4, 
                  fontWeight: 600,
                  color: COLORS.text.primary,
                  textAlign: 'center'
                }}>
                  维度得分分析
                </Typography>
                <Box sx={{ maxWidth: 700, mx: 'auto' }}>
                  <DimensionBar
                    label1="外向 (E)"
                    score1={dimensionScores.E}
                    label2="内向 (I)"
                    score2={dimensionScores.I}
                    color={COLORS.dimension.EI}
                  />
                  <DimensionBar
                    label1="感觉 (S)"
                    score1={dimensionScores.S}
                    label2="直觉 (N)"
                    score2={dimensionScores.N}
                    color={COLORS.dimension.SN}
                  />
                  <DimensionBar
                    label1="思考 (T)"
                    score1={dimensionScores.T}
                    label2="情感 (F)"
                    score2={dimensionScores.F}
                    color={COLORS.dimension.TF}
                  />
                  <DimensionBar
                    label1="判断 (J)"
                    score1={dimensionScores.J}
                    label2="知觉 (P)"
                    score2={dimensionScores.P}
                    color={COLORS.dimension.JP}
                  />
                </Box>
              </CardContent>
            </StyledCard>
          </Grid>

          {/* 特征描述 */}
          <Grid item xs={12} md={6}>
            <StyledCard>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Star sx={{ color: COLORS.accent, mr: 1 }} />
                  <Typography variant="h6">性格特征</Typography>
                </Box>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {personality.characteristics.map((trait, index) => (
                    <StyledChip key={index} label={trait} />
                  ))}
                </Box>
              </CardContent>
            </StyledCard>
          </Grid>

          {/* 优势 */}
          <Grid item xs={12} md={6}>
            <StyledCard>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <TrendingUp sx={{ color: COLORS.accent, mr: 1 }} />
                  <Typography variant="h6">主要优势</Typography>
                </Box>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {personality.strengths.map((strength, index) => (
                    <StyledChip key={index} label={strength} />
                  ))}
                </Box>
              </CardContent>
            </StyledCard>
          </Grid>

          {/* 职业建议 */}
          <Grid item xs={12} md={6}>
            <StyledCard>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <WorkOutline sx={{ color: COLORS.accent, mr: 1 }} />
                  <Typography variant="h6">适合的职业</Typography>
                </Box>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {personality.careers.map((career, index) => (
                    <StyledChip key={index} label={career} />
                  ))}
                </Box>
              </CardContent>
            </StyledCard>
          </Grid>

          {/* 成长建议 */}
          <Grid item xs={12} md={6}>
            <StyledCard>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <EmojiObjects sx={{ color: COLORS.accent, mr: 1 }} />
                  <Typography variant="h6">成长建议</Typography>
                </Box>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {personality.growth.map((tip, index) => (
                    <StyledChip key={index} label={tip} />
                  ))}
                </Box>
              </CardContent>
            </StyledCard>
          </Grid>

          {/* 详细描述 */}
          <Grid item xs={12}>
            <StyledCard>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Psychology sx={{ color: COLORS.accent, mr: 1 }} />
                  <Typography variant="h6">详细描述</Typography>
                </Box>
                <Typography variant="body1" sx={{ 
                  maxWidth: '800px', 
                  mx: 'auto', 
                  mb: 5,
                  color: COLORS.text.secondary,
                  lineHeight: 1.8,
                  fontSize: '1.1rem'
                }}>
                  {personality.description}
                </Typography>
              </CardContent>
            </StyledCard>
          </Grid>

          {/* 重新测试按钮 */}
          <Grid item xs={12} sx={{ textAlign: 'center', mt: 4 }}>
            <Button
              variant="contained"
              startIcon={<RestartAlt />}
              onClick={() => window.location.reload()}
              sx={{
                borderRadius: '50px',
                px: 4,
                py: 1.5,
                background: COLORS.accent,
                boxShadow: `0 8px 32px ${alpha(COLORS.accent, 0.3)}`,
                color: COLORS.cardBg,
                fontSize: '1rem',
                fontWeight: 500,
                '&:hover': {
                  background: COLORS.accentDark,
                  boxShadow: `0 12px 48px ${alpha(COLORS.accent, 0.4)}`,
                }
              }}
            >
              重新测试
            </Button>
          </Grid>
        </Grid>
      </Container>
      {/* 添加版权信息 */}
      <Box sx={{ 
        width: '100%',
        textAlign: 'center',
        py: 2,
        mt: 4,
        borderTop: '1px solid rgba(0,0,0,0.1)'
      }}>
        <Typography variant="body2" color="text.secondary">
          {new Date().getFullYear()} 小白屋 | 联系微信：Joy10241128
        </Typography>
      </Box>
    </Box>
  );
};

export default ResultPage;
