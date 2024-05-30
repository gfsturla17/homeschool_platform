import React, { useState, useEffect } from 'react';

const FileUpload = () => {
    const [title, setTitle] = useState('');
    const [file, setFile] = useState(null);
    const [lessonPlans, setLessonPlans] = useState([]);
    const [selectedLessonPlan, setSelectedLessonPlan] = useState('');
    const [newLessonPlan, setNewLessonPlan] = useState('');
    const [isPrivate, setIsPrivate] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetch('http://127.0.0.1:3000/teachers/lesson-plans')
            .then((res) => res.json())
            .then((data) => {
                setLessonPlans(data.lessonPlans);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleLessonPlanChange = (e) => {
        setSelectedLessonPlan(e.target.value);
    };

    const handleNewLessonPlanChange = (e) => {
        setNewLessonPlan(e.target.value);
    };

    const handleIsPrivateChange = (e) => {
        setIsPrivate(e.target.checked);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('file', file);
        formData.append('lessonPlan', selectedLessonPlan);
        formData.append('isPrivate', isPrivate.toString());

        fetch('http://127.0.0.1:3000/teachers/upload', {
            method: 'POST',
            body: formData,
        })
            .then((res) => res.json())
            .then((data) => {
                setMessage(data.message);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const handleAddLessonPlan = (e) => {
        e.preventDefault();
        fetch('http://127.0.0.1:3000/teachers/lesson-plans', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: newLessonPlan }),
        })
            .then((res) => res.json())
            .then((data) => {
                setLessonPlans([...lessonPlans, data.lessonPlan]);
                setNewLessonPlan('');
            })
            .catch((err) => {
                console.error(err);
            });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" value={title} onChange={handleTitleChange} />
                <input type="file" onChange={handleFileChange} />
                <select value={selectedLessonPlan} onChange={handleLessonPlanChange}>
                    <option value="">Select a Lesson Plan</option>
                    {lessonPlans.map((lessonPlan, index) => (
                        <option key={index} value={lessonPlan}>{lessonPlan}</option>
                    ))}
                </select>
                <label>
                    <input type="checkbox" checked={isPrivate} onChange={handleIsPrivateChange} />
                    Private Lesson
                </label>
                <button type="submit">Upload</button>
            </form>
            <form onSubmit={handleAddLessonPlan}>
                <input type="text" value={newLessonPlan} onChange={handleNewLessonPlanChange} />
                <button type="submit">Add Lesson Plan</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default FileUpload;