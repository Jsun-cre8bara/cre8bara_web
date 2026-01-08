import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from 'sonner';

export function ContactForm() {
  const [formData, setFormData] = useState({
    category: '',
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // FormData를 mailto 링크로 변환
    const subject = encodeURIComponent(`[${formData.category}] ${formData.name}님의 문의`);
    const body = encodeURIComponent(
      `이름: ${formData.name}\n` +
      `이메일: ${formData.email}\n` +
      `연락처: ${formData.phone}\n` +
      `분류: ${formData.category}\n\n` +
      `문의 내용:\n${formData.message}`
    );
    
    // 이메일 클라이언트 열기
    window.location.href = `mailto:Cre8bara@gmail.com?subject=${subject}&body=${body}`;
    
    toast.success('문의가 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.');
    setFormData({ category: '', name: '', email: '', phone: '', message: '' });
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl mb-4">문의하기</h2>
          <p className="text-gray-600">
            궁금하신 사항이 있으시면 언제든지 연락주세요
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="category">분류</Label>
              <Select 
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">일반 문의</SelectItem>
                  <SelectItem value="service">서비스 문의</SelectItem>
                  <SelectItem value="support">기술 지원</SelectItem>
                  <SelectItem value="partnership">파트너십</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="name">성함</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="홍길동"
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="email">이메일</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="example@email.com"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">연락처</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="010-1234-5678"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="message">문의 내용</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="문의하실 내용을 작성해주세요"
              rows={6}
              required
            />
          </div>
          
          <Button type="submit" className="w-full">
            문의하기
          </Button>
        </form>
      </div>
    </section>
  );
}