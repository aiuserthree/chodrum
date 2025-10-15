import { useState } from 'react';
import { Product } from '../../types';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Switch } from '../ui/switch';
import { ChevronLeft, Upload, Trash2, FileText, Eye, EyeOff } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Badge } from '../ui/badge';

interface AdminProductDetailProps {
  product: Product;
  onNavigate: (page: string) => void;
}

export function AdminProductDetail({ product, onNavigate }: AdminProductDetailProps) {
  const [formData, setFormData] = useState({
    title: product.title,
    composer: product.composer,
    price: product.price.toString(),
    pages: product.pages.toString(),
    category: product.category,
    difficulty: product.difficulty,
    description: product.description,
    youtubeUrl: product.youtubeUrl || '',
    duration: product.duration,
    isVisible: typeof product.isVisible !== 'undefined' ? product.isVisible : true
  });

  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPdfFile(e.target.files[0]);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  // 이미지 파일을 압축하여 Data URL로 변환
  const handleImageUpload = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      // 파일 크기 제한 (5MB)
      if (file.size > 5 * 1024 * 1024) {
        reject(new Error('이미지 파일 크기는 5MB 이하여야 합니다.'));
        return;
      }

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        // 최대 크기 설정 (800x600)
        const maxWidth = 800;
        const maxHeight = 600;
        let { width, height } = img;
        
        if (width > height) {
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = (width * maxHeight) / height;
            height = maxHeight;
          }
        }
        
        canvas.width = width;
        canvas.height = height;
        
        // 이미지 그리기 및 압축
        ctx?.drawImage(img, 0, 0, width, height);
        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.8);
        resolve(compressedDataUrl);
      };
      
      img.onerror = reject;
      img.src = URL.createObjectURL(file);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.composer || !formData.price) {
      alert('제목, 작곡가, 가격은 필수 입력 항목입니다.');
      return;
    }

    let imageUrl = product.image; // 기존 이미지 유지
    
    // 이미지 파일이 업로드된 경우 Data URL로 변환
    if (imageFile) {
      try {
        console.log('이미지 파일 업로드 시작:', imageFile.name, imageFile.size);
        imageUrl = await handleImageUpload(imageFile);
        console.log('이미지 변환 완료, Data URL 길이:', imageUrl.length);
      } catch (error: any) {
        console.error('이미지 업로드 오류:', error);
        alert('이미지 업로드 중 오류가 발생했습니다: ' + error.message);
        return;
      }
    }

    const updatedProduct = {
      ...product,
      title: formData.title,
      composer: formData.composer,
      difficulty: formData.difficulty,
      price: parseInt(formData.price),
      image: imageUrl,
      category: formData.category,
      description: formData.description,
      youtubeUrl: formData.youtubeUrl || '',
      pages: parseInt(formData.pages) || 0,
      duration: formData.duration || '',
      isVisible: formData.isVisible
    };

    // 로컬 스토리지에서 기존 상품 목록 로드
    const savedProducts = localStorage.getItem('admin_products');
    const products = savedProducts ? JSON.parse(savedProducts) : [];
    
    // 해당 상품을 찾아서 업데이트
    const updatedProducts = products.map((p: any) => 
      p.id === product.id ? updatedProduct : p
    );
    
    // 로컬 스토리지에 저장
    try {
      const dataString = JSON.stringify(updatedProducts);
      localStorage.setItem('admin_products', dataString);
      
      // 저장 성공 확인
      const savedData = localStorage.getItem('admin_products');
      if (!savedData || savedData !== dataString) {
        throw new Error('로컬 스토리지 저장 실패');
      }
      
      console.log('로컬 스토리지 저장 성공');
      console.log('업데이트된 상품:', updatedProduct.title);
      
      alert('상품이 성공적으로 업데이트되었습니다.');
      onNavigate('admin-products');
    } catch (error) {
      console.error('로컬 스토리지 저장 오류:', error);
      alert('이미지가 너무 커서 저장할 수 없습니다. 더 작은 이미지를 사용해주세요.');
      return;
    }
  };

  const handleDelete = () => {
    if (confirm('정말 이 상품을 삭제하시겠습니까?')) {
      // 로컬 스토리지에서 기존 상품 목록 로드
      const savedProducts = localStorage.getItem('admin_products');
      const products = savedProducts ? JSON.parse(savedProducts) : [];
      
      // 해당 상품을 제외한 새로운 배열 생성
      const updatedProducts = products.filter((p: any) => p.id !== product.id);
      
      // 로컬 스토리지에 저장
      try {
        localStorage.setItem('admin_products', JSON.stringify(updatedProducts));
        console.log('상품 삭제 성공:', product.title);
        alert('상품이 성공적으로 삭제되었습니다.');
        onNavigate('admin-products');
      } catch (error) {
        console.error('상품 삭제 오류:', error);
        alert('상품 삭제 중 오류가 발생했습니다.');
      }
    }
  };

  return (
    <div className="p-4 lg:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => onNavigate('admin-products')}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4"
          >
            <ChevronLeft className="w-4 h-4" />
            상품 관리로 돌아가기
          </button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="mb-2">상품 상세 정보</h1>
              <p className="text-muted-foreground">상품 ID: {product.id}</p>
            </div>
            <Button
              variant="destructive"
              onClick={handleDelete}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              삭제
            </Button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 이미지 프리뷰 */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="mb-4">이미지</h3>
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="w-full lg:w-48 h-64 rounded-lg overflow-hidden bg-muted">
                <ImageWithFallback
                  src={imageFile ? URL.createObjectURL(imageFile) : product.image}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <Label htmlFor="image">상품 이미지 변경</Label>
                <div className="mt-2">
                  <input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById('image')?.click()}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    이미지 업로드
                  </Button>
                </div>
                {imageFile && (
                  <p className="text-sm text-muted-foreground mt-2">
                    선택된 파일: {imageFile.name}
                  </p>
                )}
                <p className="text-xs text-muted-foreground mt-2">
                  권장 사이즈: 400x400px
                </p>
              </div>
            </div>
          </div>

          {/* 기본 정보 */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="mb-4">기본 정보</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">상품명 *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="mt-1"
                  required
                />
              </div>

              <div>
                <Label htmlFor="composer">작곡가 *</Label>
                <Input
                  id="composer"
                  value={formData.composer}
                  onChange={(e) => setFormData({ ...formData, composer: e.target.value })}
                  className="mt-1"
                  required
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">가격 (₩) *</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="mt-1"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="pages">페이지 수 *</Label>
                  <Input
                    id="pages"
                    type="number"
                    value={formData.pages}
                    onChange={(e) => setFormData({ ...formData, pages: e.target.value })}
                    className="mt-1"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">카테고리 *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="가요">가요</SelectItem>
                      <SelectItem value="CCM">CCM</SelectItem>
                      <SelectItem value="Pop">Pop</SelectItem>
                      <SelectItem value="J-Pop">J-Pop</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="difficulty">난이도 *</Label>
                  <Select
                    value={formData.difficulty}
                    onValueChange={(value) => setFormData({ ...formData, difficulty: value })}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="초급">초급</SelectItem>
                      <SelectItem value="중급">중급</SelectItem>
                      <SelectItem value="고급">고급</SelectItem>
                      <SelectItem value="전문가">전문가</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="duration">연주 시간</Label>
                <Input
                  id="duration"
                  placeholder="예: 5분"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="description">상품 설명 *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="mt-1"
                  required
                />
              </div>

              <div>
                <Label htmlFor="youtube">YouTube URL (선택)</Label>
                <Input
                  id="youtube"
                  placeholder="https://www.youtube.com/embed/..."
                  value={formData.youtubeUrl}
                  onChange={(e) => setFormData({ ...formData, youtubeUrl: e.target.value })}
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          {/* 노출 상태 관리 */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="mb-4">상품 노출 설정</h3>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                {formData.isVisible ? (
                  <Eye className="w-5 h-5 text-green-600" />
                ) : (
                  <EyeOff className="w-5 h-5 text-red-600" />
                )}
                <Label htmlFor="visibility-toggle" className="text-base font-medium">
                  고객 사이트에 상품 {formData.isVisible ? '노출' : '미노출'}
                </Label>
              </div>
              <Switch
                id="visibility-toggle"
                checked={formData.isVisible}
                onCheckedChange={(checked) => setFormData({ ...formData, isVisible: checked })}
              />
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              {formData.isVisible 
                ? '이 상품은 고객 사이트에서 구매 가능한 상태입니다.' 
                : '이 상품은 고객 사이트에서 숨겨진 상태입니다. 관리자만 볼 수 있습니다.'
              }
            </p>
            {!formData.isVisible && (
              <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-md">
                <div className="flex items-center">
                  <EyeOff className="w-4 h-4 text-amber-600 mr-2" />
                  <span className="text-sm text-amber-800">
                    미노출 상태: 고객은 이 상품을 볼 수 없습니다.
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* PDF 파일 */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="mb-4">악보 PDF 파일</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                <FileText className="w-8 h-8 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-sm">현재 파일</p>
                  <p className="text-muted-foreground text-xs">
                    {product.title}.pdf
                  </p>
                </div>
                <Badge variant="outline">업로드됨</Badge>
              </div>

              <div>
                <Label htmlFor="pdf">PDF 파일 재업로드</Label>
                <div className="mt-2">
                  <input
                    type="file"
                    id="pdf"
                    accept=".pdf"
                    onChange={handlePdfChange}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById('pdf')?.click()}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    PDF 업로드
                  </Button>
                </div>
                {pdfFile && (
                  <p className="text-sm text-muted-foreground mt-2">
                    선택된 파일: {pdfFile.name} ({(pdfFile.size / 1024 / 1024).toFixed(2)} MB)
                  </p>
                )}
                <p className="text-xs text-muted-foreground mt-2">
                  최대 파일 크기: 50MB
                </p>
              </div>
            </div>
          </div>

          {/* 액션 버튼 */}
          <div className="flex flex-col lg:flex-row gap-3">
            <Button type="submit" size="lg" className="flex-1">
              변경사항 저장
            </Button>
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={() => onNavigate('admin-products')}
              className="flex-1"
            >
              취소
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
