'use client';
import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function DeleteCategoryButton({ id }: { id: string }) {
  const router = useRouter();
  
  const handleDelete = async () => {
    const lang = document.cookie.split('; ').find(row => row.startsWith('locale='))?.split('=')[1] || 'vi';
    const msg = lang === 'vi' ? 'Bạn có chắc chắn muốn xóa danh mục này?' : 'Are you sure you want to delete this category?';
    if (confirm(msg)) {
      try {
        await fetch(`/api/categories/${id}`, { method: 'DELETE' });
        router.refresh();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <button onClick={handleDelete} className="icon-btn text-expense" style={{ background: 'none', border: 'none', padding: '8px', cursor: 'pointer', color: 'var(--color-expense)' }}>
      <Trash2 size={18} />
    </button>
  );
}
