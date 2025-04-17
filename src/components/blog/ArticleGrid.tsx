
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface Article {
  title: string;
  image: string;
  category: string;
  slug: string;
}

interface ArticleGridProps {
  articles: Article[];
}

const ArticleGrid = ({ articles }: ArticleGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article) => (
        <Card key={article.slug} className="overflow-hidden hover:shadow-lg transition-shadow">
          <CardContent className="p-0">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="text-sm text-muted-foreground mb-2">{article.category}</div>
              <h3 className="text-xl font-semibold leading-tight hover:text-blue-600 transition-colors">
                {article.title}
              </h3>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ArticleGrid;
