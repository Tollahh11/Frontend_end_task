import React, { useState, useEffect, useCallback } from 'react';
import { Search, Star, GitFork, User, Calendar, ExternalLink, Loader2, AlertCircle } from 'lucide-react';

const GitHubSearchApp = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sortBy, setSortBy] = useState('stars');
  const [language, setLanguage] = useState('');
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  // Debounced search function
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  // Fetch repositories from GitHub API
  const fetchRepositories = async (query, page = 1, sort = 'stars', lang = '') => {
    if (!query.trim()) {
      setRepositories([]);
      setTotalCount(0);
      return;
    }

    setLoading(true);
    setError('');

    try {
      let searchQuery = `${query} in:name,description`;
      if (lang) searchQuery += ` language:${lang}`;

      const response = await fetch(
        `https://api.github.com/search/repositories?q=${encodeURIComponent(searchQuery)}&sort=${sort}&order=desc&page=${page}&per_page=12`
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setRepositories(data.items || []);
      setTotalCount(data.total_count || 0);
    } catch (err) {
      setError(err.message || 'Failed to fetch repositories');
      setRepositories([]);
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  };

  // Debounced search with 500ms delay
  const debouncedSearch = useCallback(
    debounce((query, page, sort, lang) => {
      fetchRepositories(query, page, sort, lang);
    }, 500),
    []
  );

  // Effect for handling search with debouncing
  useEffect(() => {
    debouncedSearch(searchTerm, currentPage, sortBy, language);
  }, [searchTerm, currentPage, sortBy, language, debouncedSearch]);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  // Handle sort change
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setCurrentPage(1);
  };

  // Handle language filter change
  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
    setCurrentPage(1);
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Format number with commas
  const formatNumber = (num) => {
    return num.toLocaleString();
  };

  return (
    <div className="app-container">
      <div className="content-wrapper">
        {/* Header */}
        <div className="header">
          <h1 className="main-title">GitHub Repository Explorer</h1>
          <p className="subtitle">Discover amazing open-source projects</p>
        </div>

        {/* Search and Filters */}
        <div className="search-container">
          {/* Search Input */}
          <div className="search-input-wrapper">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Search repositories..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="search-input"
            />
          </div>

          {/* Filters */}
          <div className="filters-container">
            <div className="filter-group">
              <label className="filter-label">Sort by:</label>
              <select
                value={sortBy}
                onChange={handleSortChange}
                className="filter-select"
              >
                <option value="stars">Stars</option>
                <option value="forks">Forks</option>
                <option value="updated">Recently Updated</option>
                <option value="created">Recently Created</option>
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Language:</label>
              <select
                value={language}
                onChange={handleLanguageChange}
                className="filter-select"
              >
                <option value="">All Languages</option>
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="typescript">TypeScript</option>
                <option value="go">Go</option>
                <option value="rust">Rust</option>
                <option value="cpp">C++</option>
                <option value="csharp">C#</option>
              </select>
            </div>
          </div>

          {/* Results Count */}
          {searchTerm && !loading && (
            <div className="results-count">
              {totalCount > 0 ? `Found ${formatNumber(totalCount)} repositories` : 'No repositories found'}
            </div>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="loading-container">
            <Loader2 className="loading-spinner" />
            <span className="loading-text">Searching repositories...</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="error-container">
            <div className="error-content">
              <AlertCircle className="error-icon" />
              <div>
                <h3 className="error-title">Error</h3>
                <p className="error-message">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Repository Grid */}
        {!loading && !error && repositories.length > 0 && (
          <div className="repo-grid">
            {repositories.map((repo) => (
              <div key={repo.id} className="repo-card">
                <div className="repo-content">
                  {/* Repository Header */}
                  <div className="repo-header">
                    <div className="repo-info">
                      <h3 className="repo-name">{repo.name}</h3>
                      <div className="repo-owner">
                        <User className="owner-icon" />
                        <span>{repo.owner.login}</span>
                      </div>
                    </div>
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="external-link"
                    >
                      <ExternalLink className="external-icon" />
                    </a>
                  </div>

                  {/* Description */}
                  <p className="repo-description">
                    {repo.description || 'No description available'}
                  </p>

                  {/* Language */}
                  {repo.language && (
                    <div className="language-container">
                      <span className="language-badge">
                        {repo.language}
                      </span>
                    </div>
                  )}

                  {/* Stats */}
                  <div className="repo-stats">
                    <div className="stat-item">
                      <Star className="stat-icon star-icon" />
                      <span>{formatNumber(repo.stargazers_count)}</span>
                    </div>
                    <div className="stat-item">
                      <GitFork className="stat-icon fork-icon" />
                      <span>{formatNumber(repo.forks_count)}</span>
                    </div>
                    <div className="stat-item">
                      <Calendar className="stat-icon calendar-icon" />
                      <span>{formatDate(repo.updated_at)}</span>
                    </div>
                  </div>

                  {/* Topics */}
                  {repo.topics && repo.topics.length > 0 && (
                    <div className="topics-container">
                      {repo.topics.slice(0, 3).map((topic) => (
                        <span key={topic} className="topic-tag">
                          {topic}
                        </span>
                      ))}
                      {repo.topics.length > 3 && (
                        <span className="topic-tag more-topics">
                          +{repo.topics.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && searchTerm && repositories.length === 0 && (
          <div className="empty-state">
            <Search className="empty-icon" />
            <h3 className="empty-title">No repositories found</h3>
            <p className="empty-message">Try adjusting your search terms or filters</p>
          </div>
        )}

        {/* Initial State */}
        {!loading && !error && !searchTerm && (
          <div className="initial-state">
            <Search className="initial-icon" />
            <h3 className="initial-title">Start exploring</h3>
            <p className="initial-message">Search for repositories to discover amazing projects</p>
          </div>
        )}

        {/* Pagination */}
        {!loading && !error && repositories.length > 0 && totalCount > 12 && (
          <div className="pagination-container">
            <div className="pagination">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="pagination-btn prev-btn"
              >
                Previous
              </button>
              <span className="current-page">
                Page {currentPage}
              </span>
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={repositories.length < 12}
                className="pagination-btn next-btn"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GitHubSearchApp;