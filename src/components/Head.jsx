import { useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * A modern replacement for react-helmet that doesn't use deprecated lifecycle methods
 * This component updates document metadata without triggering React warnings
 */
const Head = ({ title, description, keywords }) => {
  useEffect(() => {
    // Update document title
    if (title) {
      document.title = title;
    }
    
    // Update meta tags
    const updateMetaTag = (name, content) => {
      if (!content) return;
      
      // Try to find existing meta tag
      let meta = document.querySelector(`meta[name="${name}"]`);
      
      // If it doesn't exist, create it
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', name);
        document.head.appendChild(meta);
      }
      
      // Set the content
      meta.setAttribute('content', content);
    };
    
    // Update specific meta tags
    if (description) updateMetaTag('description', description);
    if (keywords) updateMetaTag('keywords', keywords);
    
    // Cleanup function to handle component unmount
    return () => {
      // Optional: remove meta tags on unmount if needed
      // This is usually not necessary as they'll be updated by the next component
    };
  }, [title, description, keywords]); // Re-run effect when these props change
  
  // This component doesn't render anything
  return null;
};

Head.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  keywords: PropTypes.string
};

export default Head;
