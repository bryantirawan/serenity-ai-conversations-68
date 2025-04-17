
import React from 'react';
import { Button } from '@/components/ui/button';

const BlogHero = () => {
  return (
    <section className="py-16 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Skyhug Articles</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Explore and enjoy hundreds of articles that are intended to educate and inspire. 
              Whatever your mood or goal, feel free to browse our expert-informed articles on meditation, 
              mindfulness, mental health, sleep, and overall well-being.
            </p>
            <Button size="lg" className="rounded-full">
              Try for free
            </Button>
          </div>
          <div className="flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="absolute inset-0 bg-blue-500/10 backdrop-blur-xl rounded-full" />
              <img
                src="/placeholder.svg"
                alt="Article illustration"
                className="relative z-10 w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogHero;
