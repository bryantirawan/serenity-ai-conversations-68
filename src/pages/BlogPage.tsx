
import React from 'react';
import { Brain, Moon, Sparkles, Sun } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BlogHero from '@/components/blog/BlogHero';
import ArticleGrid from '@/components/blog/ArticleGrid';
import CategoryCard from '@/components/blog/CategoryCard';

const categories = [
  { icon: Brain, title: 'Mental Health', color: 'bg-sky-100', iconColor: 'text-sky-500' },
  { icon: Moon, title: 'Meditation', color: 'bg-orange-100', iconColor: 'text-orange-500' },
  { icon: Sparkles, title: 'Mindfulness', color: 'bg-blue-100', iconColor: 'text-blue-500' },
  { icon: Sun, title: 'Sleep', color: 'bg-purple-100', iconColor: 'text-purple-500' },
];

const articles = [
  {
    title: 'Nurturing Your Mind and Body on Your Fertility Journey',
    image: '/lovable-uploads/c16a6b73-3d5b-494e-9604-9a2e6d5a4264.png',
    category: 'Mental Health',
    slug: 'nurturing-mind-body'
  },
  {
    title: 'From stress relief to social bonding: exploring the physical and mental health benefits of laughter',
    image: '/lovable-uploads/4b0f7a31-4816-4457-bdc7-febb3c1b4591.png',
    category: 'Wellbeing',
    slug: 'stress-relief-social-bonding'
  },
  {
    title: '12 ways to boost your self-confidence',
    image: '/lovable-uploads/193fa84a-4dff-4ac6-ab6a-d83c134fff5b.png',
    category: 'Mental Health',
    slug: 'boost-self-confidence'
  }
];

const BlogPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <BlogHero />
        
        <section className="py-16 px-4 md:px-8 bg-background">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Explore articles by category</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category) => (
                <CategoryCard key={category.title} {...category} />
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 px-4 md:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Latest mental health and wellbeing articles</h2>
            <ArticleGrid articles={articles} />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPage;
