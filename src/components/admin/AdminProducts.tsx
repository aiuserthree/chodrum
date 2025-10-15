import { useState } from 'react';
import { mockProducts } from '../../lib/mockData';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Plus, Search, Upload, Edit, Trash2, MoreVertical } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Badge } from '../ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

interface AdminProductsProps {
  onNavigate: (page: string, productId?: string) => void;
}

export function AdminProducts({ onNavigate }: AdminProductsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  
  // 로컬 스토리지에서 상품 데이터 로드
  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem('admin_products');
    if (savedProducts) {
      const parsed = JSON.parse(savedProducts);
      console.log('상품 데이터 로드됨:', parsed.length, '개');
      
      // 기존 상품들의 ID가 중복되는 경우 고유 ID로 업데이트
      const updatedProducts = parsed.map((product: any, index: number) => {
        if (product.id && product.id.length < 10) {
          // 짧은 ID는 고유 ID로 변경
          return {
            ...product,
            id: `product_${Date.now()}_${index}_${Math.random().toString(36).substr(2, 9)}`
          };
        }
        return product;
      });
      
      // ID가 변경된 경우 로컬 스토리지에 저장
      if (updatedProducts.some((p: any, i: number) => p.id !== parsed[i].id)) {
        localStorage.setItem('admin_products', JSON.stringify(updatedProducts));
        console.log('상품 ID 중복 해결됨');
      }
      
      return updatedProducts;
    }
    console.log('기본 상품 데이터 사용');
    return mockProducts;
  });
  const [newProduct, setNewProduct] = useState({
    title: '',
    composer: '',
    difficulty: '',
    price: '',
    image: '',
    category: '',
    description: '',
    youtubeUrl: '',
    pages: '',
    duration: ''
  });

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.composer.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

  const handleAddProduct = async () => {
    if (!newProduct.title || !newProduct.composer || !newProduct.price) {
      alert('제목, 작곡가, 가격은 필수 입력 항목입니다.');
      return;
    }

    let imageUrl = 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=400'; // 기본 이미지
    
    // 이미지 파일이 업로드된 경우 Data URL로 변환 (최우선)
    if (imageFile) {
      try {
        imageUrl = await handleImageUpload(imageFile);
      } catch (error) {
        alert('이미지 업로드 중 오류가 발생했습니다.');
        return;
      }
    } else if (newProduct.image && newProduct.image.trim() !== '') {
      // 이미지 파일이 없고 URL이 입력된 경우
      imageUrl = newProduct.image;
    }

    const product = {
      id: `product_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      title: newProduct.title,
      composer: newProduct.composer,
      difficulty: newProduct.difficulty || '중급',
      price: parseInt(newProduct.price),
      image: imageUrl,
      category: newProduct.category || '가요',
      description: newProduct.description || '',
      youtubeUrl: newProduct.youtubeUrl || '',
      pages: parseInt(newProduct.pages) || 0,
      duration: newProduct.duration || ''
    };

    const updatedProducts = [...products, product];
    
    // 로컬 스토리지에 저장
    try {
      const dataString = JSON.stringify(updatedProducts);
      localStorage.setItem('admin_products', dataString);
      
      // 저장 성공 확인
      const savedData = localStorage.getItem('admin_products');
      if (!savedData || savedData !== dataString) {
        throw new Error('로컬 스토리지 저장 실패');
      }
      
      setProducts(updatedProducts);
    } catch (error) {
      console.error('로컬 스토리지 저장 오류:', error);
      alert('이미지가 너무 커서 저장할 수 없습니다. 더 작은 이미지를 사용해주세요.');
      return;
    }
    
    setNewProduct({
      title: '',
      composer: '',
      difficulty: '',
      price: '',
      image: '',
      category: '',
      description: '',
      youtubeUrl: '',
      pages: '',
      duration: ''
    });
    setImageFile(null);
    setIsAddDialogOpen(false);
    alert('상품이 성공적으로 추가되었습니다.');
  };

  // 상품 수정 함수
  const handleEditProduct = (product: any) => {
    setEditingProduct(product);
    setImageFile(null); // 이미지 파일 상태 초기화
    setNewProduct({
      title: product.title,
      composer: product.composer,
      difficulty: product.difficulty,
      price: product.price.toString(),
      image: product.image,
      category: product.category,
      description: product.description,
      youtubeUrl: product.youtubeUrl,
      pages: product.pages.toString(),
      duration: product.duration
    });
    setIsEditDialogOpen(true);
  };

  // 상품 수정 저장
  const handleUpdateProduct = async () => {
    if (!newProduct.title || !newProduct.composer || !newProduct.price) {
      alert('제목, 작곡가, 가격은 필수 입력 항목입니다.');
      return;
    }

    let imageUrl = editingProduct.image; // 기존 이미지 유지
    
    // 이미지 파일이 업로드된 경우 Data URL로 변환 (최우선)
    if (imageFile) {
      try {
        console.log('이미지 파일 업로드 시작:', imageFile.name, imageFile.size);
        imageUrl = await handleImageUpload(imageFile);
        console.log('이미지 변환 완료, Data URL 길이:', imageUrl.length);
      } catch (error) {
        console.error('이미지 업로드 오류:', error);
        alert('이미지 업로드 중 오류가 발생했습니다: ' + error.message);
        return;
      }
    } else if (newProduct.image && newProduct.image.trim() !== '') {
      // 이미지 파일이 없고 URL이 입력된 경우 (빈 문자열이 아닌 경우만)
      imageUrl = newProduct.image;
      console.log('URL 입력 사용:', imageUrl);
    }
    // newProduct.image가 비어있으면 기존 이미지(editingProduct.image) 유지

    const updatedProduct = {
      ...editingProduct,
      title: newProduct.title,
      composer: newProduct.composer,
      difficulty: newProduct.difficulty || '중급',
      price: parseInt(newProduct.price),
      image: imageUrl,
      category: newProduct.category || '가요',
      description: newProduct.description || '',
      youtubeUrl: newProduct.youtubeUrl || '',
      pages: parseInt(newProduct.pages) || 0,
      duration: newProduct.duration || ''
    };
    
    console.log('업데이트할 상품:', updatedProduct.title, '이미지 URL:', updatedProduct.image.substring(0, 50) + '...');

    const updatedProducts = products.map(p => 
      p.id === editingProduct.id ? updatedProduct : p
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
      
      // 저장된 데이터에서 이미지 확인
      const parsedData = JSON.parse(savedData);
      const savedProduct = parsedData.find(p => p.id === editingProduct.id);
      console.log('저장된 상품 이미지:', savedProduct?.image?.substring(0, 50) + '...');
      
      // 상태 업데이트 (새 배열로 강제 리렌더링)
      setProducts([...updatedProducts]);
      
      // 강제 리렌더링을 위한 추가 업데이트
      setTimeout(() => {
        setProducts(prev => [...prev]);
        console.log('강제 리렌더링 완료');
      }, 100);
    } catch (error) {
      console.error('로컬 스토리지 저장 오류:', error);
      alert('이미지가 너무 커서 저장할 수 없습니다. 더 작은 이미지를 사용해주세요.');
      return;
    }
    
    setIsEditDialogOpen(false);
    setEditingProduct(null);
    setImageFile(null);
    setNewProduct({
      title: '',
      composer: '',
      difficulty: '',
      price: '',
      image: '',
      category: '',
      description: '',
      youtubeUrl: '',
      pages: '',
      duration: ''
    });
    alert('상품이 성공적으로 수정되었습니다.');
  };

  // 상품 삭제 함수
  const handleDeleteProduct = (productId: string) => {
    if (confirm('정말로 이 상품을 삭제하시겠습니까?')) {
      const updatedProducts = products.filter(p => p.id !== productId);
      setProducts(updatedProducts);
      localStorage.setItem('admin_products', JSON.stringify(updatedProducts));
      alert('상품이 삭제되었습니다.');
    }
  };

  return (
    <div className="p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div>
            <h1 className="mb-2">Product Management</h1>
            <p className="text-muted-foreground">
              Manage your sheet music catalog
            </p>
          </div>
          
          <Dialog open={isAddDialogOpen} onOpenChange={(open) => {
            setIsAddDialogOpen(open);
            if (!open) setPdfFile(null);
          }}>
            <DialogTrigger asChild>
              <Button className="w-full lg:w-auto">
                <Plus className="w-4 h-4 mr-2" />
                상품 추가
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>새 상품 추가</DialogTitle>
                <DialogDescription>
                  새로운 드럼 악보 상품을 추가하세요. 필수 항목은 제목, 작곡가, 가격입니다.
                </DialogDescription>
              </DialogHeader>
              <form className="space-y-4 mt-4">
                <div>
                  <Label htmlFor="title">상품명 *</Label>
                  <Input 
                    id="title" 
                    placeholder="상품명을 입력하세요" 
                    className="mt-1"
                    value={newProduct.title}
                    onChange={(e) => setNewProduct({...newProduct, title: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="composer">작곡가 *</Label>
                  <Input 
                    id="composer" 
                    placeholder="작곡가명을 입력하세요" 
                    className="mt-1"
                    value={newProduct.composer}
                    onChange={(e) => setNewProduct({...newProduct, composer: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="price">가격 (₩) *</Label>
                    <Input 
                      id="price" 
                      type="number" 
                      placeholder="15000" 
                      className="mt-1"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="pages">페이지 수</Label>
                    <Input 
                      id="pages" 
                      type="number" 
                      placeholder="12" 
                      className="mt-1"
                      value={newProduct.pages}
                      onChange={(e) => setNewProduct({...newProduct, pages: e.target.value})}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">카테고리</Label>
                    <Select value={newProduct.category} onValueChange={(value) => setNewProduct({...newProduct, category: value})}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="카테고리 선택" />
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
                    <Label htmlFor="difficulty">난이도</Label>
                    <Select value={newProduct.difficulty} onValueChange={(value) => setNewProduct({...newProduct, difficulty: value})}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="난이도 선택" />
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
                  <Label htmlFor="description">상품 설명</Label>
                  <Textarea
                    id="description"
                    placeholder="상품 설명을 입력하세요"
                    rows={4}
                    className="mt-1"
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="youtube">YouTube URL (선택사항)</Label>
                  <Input
                    id="youtube"
                    placeholder="https://www.youtube.com/embed/..."
                    className="mt-1"
                    value={newProduct.youtubeUrl}
                    onChange={(e) => setNewProduct({...newProduct, youtubeUrl: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="image">상품 이미지</Label>
                  <div className="mt-2 space-y-2">
                    <div>
                      <input
                        type="file"
                        id="image-upload"
                        accept="image/*"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setImageFile(e.target.files[0]);
                            // URL 입력 필드 비우기
                            setNewProduct({...newProduct, image: ''});
                          }
                        }}
                        className="hidden"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => document.getElementById('image-upload')?.click()}
                        className="w-full"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        {imageFile ? imageFile.name : '이미지 파일 선택'}
                      </Button>
                    </div>
                    {imageFile && (
                      <div className="text-sm text-muted-foreground">
                        <p>파일: {imageFile.name}</p>
                        <p className={imageFile.size > 5 * 1024 * 1024 ? 'text-red-500' : ''}>
                          크기: {(imageFile.size / 1024 / 1024).toFixed(2)} MB
                          {imageFile.size > 5 * 1024 * 1024 && ' (5MB 초과)'}
                        </p>
                      </div>
                    )}
                    <div className="text-xs text-muted-foreground">
                      또는
                    </div>
                    <div className="text-xs text-amber-600 bg-amber-50 p-2 rounded">
                      ⚠️ 이미지 파일 크기는 5MB 이하로 제한됩니다. 큰 이미지는 자동으로 압축됩니다.
                    </div>
                    <Input 
                      id="image" 
                      placeholder="이미지 URL 입력" 
                      className="mt-1"
                      value={newProduct.image}
                      onChange={(e) => {
                        setNewProduct({...newProduct, image: e.target.value});
                        setImageFile(null);
                      }}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="pdf">악보 PDF 파일 *</Label>
                  <div className="mt-2">
                    <input
                      type="file"
                      id="pdf"
                      accept=".pdf"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setPdfFile(e.target.files[0]);
                        }
                      }}
                      className="hidden"
                      required
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById('pdf')?.click()}
                      className="w-full"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      {pdfFile ? pdfFile.name : 'PDF 파일 선택'}
                    </Button>
                  </div>
                  {pdfFile && (
                    <p className="text-sm text-muted-foreground mt-2">
                      파일 크기: {(pdfFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">
                    최대 파일 크기: 50MB
                  </p>
                </div>
                <div className="flex gap-3 pt-4">
                  <Button type="button" onClick={handleAddProduct} className="flex-1">
                    상품 추가
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsAddDialogOpen(false);
                      setPdfFile(null);
                    }}
                    className="flex-1"
                  >
                    취소
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>

          {/* 수정 다이얼로그 */}
          <Dialog open={isEditDialogOpen} onOpenChange={(open) => {
            setIsEditDialogOpen(open);
            if (!open) {
              setEditingProduct(null);
              setImageFile(null);
              setPdfFile(null);
            }
          }}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>상품 수정</DialogTitle>
                <DialogDescription>
                  상품 정보를 수정하세요. 필수 항목은 제목, 작곡가, 가격입니다.
                </DialogDescription>
              </DialogHeader>
              <form className="space-y-4 mt-4">
                <div>
                  <Label htmlFor="edit-title">상품명 *</Label>
                  <Input 
                    id="edit-title" 
                    placeholder="상품명을 입력하세요" 
                    className="mt-1"
                    value={newProduct.title}
                    onChange={(e) => setNewProduct({...newProduct, title: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-composer">작곡가 *</Label>
                  <Input 
                    id="edit-composer" 
                    placeholder="작곡가명을 입력하세요" 
                    className="mt-1"
                    value={newProduct.composer}
                    onChange={(e) => setNewProduct({...newProduct, composer: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="edit-price">가격 (₩) *</Label>
                    <Input 
                      id="edit-price" 
                      type="number" 
                      placeholder="15000" 
                      className="mt-1"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-pages">페이지 수</Label>
                    <Input 
                      id="edit-pages" 
                      type="number" 
                      placeholder="12" 
                      className="mt-1"
                      value={newProduct.pages}
                      onChange={(e) => setNewProduct({...newProduct, pages: e.target.value})}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="edit-category">카테고리</Label>
                    <Select value={newProduct.category} onValueChange={(value) => setNewProduct({...newProduct, category: value})}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="카테고리 선택" />
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
                    <Label htmlFor="edit-difficulty">난이도</Label>
                    <Select value={newProduct.difficulty} onValueChange={(value) => setNewProduct({...newProduct, difficulty: value})}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="난이도 선택" />
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
                  <Label htmlFor="edit-description">상품 설명</Label>
                  <Textarea
                    id="edit-description"
                    placeholder="상품 설명을 입력하세요"
                    rows={4}
                    className="mt-1"
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-youtube">YouTube URL (선택사항)</Label>
                  <Input
                    id="edit-youtube"
                    placeholder="https://www.youtube.com/embed/..."
                    className="mt-1"
                    value={newProduct.youtubeUrl}
                    onChange={(e) => setNewProduct({...newProduct, youtubeUrl: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-image">상품 이미지</Label>
                  <div className="mt-2 space-y-2">
                    <div>
                      <input
                        type="file"
                        id="edit-image-upload"
                        accept="image/*"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setImageFile(e.target.files[0]);
                            // URL 입력 필드 비우기
                            setNewProduct({...newProduct, image: ''});
                          }
                        }}
                        className="hidden"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => document.getElementById('edit-image-upload')?.click()}
                        className="w-full"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        {imageFile ? imageFile.name : '이미지 파일 선택'}
                      </Button>
                    </div>
                    {imageFile && (
                      <div className="text-sm text-muted-foreground">
                        <p>파일: {imageFile.name}</p>
                        <p className={imageFile.size > 5 * 1024 * 1024 ? 'text-red-500' : ''}>
                          크기: {(imageFile.size / 1024 / 1024).toFixed(2)} MB
                          {imageFile.size > 5 * 1024 * 1024 && ' (5MB 초과)'}
                        </p>
                      </div>
                    )}
                    <div className="text-xs text-muted-foreground">
                      또는
                    </div>
                    <div className="text-xs text-amber-600 bg-amber-50 p-2 rounded">
                      ⚠️ 이미지 파일 크기는 5MB 이하로 제한됩니다. 큰 이미지는 자동으로 압축됩니다.
                    </div>
                    <Input
                      id="edit-image"
                      placeholder={`현재: ${editingProduct?.image?.substring(0, 50)}...`}
                      className="mt-1"
                      value={newProduct.image}
                      onChange={(e) => {
                        setNewProduct({...newProduct, image: e.target.value});
                        setImageFile(null);
                      }}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="edit-duration">재생 시간</Label>
                  <Input
                    id="edit-duration"
                    placeholder="4분"
                    className="mt-1"
                    value={newProduct.duration}
                    onChange={(e) => setNewProduct({...newProduct, duration: e.target.value})}
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <Button type="button" onClick={handleUpdateProduct} className="flex-1">
                    수정 저장
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsEditDialogOpen(false);
                      setEditingProduct(null);
                      setImageFile(null);
                      setPdfFile(null);
                    }}
                    className="flex-1"
                  >
                    취소
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="상품 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden lg:block bg-card border border-border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
            <thead className="border-b border-border bg-muted/50">
              <tr className="text-left text-sm text-muted-foreground">
                <th className="p-4">상품</th>
                <th className="p-4">작곡가</th>
                <th className="p-4">카테고리</th>
                <th className="p-4">난이도</th>
                <th className="p-4">가격</th>
                <th className="p-4">페이지</th>
                <th className="p-4">액션</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr 
                  key={product.id} 
                  className="border-b border-border hover:bg-muted/50 cursor-pointer"
                  onClick={() => onNavigate('admin-product-detail', product.id)}
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded overflow-hidden bg-muted flex-shrink-0">
                        <ImageWithFallback
                          src={product.image}
                          alt={product.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span>{product.title}</span>
                    </div>
                  </td>
                  <td className="p-4 text-muted-foreground">{product.composer}</td>
                  <td className="p-4">
                    <Badge variant="secondary">{product.category}</Badge>
                  </td>
                  <td className="p-4">
                    <Badge variant="outline">{product.difficulty}</Badge>
                  </td>
                  <td className="p-4">₩{product.price.toLocaleString()}</td>
                  <td className="p-4 text-muted-foreground">{product.pages}</td>
                  <td className="p-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" onClick={(e) => e.stopPropagation()}>
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={(e) => {
                          e.stopPropagation();
                          handleEditProduct(product);
                        }}>
                          <Edit className="w-4 h-4 mr-2" />
                          수정
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteProduct(product.id);
                          }}
                          className="text-destructive"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          삭제
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden space-y-4">
          {filteredProducts.map((product) => (
            <div 
              key={product.id} 
              className="bg-card border border-border rounded-lg p-4 cursor-pointer active:bg-muted"
              onClick={() => onNavigate('admin-product-detail', product.id)}
            >
              <div className="flex gap-4 mb-4">
                <div className="w-20 h-20 rounded overflow-hidden bg-muted flex-shrink-0">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="truncate mb-1">{product.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {product.composer}
                  </p>
                  <div className="flex gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {product.category}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {product.difficulty}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div>
                  <p className="text-sm text-muted-foreground">가격</p>
                  <p>₩{product.price.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">페이지</p>
                  <p>{product.pages}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
