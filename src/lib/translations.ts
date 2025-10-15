// 한글 번역 맵핑
export const difficultyMap: Record<string, string> = {
  'Beginner': '초급',
  'Intermediate': '중급',
  'Advanced': '고급',
  'Expert': '전문가',
  '초급': 'Beginner',
  '중급': 'Intermediate',
  '고급': 'Advanced',
  '전문가': 'Expert'
};

export const categoryMap: Record<string, string> = {
  'Classical': '클래식',
  'Contemporary': '현대음악',
  'Jazz': '재즈',
  'Pop': '팝',
  '클래식': 'Classical',
  '현대음악': 'Contemporary',
  '재즈': 'Jazz',
  '팝': 'Pop'
};

export const statusMap: Record<string, string> = {
  'completed': '완료',
  'pending': '대기중',
  'failed': '실패',
  'processing': '처리중',
  'refunded': '환불완료'
};
