import React from 'react';
import { useState } from 'react';
import './ResourcesSheet.scss'
import expandArrowDown from '../icons/expand-arrow-down.png';

interface Props {
    // Add props if needed
}


const Resources: React.FC<Props> = () => {

    const [selectedCategory, setSelectedCategory] = useState('Educational Materials');
    const [expandedMenu, setExpandedMenu] = useState<string | null>('Educational Materials');

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
        if (category === expandedMenu) {
            setExpandedMenu(null);
        } else {
            setExpandedMenu(category);
        }
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
                                <li>E-books</li>
                                <li>Worksheets</li>
                                <li>Interactive games</li>
                                <li>Video Tutorials</li>
                            </ul>
                        )}
                    </li>
                    <li onClick={() => handleCategoryChange('Local Events and Activities')} className={selectedCategory === 'Local Events and Activities' ? 'active' : ''}>
                        <img src={expandArrowDown} alt="Expand Arrow" className={expandedMenu === 'Local Events and Activities' ? 'expanded' : 'collapsed'} />
                        Local Events and Activities
                        {expandedMenu === 'Local Events and Activities' && (
                            <ul>
                                <li>Calendar</li>
                                <li>Workshops</li>
                                <li>Meetups</li>
                                <li>Co-op Classes</li>
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
                {selectedCategory === 'Educational Materials' && (
                    <div>
                        {/* Add your Educational Materials content here */}
                    </div>
                )}

                {selectedCategory === 'Local Events and Activities' && (
                    <div>
                        {/* Add your Local Events and Activities content here */}
                    </div>
                )}

                {selectedCategory === 'Community Forms' && (
                    <div>
                        {/* Add your Community Forms content here */}
                    </div>
                )}

                {selectedCategory === 'Expert Directory' && (
                    <div>
                        {/* Add your Expert Directory content here */}
                    </div>
                )}
            </div>
        </div>
    );
};
export default Resources;