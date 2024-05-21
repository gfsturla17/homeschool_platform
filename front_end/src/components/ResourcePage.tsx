import React, { useState } from 'react';
import './ResourcesPage.css';
import { FaPlus, FaTrash, FaEdit, FaEye, FaSearch, FaFileAlt, FaVideo, FaBook, FaLink } from 'react-icons/fa';

interface Resource {
  id: number;
  title: string;
  link: string;
  type: 'video' | 'ebook' | 'document' | 'worksheet' | 'link';
  description: string;
}

const ResourcesPage: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>([
    { id: 1, title: 'Algebra Basics', link: '#', type: 'document', description: 'A basic guide to Algebra.' },
    { id: 2, title: 'Chemistry 101', link: '#', type: 'video', description: 'An introduction to Chemistry.' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editResource, setEditResource] = useState<Resource | null>(null);
  const [newResource, setNewResource] = useState<{ title: string; link: string; type: 'video' | 'ebook' | 'document' | 'worksheet' | 'link'; description: string }>({ title: '', link: '', type: 'document', description: '' });
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewResource({ ...newResource, [name]: value });
  };

  const handleAddResource = (e: React.FormEvent) => {
    e.preventDefault();
    if (editResource) {
      setResources(resources.map(resource => resource.id === editResource.id ? { ...editResource, ...newResource } : resource));
      setEditResource(null);
    } else {
      const newId = resources.length > 0 ? resources[resources.length - 1].id + 1 : 1;
      setResources([...resources, { id: newId, ...newResource }]);
    }
    setNewResource({ title: '', link: '', type: 'document', description: '' });
    setIsModalOpen(false);
  };

  const handleDeleteResource = (id: number) => {
    setResources(resources.filter(resource => resource.id !== id));
  };

  const handleEditResource = (resource: Resource) => {
    setEditResource(resource);
    setNewResource({ title: resource.title, link: resource.link, type: resource.type, description: resource.description });
    setIsModalOpen(true);
  };

  const handleOpenModal = () => {
    setEditResource(null);
    setNewResource({ title: '', link: '', type: 'document', description: '' });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const filteredResources = resources.filter(resource =>
    resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <FaVideo />;
      case 'ebook':
        return <FaBook />;
      case 'document':
        return <FaFileAlt />;
      case 'worksheet':
        return <FaFileAlt />;
      case 'link':
        return <FaLink />;
      default:
        return <FaFileAlt />;
    }
  };

  return (
    <div className="resources-page">
      <aside className="sidebar">
        <h2>Resources</h2>
        <nav>
          <ul>
            <li>All Resources</li>
            <li>Videos</li>
            <li>eBooks</li>
            <li>Documents</li>
            <li>Worksheets</li>
            <li>Links</li>
          </ul>
        </nav>
      </aside>
      <div className="main-content">
        <header className="header">
          <h2>Manage Resources</h2>
          <div className="search-bar">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search resources..."
            />
            <FaSearch />
          </div>
          <button className="open-modal-button" onClick={handleOpenModal}><FaPlus /> Add New Resource</button>
        </header>
        <section className="resource-list">
          {filteredResources.map(resource => (
            <div key={resource.id} className="resource-card">
              <div className="resource-icon">
                {getResourceIcon(resource.type)}
              </div>
              <div className="resource-info">
                <h3>{resource.title}</h3>
                <p>{resource.description}</p>
                <p><strong>Type:</strong> {resource.type}</p>
              </div>
              <div className="resource-actions">
                <a href={resource.link} target="_blank" rel="noopener noreferrer"><FaEye /> View</a>
                <button onClick={() => handleEditResource(resource)}><FaEdit /> Edit</button>
                <button onClick={() => handleDeleteResource(resource.id)}><FaTrash /> Delete</button>
              </div>
            </div>
          ))}
        </section>

        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <h3>{editResource ? 'Edit Resource' : 'Add New Resource'}</h3>
              <form onSubmit={handleAddResource}>
                <input
                  type="text"
                  name="title"
                  value={newResource.title}
                  onChange={handleInputChange}
                  placeholder="Resource Title"
                  required
                />
                <input
                  type="text"
                  name="link"
                  value={newResource.link}
                  onChange={handleInputChange}
                  placeholder="Resource Link"
                  required
                />
                <select
                  name="type"
                  value={newResource.type}
                  onChange={handleInputChange}
                  required
                >
                  <option value="" disabled>Select Type</option>
                  <option value="video">Video</option>
                  <option value="ebook">eBook</option>
                  <option value="document">Document</option>
                  <option value="worksheet">Worksheet</option>
                  <option value="link">Link</option>
                </select>
                <textarea
                  name="description"
                  value={newResource.description}
                  onChange={handleInputChange}
                  placeholder="Resource Description"
                  required
                ></textarea>
                <div className="modal-actions">
                  <button type="submit">{editResource ? 'Save Changes' : 'Add Resource'}</button>
                  <button type="button" onClick={handleCloseModal}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResourcesPage;
