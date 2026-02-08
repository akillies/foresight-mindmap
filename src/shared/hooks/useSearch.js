/**
 * useSearch Hook
 * Handles debounced search functionality for the mind map
 */
import { useState, useRef, useEffect, useCallback } from 'react';

/**
 * Custom hook for debounced search
 * @param {number} debounceMs - Debounce delay in milliseconds (default 300)
 * @returns {Object} Search state and handlers
 */
export function useSearch(debounceMs = 300) {
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const debounceRef = useRef(null);

  // Debounced search handler - waits for user to stop typing
  const handleSearchInput = useCallback((value) => {
    setSearchInput(value); // Update input immediately for responsive UI

    // Clear previous timeout
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // Set new timeout to update search query
    debounceRef.current = setTimeout(() => {
      setSearchQuery(value);
    }, debounceMs);
  }, [debounceMs]);

  // Clear search
  const clearSearch = useCallback(() => {
    setSearchInput('');
    setSearchQuery('');
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
  }, []);

  // Cleanup debounce timeout on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  return {
    searchInput,
    searchQuery,
    handleSearchInput,
    clearSearch,
  };
}
