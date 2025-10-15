# PowerShell script for generating favicon images using OpenAI API
param(
    [string]$Prompt,
    [string]$FileName,
    [string]$Size = "256x256"
)

$OPENAI_API_KEY = $env:OPENAI_API_KEY

if (-not $OPENAI_API_KEY) {
    Write-Host "Error: OPENAI_API_KEY environment variable is not set"
    Write-Host "Please set it with: `$env:OPENAI_API_KEY = 'your-api-key-here'"
    exit 1
}

if (-not $Prompt -or -not $FileName) {
    Write-Host "Usage: .\generate-favicon.ps1 -Prompt 'description' -FileName 'output.png' [-Size '256x256']"
    Write-Host "Example: .\generate-favicon.ps1 -Prompt 'centered drum logo' -FileName 'favicon.png' -Size '32x32'"
    exit 1
}

Write-Host "Generating image with prompt: $Prompt"
Write-Host "Size: $Size"
Write-Host "Output: $FileName"

# API 요청 데이터 준비
$requestBody = @{
    prompt = $Prompt
    n = 1
    size = $Size
    response_format = "url"
} | ConvertTo-Json

# API 헤더 설정
$headers = @{
    "Authorization" = "Bearer $OPENAI_API_KEY"
    "Content-Type" = "application/json"
}

try {
    # OpenAI DALL-E API 호출
    Write-Host "Calling OpenAI API..."
    $response = Invoke-RestMethod -Uri "https://api.openai.com/v1/images/generations" -Method Post -Headers $headers -Body $requestBody
    
    if ($response -and $response.data -and $response.data[0].url) {
        $imageUrl = $response.data[0].url
        Write-Host "Downloading image from: $imageUrl"
        
        # 이미지 다운로드
        Invoke-WebRequest -Uri $imageUrl -OutFile $FileName
        Write-Host "Image saved as: $FileName"
    } else {
        Write-Host "Error: Could not extract image URL from response"
        $response | ConvertTo-Json | Write-Host
    }
} catch {
    Write-Host "Error occurred: $($_.Exception.Message)"
    Write-Host "Response: $($_.Exception.Response)"
}
