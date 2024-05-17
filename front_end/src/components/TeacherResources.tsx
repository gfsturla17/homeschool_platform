import React from 'react';
import { useState } from 'react';
import './TeacherResourcesSheet.scss'
import expandArrowDown from '../icons/expand-arrow-down.png';
import FileUpload from './FileUpload'; // Import the FileUpload component

interface Props {}

const TeacherResources: React.FC<Props> = () => {

    const [selectedCategory, setSelectedCategory] = useState('Lesson Plans');
    const [expandedMenu, setExpandedMenu] = useState<string | null>('Lesson Plans');
    const [showFileUpload, setShowFileUpload] = useState(false); // New state variable to track whether to show the FileUpload component
    const [selectedSubcategory, setSelectedSubcategory] = useState('');

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
        if (category === expandedMenu) {
            setExpandedMenu(null);
        } else {
            setExpandedMenu(category);
        }
        setShowFileUpload(false); // Hide the FileUpload component when a new category is selected
    };

    const handleSubcategoryChange = (e: React.MouseEvent<HTMLLIElement>, subcategory: string) => {
        e.stopPropagation(); // Prevent the event from propagating to the parent element
        setSelectedSubcategory(subcategory);
        setShowFileUpload(true); // Show the FileUpload component when a subcategory is clicked
    };

    return (
        <div className="teacher-resources-container">
            <div className="menu">
                <h1>Teacher Resources</h1>
                <hr />
                <h2>Teacher Dashboard</h2>
                <ul>
                    <li onClick={() => handleCategoryChange('Lesson Plans')} className={selectedCategory === 'Lesson Plans' ? 'active' : ''}>
                        <img src={expandArrowDown} alt="Expand Arrow" className={expandedMenu === 'Lesson Plans' ? 'expanded' : 'collapsed'} />
                        Lesson Plans
                    </li>
                    <li onClick={() => handleCategoryChange('Resources')} className={selectedCategory === 'Resources' ? 'active' : ''}>
                        <img src={expandArrowDown} alt="Expand Arrow" className={expandedMenu === 'Resources' ? 'expanded' : 'collapsed'} />
                        Resources
                        {expandedMenu === 'Resources' && (
                            <ul>
                                <li onClick={(e) => handleSubcategoryChange(e, 'Videos')}>Videos</li>
                                <li onClick={(e) => handleSubcategoryChange(e, 'Worksheets')}>Worksheets</li>
                                <li onClick={(e) => handleSubcategoryChange(e, 'Ebooks')}>Ebooks</li>
                            </ul>
                        )}
                    </li>
                    <li onClick={() => handleCategoryChange('Blog Posts')} className={selectedCategory === 'Blog Posts' ? 'active' : ''}>
                        <img src={expandArrowDown} alt="Expand Arrow" className={expandedMenu === 'Blog Posts' ? 'expanded' : 'collapsed'} />
                        Blog Posts
                    </li>
                </ul>
            </div>

            <div className="content">
                {showFileUpload ? (
                    <FileUpload />
                ) : (
                    <div>
                        <h2>{selectedCategory}</h2>
                        <p>{selectedSubcategory}</p>
                    </div>
                )}
            </div>
        </div>
    );
};
export default TeacherResources;