import { useState, useEffect, useCallback } from 'react';

export const useURLParams = () => {
  // 1. Keep track of the current query string in React state
  const [queryString, setQueryString] = useState(() => window.location.search);

  // 2. Listen for URL changes to update our React state
  useEffect(() => {
    const handleUrlChange = () => {
      setQueryString(window.location.search);
    };

    window.addEventListener('url-change', handleUrlChange);
    window.addEventListener('popstate', handleUrlChange);

    return () => {
      window.removeEventListener('url-change', handleUrlChange);
      window.removeEventListener('popstate', handleUrlChange);
    };
  }, []);

  // Helper to get a parameter
  const getParam = useCallback((param: string) => {
    const params = new URLSearchParams(queryString);
    return params.get(param);
  }, [queryString]);

  // Helper to update a parameter without page reload
  const setParam = useCallback((param: string, value: string) => {
    const url = new URL(window.location.href);
    url.searchParams.set(param, value);
    
    window.history.pushState({}, '', url.search);
    window.dispatchEvent(new Event('url-change')); // Wake up the state listener
  }, []);

  // Helper to append a parameter
  const appendParam = useCallback((param: string, value: string) => {
    const url = new URL(window.location.href);
    url.searchParams.append(param, value);
    
    window.history.pushState({}, '', url.search);
    window.dispatchEvent(new Event('url-change'));
  }, []);

  return { getParam, setParam, appendParam, queryString };
}