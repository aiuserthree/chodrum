import { useState } from 'react';
import { Product } from '../../types';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { ChevronLeft, Upload, Trash2, FileText } from 'lucide-react';
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
    duration: product.duration
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 실제로는 여기서 API 호출하여 저장
    alert('상품이 업데이트되었습니다.');
    onNavigate('admin-products');
  };

  const handleDelete = () => {
    if (confirm('정말 이 상품을 삭제하시겠습니까?')) {
      // 실제로는 여기서 API 호출하여 삭제
      alert('상품이 삭제되었습니다.');
      onNavigate('admin-products');
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
