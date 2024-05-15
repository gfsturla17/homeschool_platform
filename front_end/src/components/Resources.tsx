import React from 'react';
import { useState } from 'react';
import './ResourcesSheet.scss'
import expandArrowDown from '../icons/expand-arrow-down.png';
import FileUpload from './FileUpload'; // Import the FileUpload component

interface Props {
    // Add props if needed
}

const Resources: React.FC<Props> = () => {

    const [selectedCategory, setSelectedCategory] = useState('Educational Materials');
    const [expandedMenu, setExpandedMenu] = useState<string | null>('Educational Materials');
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
        setShowFileUpload(false); // Hide the FileUpload component when a subcategory is clicked
    };

    const handleVideoTutorialClick = (e: React.MouseEvent<HTMLLIElement>) => {
        e.stopPropagation(); // Prevent the event from propagating to the parent element
        setShowFileUpload(true);
    };

    return (
        <div className="resources-container">
            <div className="menu">
                <h1>Resources</h1>
                <hr />
                <h2>Categories</h2>
                <ul>
                    <li onClick={() => handleCategoryChange('Educational Materials')} className={selectedCategory === 'Educational Materials' ? 'active' : ''}>
                        <img src={expandArrowDown} alt="Expand Arrow" className={expandedMenu === 'Educational Materials' ? 'expanded' : 'collapsed'} />
                        Educational Materials
                        {expandedMenu === 'Educational Materials' && (
                            <ul>
                                <li onClick={(e) => handleSubcategoryChange(e, 'E-books')}>E-books</li>
                                <li onClick={(e) => handleSubcategoryChange(e, 'Worksheets')}>Worksheets</li>
                                <li onClick={(e) => handleSubcategoryChange(e, 'Interactive games')}>Interactive games</li>
                                <li onClick={handleVideoTutorialClick}>Video Tutorials</li>
                            </ul>
                        )}
                    </li>
                    <li onClick={() => handleCategoryChange('Local Events and Activities')} className={selectedCategory === 'Local Events and Activities' ? 'active' : ''}>
                        <img src={expandArrowDown} alt="Expand Arrow" className={expandedMenu === 'Local Events and Activities' ? 'expanded' : 'collapsed'} />
                        Local Events and Activities
                        {expandedMenu === 'Local Events and Activities' && (
                            <ul>
                                <li onClick={(e) => handleSubcategoryChange(e, 'Calendar')}>Calendar</li>
                                <li onClick={(e) => handleSubcategoryChange(e, 'Workshops')}>Workshops</li>
                                <li onClick={(e) => handleSubcategoryChange(e, 'Meetups')}>Meetups</li>
                                <li onClick={(e) => handleSubcategoryChange(e, 'Co-op Classes')}>Co-op Classes</li>
                            </ul>
                        )}
                    </li>
                    <li onClick={() => handleCategoryChange('Community Forms')} className={selectedCategory === 'Community Forms' ? 'active' : ''}>
                        <img src={expandArrowDown} alt="Expand Arrow" className={expandedMenu === 'Community Forms' ? 'expanded' : 'collapsed'} />
                        Community Forms
                    </li>
                    <li onClick={() => handleCategoryChange('Expert Directory')} className={selectedCategory === 'Expert Directory' ? 'active' : ''}>
                        <img src={expandArrowDown} alt="Expand Arrow" className={expandedMenu === 'Expert Directory' ? 'expanded' : 'collapsed'} />
                        Expert Directory
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
export default Resources;