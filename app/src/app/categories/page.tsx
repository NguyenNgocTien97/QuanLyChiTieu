import { getDefaultUser } from '@/lib/user';
import { prisma } from '@/lib/prisma';
import { translateCategory } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { ArrowLeft, Plus } from 'lucide-react';
import Link from 'next/link';
import { cookies } from 'next/headers';
import './Categories.css';
import DeleteCategoryButton from './DeleteCategoryButton';

export default async function CategoriesPage() {
  const user = await getDefaultUser();
  const cookieStore = await cookies();
  const lang = cookieStore.get('locale')?.value || 'vi';

  const categories = await prisma.category.findMany({
    where: { userId: user.id }
  });

  return (
    <main className="categories-page">
      <header className="page-header sticky-header">
        <Link href="/profile"><ArrowLeft size={24} className="icon-btn" /></Link>
        <h1 className="title-center">{lang === 'vi' ? 'Danh Mục' : 'Categories'}</h1>
        <div style={{ width: 24 }}></div>
      </header>

      <div className="category-list">
        <Card className="category-card">
          {categories.map(c => (
            <div key={c.id} className="category-item">
              <div className="category-icon" style={{ backgroundColor: `${c.color}15`, color: c.color }}>
                {translateCategory(c.name, lang).charAt(0)}
              </div>
              <div className="category-info">
                <p className="category-name">{translateCategory(c.name, lang)}</p>
                <p className="category-type">{c.type === 'EXPENSE' ? (lang === 'vi' ? 'Chi tiêu' : 'Expense') : (lang === 'vi' ? 'Thu nhập' : 'Income')}</p>
              </div>
              <DeleteCategoryButton id={c.id} />
            </div>
          ))}
        </Card>
      </div>

      <div className="add-button-container">
        <Link href="/categories/add" className="add-category-btn" style={{ textDecoration: 'none' }}>
          <Plus size={20} />
          <span>{lang === 'vi' ? 'Thêm danh mục mới' : 'Add new category'}</span>
        </Link>
      </div>
    </main>
  );
}
