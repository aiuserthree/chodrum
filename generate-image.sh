#!/bin/bash

# OpenAI API를 사용한 이미지 생성 스크립트
# Usage: ./generate-image.sh "prompt" "filename" [size]

OPENAI_API_KEY="${OPENAI_API_KEY}"

if [ -z "$OPENAI_API_KEY" ]; then
    echo "Error: OPENAI_API_KEY environment variable is not set"
    echo "Please set it with: export OPENAI_API_KEY='your-api-key-here'"
    exit 1
fi

if [ $# -lt 2 ]; then
    echo "Usage: $0 \"prompt\" \"filename\" [size]"
    echo "Example: $0 \"a minimalist drum logo\" \"favicon.png\" \"256x256\""
    exit 1
fi

PROMPT="$1"
FILENAME="$2"
SIZE="${3:-256x256}"

echo "Generating image with prompt: $PROMPT"
echo "Size: $SIZE"
echo "Output: $FILENAME"

# OpenAI DALL-E API 호출
curl -X POST https://api.openai.com/v1/images/generations \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d "{
    \"prompt\": \"$PROMPT\",
    \"n\": 1,
    \"size\": \"$SIZE\"
  }" \
  -o temp_response.json

# 이미지 URL 추출 및 다운로드
if [ -f temp_response.json ]; then
    IMAGE_URL=$(cat temp_response.json | grep -o '"url":"[^"]*' | sed 's/"url":"//')
    
    if [ ! -z "$IMAGE_URL" ]; then
        echo "Downloading image from: $IMAGE_URL"
        curl -o "$FILENAME" "$IMAGE_URL"
        echo "Image saved as: $FILENAME"
    else
        echo "Error: Could not extract image URL from response"
        cat temp_response.json
    fi
    
    rm temp_response.json
else
    echo "Error: Failed to get response from OpenAI API"
fi
