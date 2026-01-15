import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import './AISolver.css';

const AISolver = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [problem, setProblem] = useState('');
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);

    const toggleModal = () => setIsOpen(!isOpen);

    const handleSubmit = async () => {
        if (!problem.trim()) return;

        const newHistory = [...history, { type: 'user', content: problem }];
        setHistory(newHistory);
        setLoading(true);
        setProblem('');

        try {
            const response = await fetch('http://127.0.0.1:8000/api/ai/solve/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ problem: problem }),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch solution');
            }

            const data = await response.json();
            setHistory([...newHistory, { type: 'ai', content: data.solution || data.error }]);
        } catch (error) {
            setHistory([...newHistory, { type: 'ai', content: 'Error: Could not connect to the AI tutor.' }]);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    return (
        <>
            <button className="ai-solver-fab" onClick={toggleModal} title="Solve with AI">
                🤖
            </button>

            {isOpen && (
                <div className="ai-modal-overlay" onClick={toggleModal}>
                    <div className="ai-modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="ai-modal-header">
                            <h2>AI Math Tutor</h2>
                            <button className="close-btn" onClick={toggleModal}>&times;</button>
                        </div>
                        <div className="ai-modal-body">
                            <div className="chat-messages">
                                {history.length === 0 && (
                                    <div className="message ai">
                                        Hi! I'm your AI Math Tutor. Enter a problem below (you can use LaTeX!) and I'll help you solve it.
                                    </div>
                                )}
                                {history.map((msg, index) => (
                                    <div key={index} className={`message ${msg.type}`}>
                                        <ReactMarkdown
                                            remarkPlugins={[remarkMath]}
                                            rehypePlugins={[rehypeKatex]}
                                        >
                                            {msg.content}
                                        </ReactMarkdown>
                                    </div>
                                ))}
                                {loading && <div className="message ai">Thinking...</div>}
                            </div>
                            <div className="input-area">
                                <textarea
                                    className="problem-input"
                                    placeholder="Type your math problem here..."
                                    value={problem}
                                    onChange={(e) => setProblem(e.target.value)}
                                    onKeyDown={handleKeyPress}
                                    rows="1"
                                />
                                <button className="solve-btn" onClick={handleSubmit} disabled={loading}>
                                    Solve
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AISolver;
