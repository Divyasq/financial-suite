import React, { useState } from 'react';
import { items, Item } from '../data/items';
import { ItemRow } from '../components/ItemRow';
import { Sidebar } from '../components/Sidebar';

export const ItemsPage: React.FC = () => {
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('Active');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Debug: Log items to see if they're properly imported
  console.log('Items:', items);

  const handleItemSelect = (itemId: string) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(itemId)) {
      newSelected.delete(itemId);
    } else {
      newSelected.add(itemId);
    }
    setSelectedItems(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedItems.size === items.length) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(items.map(item => item.id)));
    }
  };

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !categoryFilter || item.reportingCategory.includes(categoryFilter);
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="items-page">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className={`main-content ${sidebarOpen ? 'with-sidebar' : ''}`}>
        <div className="page-header">
          <div className="header-controls">
            <div className="search-filters">
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="filter-select"
              >
                <option value="">Category</option>
                <option value="General Merchandise">General Merchandise</option>
                <option value="Tactical">Tactical</option>
                <option value="Other">Other</option>
                <option value="Coffee">Coffee</option>
                <option value="Electronics">Electronics</option>
                <option value="TVs">TVs</option>
              </select>

              <select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="filter-select"
              >
                <option value="All">Locations All</option>
                <option value="Location 1">Location 1</option>
                <option value="Location 2">Location 2</option>
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="filter-select"
              >
                <option value="Active">Status Active</option>
                <option value="Inactive">Status Inactive</option>
              </select>

              <button className="filter-btn">⚙ All filters</button>
            </div>

            <div className="action-buttons">
              <button className="actions-btn">Actions ▼</button>
              <button className="create-item-btn">Create Item</button>
            </div>
          </div>
        </div>

        <div className="items-table-container">
          <table className="items-table">
            <thead>
              <tr>
                <th className="checkbox-header">
                  <input
                    type="checkbox"
                    checked={selectedItems.size === items.length && items.length > 0}
                    onChange={handleSelectAll}
                  />
                </th>
                <th>Item</th>
                <th>Reporting category</th>
                <th>Locations</th>
                <th>Stock on hand</th>
                <th>Available to sell</th>
                <th>Price</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <ItemRow
                  key={item.id}
                  item={item}
                  isSelected={selectedItems.has(item.id)}
                  onSelect={handleItemSelect}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
