'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FaDev, FaCalendar, FaHeart, FaComment } from 'react-icons/fa';

interface BlogPost {
  id: number;
  title: string;
  description: string;
  url: string;
  published_at: string;
  positive_reactions_count: number;
  comments_count: number;
  tag_list: string[];
}

const cardStyles = [
  {
    border: 'border-purple-500',
    hover: 'hover:bg-purple-600',
    shadow: 'hover:shadow-purple-500/20'
  },
  {
    border: 'border-blue-500',
    hover: 'hover:bg-blue-600',
    shadow: 'hover:shadow-blue-500/20'
  },
  {
    border: 'border-green-500',
    hover: 'hover:bg-green-600',
    shadow: 'hover:shadow-green-500/20'
  }
];

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://dev.to/api/articles?username=danudenny&per_page=3');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <motion.section 
      className="py-12"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="brutal-heading mb-12">BLOG POSTS</h2>
      
      {loading ? (
        <div className="flex justify-center items-center h-48">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
        </div>
      ) : (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          initial="hidden"
          animate="show"
        >
          {posts.map((post, index) => {
            const style = cardStyles[index % cardStyles.length];
            return (
              <motion.a
                key={post.id}
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`brutal-box p-6 transition-all duration-300 group h-full flex flex-col relative overflow-hidden
                  ${style.hover} hover:text-white border-2 ${style.border} ${style.shadow}
                  hover:shadow-lg hover:-translate-y-0.5`}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 }
                }}
                whileHover={{ scale: 1.02 }}
              >
                <motion.div 
                  className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                />
                <div className="relative z-10">
                  <div className="flex items-center gap-2 text-sm mb-3">
                    <FaDev className="w-4 h-4" />
                    <span className="opacity-60">dev.to</span>
                  </div>

                  <h3 className="text-lg font-bold mb-3 flex-grow">{post.title}</h3>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tag_list.slice(0, 3).map((tag) => (
                      <span 
                        key={tag}
                        className="px-2 py-1 text-sm border border-current bg-white text-black 
                          group-hover:bg-transparent group-hover:text-white group-hover:border-white
                          transition-colors duration-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <FaCalendar className="w-4 h-4" />
                      <span>{formatDate(post.published_at)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaHeart className="w-4 h-4" />
                      <span>{post.positive_reactions_count}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaComment className="w-4 h-4" />
                      <span>{post.comments_count}</span>
                    </div>
                  </div>
                </div>
              </motion.a>
            );
          })}
        </motion.div>
      )}
    </motion.section>
  );
}
