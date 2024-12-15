'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';

import { getAutoSuggestion } from '@/action/get-auto-suggestion';

import { FilmIcon } from 'lucide-react';

import { Card } from './ui/card';

const AutoSuggestionBox = ({ movieName }: { movieName: string }) => {
  const [autoSuggestionData, setAutoSuggestionData] = useState<String[] | any>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAutoSuggestionData = async () => {
      if (!movieName.trim()) {
        setAutoSuggestionData([]);
        return;
      }
      setIsLoading(true);
      try {
        const response = await getAutoSuggestion(movieName);
        if (response.success && response.data) {
          setAutoSuggestionData(response.data);
        } else {
          setAutoSuggestionData([]);
        }
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        setAutoSuggestionData([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAutoSuggestionData();
  }, [movieName]);

  return (
    <div className="relative w-full">
      {isLoading && (
        <div className="absolute right-3 top-3">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></div>
        </div>
      )}

      {autoSuggestionData.length > 0 && (
        <Card className="absolute z-10 mt-1 w-[400px] rounded-md bg-background/90 py-4 shadow-lg transition duration-1000 ease-in-out">
          <ul className="max-h-60 overflow-auto py-1">
            {autoSuggestionData.map((suggestion: any, index: any) => (
              <Link href={`/movie/${suggestion}`} key={index}>
                <li className="flex cursor-pointer items-center gap-x-2 px-4 py-2 text-sm hover:text-primary">
                  <FilmIcon />
                  <span>{suggestion.toString()}</span>
                </li>
              </Link>
            ))}
          </ul>
        </Card>
      )}
    </div>
  );
};

export default AutoSuggestionBox;
