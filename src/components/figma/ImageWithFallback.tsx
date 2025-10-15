import React, { useState } from 'react'

const ERROR_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg=='

export function ImageWithFallback(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  const [didError, setDidError] = useState(false)

  const handleError = () => {
    setDidError(true)
  }

  const { src, alt, style, className, ...rest } = props

  // 이미지 URL에 타임스탬프를 추가하여 캐시 우회
  const getImageUrl = (url: string) => {
    if (!url) return url;
    // Data URL과 Blob URL은 이미 고유하므로 타임스탬프 추가하지 않음
    if (url.startsWith('data:')) return url;
    if (url.startsWith('blob:')) return url;
    
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}t=${Date.now()}`;
  };

  const finalSrc = getImageUrl(src || '');
  
  // 디버깅을 위한 로그
  if (src && src.startsWith('data:')) {
    console.log('Data URL 이미지 로드:', src.substring(0, 50) + '...');
  }

  return didError ? (
    <div
      className={`inline-block bg-gray-100 text-center align-middle ${className ?? ''}`}
      style={style}
    >
      <div className="flex items-center justify-center w-full h-full">
        <img src={ERROR_IMG_SRC} alt="Error loading image" {...rest} data-original-url={src} />
      </div>
    </div>
  ) : (
    <img 
      src={finalSrc} 
      alt={alt} 
      className={className} 
      style={style} 
      {...rest} 
      onError={handleError}
      onLoad={() => console.log('이미지 로드 성공:', alt)}
    />
  )
}
